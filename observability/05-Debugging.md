## Analyzing Events to Achieve Observability

Wide structured events are just the starting point, not the finish line. Observability is measured by what we actually learn from that data — and that depends on how we look at it, not just what we collected.

This is also what makes observability debugging fair. Old-style debugging rewards whoever has been staring at the system the longest. Observability rewards whoever is most curious, or most willing to dig in — no matter how long they've worked there.

### Debugging from known conditions (the old way)

Senior engineers who seem to "just know" where to look aren't doing magic. They've spent years getting familiar with one system's usual failures. That's real skill, but it doesn't carry over to a different codebase, and it doesn't scale to a whole team.

> [!CAUTION]
> Here's the trap: we can have all the wide events in the world and still be debugging the old way. Piping that data into `tail -f | grep` for a familiar word, or flipping through dozens of dashboards looking for a shape we've seen before — that's still the same old guesswork, just using newer data. Having better data doesn't change our approach on its own.

Using observability tools doesn't remove this habit by itself. Ship a new frontend feature, and the instinct is still to jump straight to "did the CSS/JS file size change, broken down by build?" That's useful — but only because we already knew what to ask. It doesn't help when we have no idea where to even start looking.

**On runbooks:** a living document trying to list every possible failure and its fix is a losing game — it goes out of date fast, and an out-of-date guide is worse than no guide, because we trust it anyway. Simple orientation docs are still worth having though: who owns a service, how to reach the on-call person, what it depends on, a few good starting queries.

> [!NOTE]
> Good instrumentation is often the best documentation. It's not a file that goes stale — it stays live, and it shows both what an engineer thought was worth tracking and what's actually happening right now.

### Debugging from first principles

A first principle is something we know is true on its own — not something we assumed based on something else. Debugging this way means assuming nothing, checking what's actually been proven, making a guess (a hypothesis), then letting the data prove or disprove it.

Gut feeling works fine until the system gets complex enough that there are too many possible answers to guess. Not everyone can be, or should have to be, a system expert just to fix a bug. And sometimes the honest answer to "what's wrong" is thirteen different things happening at once — no amount of gut feeling gets us there faster than carefully following what the data actually shows.

### The core analysis loop

```
                             ┌─────────────────────────────┐
                             │What are we trying to learn? │
                             └─────────────────────────────┘
                                   ▲                    │
                                   │                    ▼
                       ┌───────────────────────┐  ┌──────────────────────────┐
                       │ Found the fields that │  │ Look at the data to      │
                       │ point to the problem? │  │ spot the unusual         │
                       │                       │  │ behavior.                │
                       └───────────────────────┘  └──────────────────────────┘
                                   ▲                    │
                                   │                    ▼
                          ┌────────────────────────────────────────┐
                          │ Look for what the unusual events have  │
                          │ in common — group them, filter them,   │
                          │ compare them to everything else.       │
                          └────────────────────────────────────────┘
```

1. Start with whatever made us look — an alert, a complaint, a hunch.
2. Check it's real: is something actually behaving differently, visible as a change in a graph?
3. Look for what's causing that change — check a few odd-looking rows, group by common fields (status code, region, whatever), filter to see what stands out.
4. Do we know enough now? If yes, we're done. If not, treat this smaller group as the new thing to explain, and go back to step 3.

We don't need to know the system beforehand — just keep trying different fields until one explains the pattern. The problem is doing this by hand, row by row, gets slow once the system is big enough.

### Where metrics, logs, traces, and errors fit

The loop doesn't use three separate types of data — it runs on one thing: wide structured events. Metrics, logs, traces, and errors all show up as parts of that same data, not as separate inputs.

| Telemetry             | Role in the loop                                                                                                                                   |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Structured events     | The actual content — every field is something we can group, slice, or filter on                                                                    |
| Traces                | Connected events (steps in one request). Once we've found the problem area, we look at one full request start to finish                            |
| Errors / status codes | Just another field on the event — filter by `error = true` or `status = 500` like anything else                                                    |
| Metrics               | Good for the first alert (step 1), then not much else. Already averaged out, so not useful once we're inside the loop looking at individual fields |
| Logs                  | Only useful once they've been rebuilt into events — matched up by request or trace ID                                                              |

The easy-to-miss part: errors and traces aren't a separate tool we switch to. They're just fields in the same wide event we're already looking at.

### Letting a computer do the heavy lifting

Computers are good at this kind of repetitive work. Pull every field's values from inside the unusual group and outside it, then rank them by how different they are. A sorted list might look like:

- `request.endpoint = batch` — shows up in 100% of the unusual events, 20% of normal ones
- `handler_route = /markers` — 100% of the unusual events, 10% of normal ones
- `request.header.user_agent` — 97% of the unusual events, 100% of normal ones (not a real difference)

An observability tool can show this visually: draw a box around the unusual area on a chart, and it works out the inside-vs-outside percentages for every field on its own.

![](/assets/2026-07-04-16-19-29.png)

One real example: `global.availability_zone = us-east-1a` showed up in **98%** of the slow events but only **17%** of the normal ones. That one number pointed straight at a broken zone from the cloud provider — later confirmed both by the provider and by customers reporting the same issue on their own.

![](/assets/2026-07-04-16-19-52.png)

> [!IMPORTANT]
> None of this works without wide structured events. Metrics don't carry enough detail to slice this way. Logs could get there too, but only after carefully matching request IDs back together and rebuilding the events we should have had in the first place.

### People and computers, together

Computers are fast at going through huge amounts of data to find patterns. People are good at putting those patterns in context and deciding what to look at next. Neither replaces the other — the loop works best when the computer does the counting and the person makes the call.

That naturally raises the question of how much of this should be handled by AI or machine learning instead of a person. That's a question for later. Next up: how observability and monitoring can actually work together, instead of one replacing the other.
