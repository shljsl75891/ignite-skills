## Stitching Events into Traces

Events are the building blocks. A trace is what happens when we stitch those events together — a series of interconnected events representing one request's journey through our system.

### Why tracing matters

In a distributed system, a single request can bounce through dozens of services before returning. When something goes wrong, symptoms appear far upstream from the actual cause. A database bottleneck in service C stacks up through B and A — by the time we notice, it looks like A is the problem. Without a way to follow the full path, we're guessing.

![](/assets/2026-06-20-22-22-44.png)

Traces give us that path. They show exactly where time was spent, which service is the real bottleneck, and how services depend on each other.

### Anatomy of a trace

A trace is visualized as a waterfall. Each horizontal bar is a **span** — one unit of work. Bars align left-to-right based on start time and duration.

Spans form a parent-child tree:

- The **root span** is the entry point. It has no parent.
- Every other span declares a parent — the span that triggered it.
- If A calls B which calls C: A is parent of B, B is parent of C.

A service can appear multiple times in the same trace (parallel calls, circular dependencies). Requests in real systems take messy, unpredictable paths — the waterfall handles that.

### What every span must carry

| Field         | Purpose                                                                             |
| ------------- | ----------------------------------------------------------------------------------- |
| `trace_id`    | Links all spans to the same request. Root span creates it; all children inherit it. |
| `span_id`     | Unique ID for this span.                                                            |
| `parent_id`   | ID of the parent span. Absent on root span — that's how we identify root.           |
| `timestamp`   | When this span's work started.                                                      |
| `duration_ms` | How long it took.                                                                   |

Useful additional tags — just key-value pairs, add anything relevant:

| Tag            | Why                                                           |
| -------------- | ------------------------------------------------------------- |
| `service_name` | Which service did this work                                   |
| `name`         | What work was done (`/oauth2/login`, `intense_computation_2`) |
| `hostname`     | Which host ran it                                             |
| `user_name`    | Ties the span to a specific user                              |

### How context crosses service boundaries

The root span generates a `trace_id` and `span_id`. When it calls a downstream service, both need to travel with the request — so the child knows which trace it belongs to and who its parent is.

Standard approach: B3 HTTP headers. The entry handler builds up all span data step by step:

```go
func rootHandler(w http.ResponseWriter, r *http.Request) {
    traceData := make(map[string]interface{})

    // Step 1: root span creates trace_id (shared by every span in this request)
    // and span_id (unique to this span). No parent_id — its absence marks this as root.
    traceData["trace_id"] = uuid.New().String()
    traceData["span_id"]  = uuid.New().String()

    // Step 2: capture timing — duration calculated at the end
    startTime := time.Now()
    traceData["timestamp"] = startTime.Unix()

    // Step 3: propagate context downstream — each helper attaches B3 headers
    // to its outbound request so child services can build their own spans
    authorized := callAuthService(r, traceData)
    name       := callNameService(r, traceData)

    // ... write HTTP response ...

    // Step 4: finalize duration and ship to tracing backend
    traceData["duration_ms"] = time.Since(startTime).Milliseconds()
    sendSpan(traceData)
}
```

Each downstream helper sets B3 headers on its outbound request:

```go
func callAuthService(req *http.Request, traceData map[string]interface{}) bool {
    aReq, _ := http.NewRequest("GET", "http://authz/check_user", nil)

    // pass trace_id so the child span belongs to the same trace
    // pass our span_id as ParentSpanId so the child knows its parent
    aReq.Header.Set("X-B3-TraceId",      traceData["trace_id"].(string))
    aReq.Header.Set("X-B3-ParentSpanId", traceData["span_id"].(string))

    // the auth service reads these headers, creates its own span with matching
    // trace_id and parent_id, then sends it independently to the backend
    // ... execute request ...
    return true
}

// callNameService follows the same pattern
func callNameService(req *http.Request, traceData map[string]interface{}) string {
    nReq, _ := http.NewRequest("GET", "http://names/username", nil)

    nReq.Header.Set("X-B3-TraceId",      traceData["trace_id"].(string))
    nReq.Header.Set("X-B3-ParentSpanId", traceData["span_id"].(string))

    // ... execute request ...
    return "Sahil"
}
```

The backend receives all spans independently, stitches them by `trace_id`, and renders the waterfall.

> [!NOTE]
> Tracing libraries handle all this boilerplate in practice. The manual approach demystifies what those libraries actually do under the hood.

> [!CAUTION]
> Vendor-specific tracing libraries create lock-in. Switching tools means re-instrumenting the entire codebase. OpenTelemetry solves this — instrument once, use any backend.

### Tracing beyond service calls

We don't have to limit traces to RPC calls. Same mechanism, any related events.

Wrapping a CPU-intensive block (JSON unmarshalling, heavy computation) into its own span reveals exactly where time is going. Batch jobs can emit one span per chunk of work, all under the same trace. Lambda pipeline phases, S3 uploads — all fair game. Structured logs enriched with trace fields can even generate a waterfall from log data alone (useful when first getting started, not a long-term strategy).

The key insight: a trace is just a set of events sharing a `trace_id` with declared parent-child relationships. The "distributed" part is optional.

> [!IMPORTANT]
> In an observable system, any set of related events can be stitched into traces — not just service-to-service calls.

### The bottom line

|                             | Unstructured Logs | Metrics   | Traces |
| --------------------------- | ----------------- | --------- | ------ |
| **Shows request path**      | No                | No        | Yes    |
| **Pinpoints bottlenecks**   | No                | Partially | Yes    |
| **Supports arbitrary tags** | No                | Limited   | Yes    |
| **Works across services**   | No                | No        | Yes    |

Events capture what happened in one service. Traces connect those events across the full lifetime of a request — so we can follow any path, no matter how tangled, and see exactly where things went wrong.
