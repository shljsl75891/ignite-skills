## Structured Events

- Observability means we can understand any state our system gets into — no matter how weird or unexpected — without shipping new code to answer new questions.
- That requires two things:
  - slicing data along any dimension after the fact
  - keeping full resolution down to the lowest logical level.

The fundamental data type that makes this possible is the **arbitrarily wide structured event.**

### What is an event?

An event is a record of everything that happened while one particular request interacted with our service. From the moment it enters to the moment it exits, we build up a map of everything that might matter later — request ID, headers, parameters, variable values at key moments, time taken, calls to downstream services, their response times. When the request finishes, that map gets serialized as a structured record. Key-value pairs. Machine-readable. Searchable.

### How we debug with events

We compare events to find anomalies. Most events look similar. Some don't. We spot the outliers, then figure out what those outliers have in common. That points us to the bug.

Doing that requires filtering and grouping across any combination of dimensions — service name, user type, region, error code, whatever seems relevant to our investigation.

### Why metrics fall short

A metric is a pre-aggregated number. System state over a time period, with optional tags for grouping. Example: "avg page load time — last 5 seconds — 320ms."

**The aggregation problem.** That 320ms averages thousands of individual requests. The moment that number gets calculated, the details vanish. Which requests were slow? Which were fast? What did the slow ones share — same user, same region, same endpoint? Impossible to know. The average ate everything.

**The disconnection problem.** One request might generate hundreds of metrics during its lifetime — page load time, DB query count, cache hit rate, bytes sent. These numbers live in isolation. No thread links them to the same request. We can't reconstruct a single request's journey.

**The arms race.** After each incident, teams add more custom metrics trying to cover every possible question. Bills spike. Novel questions still appear. Because we can never predict what we'll need to ask before the problem happens.

> [!NOTE]
> Metrics give us a narrow, pre-defined window. Good for alerting on known patterns. Not enough for observability's foundation.

### Why logs fall short

Traditional logs are text files recording notable events. Designed for humans to read, not machines to parse.

One request splits across multiple lines:

```
6:01:00 accepted connection on port 80 from 10.0.0.3:63349
6:01:03 basic authentication accepted for user foo
6:01:15 processing request for /super/slow/server
6:01:18 request succeeded, sent response code 200
6:01:19 closed connection to 10.0.0.3:63349
```

Five lines, one request. No machine-readable connection between them. In production, millions of similar lines float around, and parsing is messy — different services use different formats.

Structured logs improve things. Machine-readable key-value pairs:

```
time="2019-08-22T11:56:11-07:00" level=info msg="Served HTTP request"
authority="10.0.0.3:63349" duration_ms=123 path="/super/slow/server" port=80
service_name="slowsvc" status=200 trace.trace_id=eafdf3123 user=foo
```

Better. But still fragmented — one request, many entries, often with no common ID to stitch them together.

### The solution: one event per unit of work

Roll everything into one record:

```json
{
  "authority": "10.0.0.3:63349",
  "duration_ms": 123,
  "level": "info",
  "msg": "Served HTTP request",
  "path": "/super/slow/server",
  "port": 80,
  "service_name": "slowsvc",
  "status": 200,
  "time": "2019-08-22T11:57:03-07:00",
  "trace.trace_id": "eafdf3123",
  "user": "foo"
}
```

One unit of work = one event. Everything in one place. No stitching required.

### What to capture

Two types of data help investigators:

- **Runtime context** — not tied to any specific request. Container info, memory available, thread counts, general system state when the request ran.
- **Request-specific data** — user ID, session token, shopping cart ID, variable values during execution, downstream service calls and their results.

Both matter. In distributed systems, "function calls" within a single request become calls to remote services. The variable values at those moments are our debugging context.

### Make them arbitrarily wide

- There should be no practical limit on what we attach to an event. Mature instrumentation can produce events with 300 to 400 fields per request. Production bugs often require unexpected fields. We won't know which ones until we need them.
- Some data stores require pre-defined schemas. That's a problem — schemas force us to predict dimensions in advance, which contradicts the whole point. Arbitrarily wide events mean no schema constraint. Any field, any time.
- Events are not optional. They're not an implementation detail. They're the fundamental requirement that makes any level of analysis possible.

### High cardinality is non-negotiable

- Novel bugs mean finding unknown failure modes by searching for outliers. This often means slicing across many dimensions to find what the outliers share.
- Picture this: we need to find all Canadian users running iOS 11.0.4 with the French language pack, who installed the app last Tuesday, on firmware version 1.4.101, storing photos on Share3, in US West 1 region. Every single one of those constraints is a high-cardinality dimension. We can't predict which combination will matter before a bug appears.
- Without high-cardinality support, we're not finding needles — we're staring at haystacks. Our observability tooling must handle queries that combine many high-cardinality dimensions to surface deeply hidden problems.

> [!NOTE]
> Needle in haystack (सूई ढूंढना घास के ढेर में) — finding a specific item in massive data. High cardinality = ability to search by any combination of dimensions to find it.

### The bottom line

|                                  | Metrics              | Traditional Logs | Structured Events |
| -------------------------------- | -------------------- | ---------------- | ----------------- |
| **Granularity**                  | Aggregated over time | Per line         | Per unit of work  |
| **Machine-readable**             | Yes                  | No               | Yes               |
| **Connects related data**        | No                   | No               | Yes               |
| **Supports arbitrary questions** | No                   | Limited          | Yes               |
| **High cardinality**             | No                   | No               | Yes               |

Metrics and logs each solve part of the problem. Neither is enough alone. Structured events — one record per unit of work, arbitrarily wide, machine-parseable — are the foundation.
