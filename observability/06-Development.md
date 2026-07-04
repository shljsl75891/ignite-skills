## Observability-Driven Development

Observability isn't a tool we only reach for after something breaks in production. It belongs from the moment we write code — part of the same tools, process, and habits that help us find bugs fast.

### TDD vs ODD

TDD is the industry's go-to way to catch bugs early, and for good reason: tests run the same way every time, data gets wiped and rebuilt each run, calls to other services are faked. It sets a spec for how code should behave and flags anything that doesn't match. That removes guesswork.

But production never sits still. The weird, messy problems — the ones that actually break things — get left out of tests exactly _because_ they don't repeat and don't match the spec. TDD makes code easy to work with. It doesn't make code ready for the real world.

|     | Checks against         | Good at                                |
| --- | ---------------------- | -------------------------------------- |
| TDD | A fixed, made-up spec  | Catching known problems before we ship |
| ODD | Real, messy production | Catching new problems after we ship    |

> [!CAUTION]
> The common bad habit: merge the code, cross our fingers, and wait to get called if something breaks. Fixing things fast depends on catching the bug while we still remember why we wrote the code that way. It's never easier to fix a bug than right after we ship it — every hour we wait makes it harder, and wastes more people's time.

### Observability shows where, not why

People new to observability often treat it like detailed logging — a way to step through code line by line. It isn't. Recording that much detail for every line would need so much storage it would cost several times more than the system itself.

> [!IMPORTANT]
> Observability works at the level of the whole system, not single functions. It tells us _where_ a problem is happening — which part, which server, which version, which region. Once it shows us where the problem is and roughly what it looks like, its job is done.

After that, a debugger or profiler takes over — we copy the problem onto our own machine and step through the actual code. Think of it as a telescope, then a microscope.

|                                | Shows                                               | Tool                   |
| ------------------------------ | --------------------------------------------------- | ---------------------- |
| Observability (telescope)      | Where the problem is, across the whole system       | Traces, event data     |
| Debugger/profiler (microscope) | Why the code is doing the wrong thing, line by line | Local copy of the code |

Two ways the same slow-response problem can play out:

- **Code path:** check response times by page, find the slow ones, trace one request all the way through, find which service it's stuck on, copy that request onto our own machine, and step through it in a debugger.
- **Setup path:** check response times by page, notice only certain pages are slow, check which database server handles them, and find the slowness only happens on one type of machine in one location — not a code problem at all.

### Why microservices made this needed

In one big app, a debugger was often enough — fewer moving parts, easy to reason about. Once that app gets split into many small services that talk to each other over a network, a debugger can't follow the request anymore. The same slowdown can now show up in different ways: one service gets slower, the services that depend on it get slower, requests start timing out, or users just start complaining. And just watching graphs can't tell us why — was it a code bug, a user doing something new, a database running out of room, a network limit, a bad setting on the load balancer, or several of these at once? Without observability, every graph just moves together, and none of them explains why.

### Instrumentation makes it work

> [!TIP]
> Before shipping any change, we should ask: how will we know if this is working the way we want?

Good instrumentation needs a short gap between shipping code and feeling what happens when it breaks. One way teams do this: whoever just merged the code gets called first if something goes wrong, for a short time after it ships.

> [!NOTE]
> That's not a punishment. It's ownership. We can't get better at writing solid code if we never feel what happens when it fails.

Right after shipping, every engineer should be able to answer:

1. Is the code doing what we expected?
2. How does it compare to the old version?
3. Are people actually using it?
4. Is anything unusual happening?

A more advanced step: try the change on a small slice of real users first. The best way to know how something works in production is to actually watch it run in production.

### Moving observability earlier

Without the skill to read this data, teams treat production like a glass castle — something built carefully over time that nobody wants to touch, in case one wrong move breaks it. That fear shows up as rolling back changes the moment something looks off, instead of taking a closer look first.

> [!IMPORTANT]
> The idea that we must choose between speed and quality is wrong. They actually grow together — shipping faster means failures are smaller, happen less often, and are easier to fix. The one number worth tracking for a healthy team: **time from writing code to that code running in production.**

Two ways to shrink that number: ship one small change from one person at a time (piling up many changes from many people is the biggest reason things break badly and take hours to sort out), and treat the process of shipping code as real, shared work — not a task dumped on whoever is newest.

Once that gap is small enough, production stops feeling like a glass castle we're scared to touch. It turns into a place we can explore, test things in, and learn from — which is the whole point: observability isn't just for the on-call team, it belongs to every engineer.
