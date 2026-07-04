## Analyzing Events to Achieve Observability

Wide structured events are a prerequisite, not the finish line. Observability is measured by what we actually learn from that data — and that depends entirely on how we go about the analysis, not just what we collected.

This is also what makes observability debugging fair. Traditional debugging rewards whoever's been staring at the system longest. Observability rewards whoever's most curious, or most willing to actually dig — regardless of tenure.

### Debugging from known conditions (the old default)

Senior engineers who seem to "just know" where to look aren't magic. They've built up years of intimate familiarity with one system's failure patterns. That's real, but it doesn't transfer to a different codebase, and it doesn't scale to a team.

> [!CAUTION]
> Here's the trap: we can have all the wide events in the world and still be debugging from known conditions. Piping that data into `tail -f | grep` for a familiar string, or flipping through dozens of dashboards hunting for a shape we've seen before — that's the same old pattern-matching, just wearing new clothes. The data type didn't change our approach.

Adopting observability doesn't kill this reflex on its own. Ship a new frontend feature, and the instinct is still to jump straight to "did CSS/JS bundle size change, broken down by build ID?" Useful — but only because we already knew what to ask. That doesn't help when we have no idea where to even start looking.

**On runbooks:** a living document trying to catalog every possible failure and its fix is a losing game — it goes stale, and stale docs are more dangerous than no docs, because we trust them. Orientation docs earn their keep though: who owns a service, how to reach on-call, what it depends on, a few good starting queries.

> [!NOTE]
> Instrumentation itself is often the best documentation. It's not a static file that rots — it's live, and it captures both intent (what an engineer decided was worth naming) and current reality at the same time.

### Debugging from first principles

A first principle is an assumption that isn't derived from some other assumption — the ground floor. Debugging this way means assuming nothing, questioning what's actually been proven, forming a hypothesis, then letting the data confirm or kill it.

Intuition is great until the system gets complex enough that the space of possible answers explodes. Not everyone can be, or should have to be, a system wizard just to fix a bug. And sometimes the honest answer to "what's wrong" is thirteen different things happening at once — no amount of gut feeling gets us there faster than methodically following what the data shows.

### The core analysis loop

```
                             ┌─────────────────────────────┐
                             │What are we trying to learn? │
                             └─────────────────────────────┘
                                   ▲                    │
                                   │                    ▼
                       ┌───────────────────────┐  ┌──────────────────────────┐
                       │ Found dimensions that │  │ Visualize telemetry to   │
                       │ isolate the anomaly?  │  │ spot the performance     │
                       │                       │  │ anomaly.                 │
                       └───────────────────────┘  └──────────────────────────┘
                                   ▲                    │
                                   │                    ▼
                          ┌────────────────────────────────────────┐
                          │ Search for shared dimensions across    │
                          │ the anomalous area — group, filter,    │
                          │ compare against everything else.       │
                          └────────────────────────────────────────┘
```

1. Start with whatever triggered the investigation — an alert, a complaint, a hunch.
2. Confirm it's real: is there an actual change in behavior somewhere, visible as a shift in a graph?
3. Hunt for the dimension driving that change — sample outliers in the anomalous rows, slice across common fields (status code, region, whatever), filter to expose what's different.
4. Know enough yet? Done. If not, treat this narrower slice as the new anomaly and go back to step 3.

No prior system knowledge required — just brute force, cycling through dimensions until one correlates. Which is exactly the problem: doing this by hand, row by row, doesn't scale once a system gets big enough.

### Where metrics, logs, traces, and errors fit

The loop doesn't juggle three separate pillars — it runs on one thing: wide structured events. Metrics, logs, traces, and errors all show up as facets of that same data, not as parallel inputs.

| Telemetry             | Role in the loop                                                                                                                |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Structured events     | The actual substance — every field is a dimension we group, slice, or filter on                                                 |
| Traces                | Connected events (spans). Once an anomaly's isolated, we drill into one trace to follow a single request end to end             |
| Errors / status codes | Just another dimension on the event — filter by `error = true` or `status = 500` like any other field                           |
| Metrics               | Good for firing the opening alert (step 1), then done. Pre-aggregated, so useless once we're inside the loop slicing dimensions |
| Logs                  | Only usable after they've been reconstructed into events — stitched together by request or trace ID                             |

That's the part easy to miss: errors and traces aren't a separate debugging tool we switch to. They're columns in the same wide event we're already slicing.

### Automating the brute force

Machines are good at exactly this kind of grinding. Pull every dimension's values from inside the anomalous area and outside it, then rank by how different they are. A sorted list might look like:

- `request.endpoint = batch` — 100% of isolated events, 20% of baseline
- `handler_route = /markers` — 100% of isolated events, 10% of baseline
- `request.header.user_agent` — 97% of isolated events, 100% of baseline (not interesting)

An observability tool can do this visually: draw a box around an anomaly on a heatmap, and it computes inside-vs-outside percentages across every field automatically.

![](/assets/2026-07-04-16-19-29.png)

One real example: `global.availability_zone = us-east-1a` showed up in **98%** of slow events but only **17%** of baseline events. That one number pointed straight at a bad availability zone from the cloud provider — later confirmed both by the provider and by customers reporting the same thing independently.

![](/assets/2026-07-04-16-19-52.png)

> [!IMPORTANT]
> None of this works without arbitrarily wide structured events. Metrics don't carry enough context to slice this way. Logs could get there, but only after painstakingly stitching request IDs back together and rebuilding the events we should've had in the first place.

### Humans and machines, together

Machines are fast at sifting huge datasets for patterns. Humans are good at putting those patterns in context and deciding where to look next. Neither replaces the other — the loop works best when computers do the grinding and people do the judgment call.

That naturally raises the question of just how much intelligence — AI, ML, or otherwise — should get folded into that number-crunching step. That's a question for later. Next up: how observability and monitoring actually coexist, instead of one replacing the other.
