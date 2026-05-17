## What is Monitoring?

**Oxford English Dictionary**: "Observing and checking the progress or quality of something over time to keep under systematic review."

Traditional monitoring does exactly this via **metrics** - numbers representing system state during specific time intervals.

**How it works:**

1. Collect metrics about application performance over time
2. Aggregate and analyze these numbers
3. Look for patterns indicating troubling trends
4. Trigger alerts when metrics cross pre-defined thresholds

> Example: CPU at 90% right now. But is it going up or down? Context matters, but metrics often strip it away.

### Two Consumers of Metrics

- **Machines** decide: Should this trigger an alert? Has the system recovered?
- **Humans** look at graphs and dashboards to understand what's happening.

> To a machine, a metric is just a number. The threshold is a human decision.

### How Alerts Actually Work

1. Human decides threshold: "If CPU > 90% for 2 minutes, send alert"
2. Machine checks: Is the number above or below threshold?
3. Alert triggers when condition is met
4. Recovery declared when metric drops below threshold for a pre-configured time

Simple. Mechanical. Only catches what we've already thought of.

---

## The Dashboard Reality

_Picture this:_

1. It's morning. We open our dashboards - 20-30 graphs showing everything about our system.
1. Dashboards promise a **"single pane of glass"** where we can see every aspect of our application, all components, their health status.
1. We scan the graphs. Nothing's on fire. Good. Start our day.

> Here's the uncomfortable truth: **We don't know what many of these graphs actually measure.** But over time, we've developed something else entirely - **predictive intuition**.

We've learned to read patterns:

- If the bottom graph turns red → drop everything and investigate now
- If the left corner of the top graph dips while bottom right grows steadily → message queue problem
- If boxes spike every 5 minutes and the background is redder than normal → database query acting up

We notice a caching problem. Nothing on the dashboard clearly says "our primary caching server is getting hurt." But we've seen this pattern before. The familiar fading pattern tells us to act. We pull up the caching dashboard. Confirm. Fix. Move on.

**This is "reading tea leaves" debugging.** We've learned to divine the source of problems by recognizing visual patterns specific to our system.

> [!TIP]
> If we can diagnose problems by looking at graphs and knowing what to do next - without understanding why - we're doing intuition-based troubleshooting.

### Why Intuition Fails

- What if someone puts us in front of the **same dashboard tools**, but for a completely different application? Different language. Different architecture. Different everything.
- When the lower left corner turns blue, would we know what to do?

**The answer is no.** The way system problems appear on dashboards is completely different from system to system.

Yet this intuition-based approach is the industry's primary way of interacting with production systems.

---

## Why Dashboards Fail for Debugging

Dashboards were originally designed for simpler times when systems collected limited data. They struggle with modern debugging:

- **Too many metrics**: Modern systems collect unlimited data. Impossible to fit everything on one dashboard
- **Aggregation hides details**: "Average CPU = 90%" doesn't tell us which process caused it
- **Need pre-defined filters**: We must decide dimensions in advance (instance type, region, etc.)
- **High cardinality issues**: Can't load dashboards with thousands of unique values
- **Reactive by nature**: We can only investigate what we predicted ahead of time

### Real-World Limitations

**Insufficient correlation**: Engineer adds database index to improve query speed. Needs to know if the query is scanning fewer rows, which queries use this index, or if write latencies are up at 95th/99th percentile. **What they get**: CPU graphs and average memory stats. Cannot slice by user, query type, or source IP. Only option: eyeball broad changes and guess based on timestamps.

**Cannot drill down**: Engineer discovers bug expiring data. Needs to know: affecting all users or just some shards? Sees disk space dropping on one shard, assumes problem confined there. **Reality**: Other shards appear stable but are running import operations (hiding the problem).

**Tool hopping**: Engineer sees error spike. Searches dashboards for correlated metrics, can't distinguish causes from effects. Jumps to logging tool, finds request ID, copy-pastes into tracing tool. If untraced, repeats until they catch one. **The gap**: Manual correlation across separate tools (dashboards → logs → traces). Slow and error-prone.

---

## The "Add More Metrics" Trap

After outages, here's what typically happens:

1. On-call engineer figures out which metric would have answered their question
2. They create that metric and start gathering it
3. **But it's too late** - we can't go back in time to capture data we didn't think to collect
4. Promise: "Next time this happens, we'll know"

**The reality**: Teams go nuts adding custom metrics for everything: query families, expiration rates per collection, error rates per shard, disk usage per index, execution time buckets.

**Result**: They double their entire monitoring budget next billing period. Still can't answer novel questions.

> [!CAUTION]
> We cannot retroactively capture metrics. Unless we can replay the exact scenario, that data is lost forever.

---

## The Core Limitation

- Dashboard debugging requires knowing what we're looking for **before** the problem happens.
- During an investigation, we might realize: "I need to group CPU usage by instance type." But we can't - we didn't add that label in advance. Investigation blocked.

We became accustomed to **reactive troubleshooting**. We accept not discovering new insights during debugging. This limitation shapes our entire debugging behavior.

---

## Traditional Monitoring is Fundamentally Reactive

This is the part that should make us uncomfortable.
Many teams accept reactive debugging as "the normal state of operations." But playing catch-up is costly. Metrics tools often price based on cardinality - how many unique values we track. Teams enthusiastically add custom metrics, get shocked by the bill, then remove most of them.

### Questions to Ask Ourselves

- **How do we locate problems?** Do we determine investigation based on actual visible trail of system information? Or do we look where we found the answer last time?
- **Do our tools give precise answers?** Or are we performing translations based on system familiarity to arrive at the answer we actually need?
- **Are we correlating manually?** Are we constantly trying to correlate patterns between observations, relying on ourselves to carry context between desperate sources?
- **Is our best debugger the longest-tenured person?** This is a dead giveaway. If the person who's been there longest is always the best at debugging, our knowledge comes from personal hands-on experience - not systematic tools.

---

## How Observability Enables Better Debugging

### Two Models

| Model             | Centers Around                | Best For         |
| ----------------- | ----------------------------- | ---------------- |
| **Monitoring**    | Alerts and outages            | Known problems   |
| **Observability** | Exploration and understanding | Unknown problems |

Observability lets us discover the source of any problem along any dimension without needing to predict where and how that problem might occur.

### Axis 1: Institutional Knowledge

- **Monitoring approach:** Seniority = knowledge. Best debugger = person who's been there longest. Debugging driven by individual experience recognizing previously-seen patterns.
- **Observability approach:** Best debugger = most curious engineer. Skills translate across different systems. Ability to ask exploratory questions and follow answers. No need for intimate knowledge of one particular system.

### Axis 2: Finding Hidden Issues

- Monitoring rewards **induction and hunches**. When issues are detected, they're diagnosed based on pattern matching to past problems. This leads to treating symptoms without ever getting to the actual source.
- Observability lets us treat every investigation as new. Even if conditions look similar to past problems, we follow the clues the data provides - step by step, methodical, objective.

### Axis 3: Team Confidence

- **The context switching problem:** We're responsible for correlating between dashboards, logs, and traces. Data is pre-aggregated and doesn't support flexible exploration. When we want to zoom in or ask a new question, we must mentally carry context between tools. This is exhausting. And given the incompatibility between data sources, conversion errors creep in.
- **Observability fixes this:** Observable tools bring high-cardinality, dimensional, multi-touch data into a **single location** where we can slice, dice, zoom in, zoom out, follow breadcrumbs, move through investigation steadily without constant context switching, and critical knowledge moves from "minds of experienced engineers" → explicit data anyone can access.

---

## The Conclusion

- **Old world made sense:** Simple monolithic applications, limited data collection, human experience and intuition worked because systems were straightforward.
- **New world broke it:** Complexity and scale made that approach untenable. Modern applications are too complex for any one person to intuitively understand. Distributed systems fail in novel ways no one predicted.
- **Observability changes everything:** Engineers can investigate any system without leaning on experience or tribal knowledge. Tools enable ethical, objective, open-ended investigation. Any engineer can find deeply hidden problems and confidently diagnose issues regardless of prior exposure to the system.

> [!NOTE]
> Debugging with observability is about preserving as much context around any given request as possible, so we can reconstruct the environment and circumstances that triggered the novel failure mode.

---

### The Simple Analogy

- **Monitoring** = smoke alarm (alerts when fire detected)
- **Observability** = cameras + sensors everywhere (investigate why something smells weird before there's a fire)

