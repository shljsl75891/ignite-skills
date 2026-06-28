# Instrumentation with OpenTelemetry

Instrumentation means adding code to emit telemetry alongside each request, then routing it to a backend for analysis. It's the bridge between understanding traces and events in theory — and actually seeing them in production.

![](/assets/2026-06-21-09-07-43.png)

## The vendor lock-in problem

For a long time, every monitoring product shipped its own instrumentation library. We'd pick a vendor, wire up their SDK, add custom instrumentation using their APIs — and if we ever needed to switch backends, we'd start over from scratch. Same code, written twice. Double the overhead, double the maintenance.

> [!CAUTION]
> Vendor-specific libraries are a trap that tightens as the codebase grows — the more custom instrumentation we added, the more painful escape became.

## OpenTelemetry

Two projects tried to fix this. In 2016, CNCF launched **OpenTracing** — a vendor-neutral tracing API. In 2017, Google launched **OpenCensus** — same idea, but with metrics too. Both solved the problem. Both had real adoption. And they couldn't talk to each other.

So developers had to pick one. If we were writing a shared library (say, a database client) and wanted it to emit traces, we'd have to write the integration twice — once for OpenTracing users, once for OpenCensus users — or drop half our users. We'd just moved fragmentation from "too many vendor SDKs" to "two incompatible open standards."

In 2019, both projects merged into **OpenTelemetry** — one standard under CNCF, replacing both, backward compatible. One answer, finally.

OTel captures traces, metrics, and logs. We instrument once, route to any backend — open source like Jaeger, or commercial like Honeycomb or Lightstep — without changing application code.

> [!NOTE]
> OpenTracing (CNCF, 2016) + OpenCensus (Google, 2017) → OpenTelemetry (CNCF, 2019). Full replacement for both, backward compatible with previously written instrumentation.

## Core components

![](/assets/2026-06-21-09-08-04.png)

**API** — The specification layer. Defines function signatures, data models, and conventions for adding instrumentation — but contains no concrete implementation, just the contract. Library code instrumented against the API works regardless of which SDK backs it at runtime, so we can swap or update SDKs without touching instrumentation.

**SDK** — The concrete implementation of the API. Does the real work: tracking in-flight spans, batching telemetry data, applying sampling decisions, and flushing everything to exporters. Each language has its own SDK, all conforming to the same API spec. Application code never calls the SDK directly — it goes through the API, and the SDK handles it underneath.

**Tracer** — The SDK component that tracks which span is currently active in the process. We use the Tracer to start new spans, access the active span to add attributes or events mid-flight, and close it when the work is done.

**Meter** — The SDK's counterpart to Tracer, but for metrics. We register instruments through the Meter — counters, histograms, gauges — and record values as code runs. Unlike spans, which are exported individually, metrics are aggregated inside the SDK before leaving the process.

**Context Propagation** — The glue that stitches distributed spans into a single trace. Three responsibilities: deserialize trace context from inbound headers (W3C Trace Context or B3), track the active context inside the process as execution flows across goroutines or threads, and serialize it into outbound headers before downstream calls. Without it, every service's spans are isolated islands with no shared trace.

**Exporter** — A plugin that translates OTel's in-memory objects (spans, metrics, logs) into the right wire format for a specific destination. Destinations can be local — stdout or a log file — or remote backends like Jaeger, Honeycomb, or Lightstep. For remote backends, the default exporter speaks OTLP (OpenTelemetry Protocol), sending data to a Collector rather than directly to a backend.

**Collector** — A standalone binary run as a proxy or sidecar alongside services. Receives OTLP telemetry, can process or transform it (sampling, attribute enrichment, redaction), then forwards to one or more configured backends. Switching backends means reconfiguring the Collector — application code never changes.

> [!TIP]
> Adding a new backend = a Collector config change, not an application deploy. Services never need to know where their data goes.

## Automatic instrumentation

Manually instrumenting every service call would take months. OTel's answer is automatic instrumentation — it hooks into common frameworks (HTTP, gRPC, database and cache clients) and generates spans for every call without us writing a single span by hand, getting us to first insight in hours or days.

### How it hooks in

Frameworks expose wrappers, interceptors, or middleware that run code before and after each request. OTel registers itself at those hook points to read context propagation headers and create spans automatically.

The approach differs by language:

| Language        | Approach                                                                                                              |
| --------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Go**          | Explicit — we configure OTel wrappers at compile time; Go's type system requires it                                   |
| **Java / .NET** | A standalone OTel agent attaches at runtime, detects which frameworks are running, and registers itself automatically |

### Go examples

**HTTP** — wrap the handler with `otelhttp` before registering it on the router:

```go
import "go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp"

mux.Handle("/route",
    otelhttp.NewHandler(otelhttp.WithRouteTag("/route",
        http.HandlerFunc(h),
    ), "handler_span_name"),
)
```

**gRPC** — pass OTel interceptors when creating the server:

```go
import "go.opentelemetry.io/contrib/instrumentation/google.golang.org/grpc/otelgrpc"

s := grpc.NewServer(
    grpc.UnaryInterceptor(otelgrpc.UnaryServerInterceptor()),
    grpc.StreamInterceptor(otelgrpc.StreamServerInterceptor()),
)
```

### What we get — and what we don't

Auto-instrumentation gives us the skeleton: every service call, its timing, and the full dependency graph in the trace waterfall. That's enough to spot hot database calls, slow downstream endpoints, or a specific service making redundant calls to a dependency.

But it knows nothing about our business logic. It can't tell us _why_ a call is slow, _which user_ triggered it, or _what our code was doing_ at the time. That's the ceiling of automatic instrumentation — and where custom instrumentation picks up.

## Custom instrumentation

Auto-instrumentation gives us the skeleton. Custom instrumentation is where we give it a soul — attaching business context like client IDs, shard IDs, feature flags, and errors directly to the spans already being generated. This is also what enables observability-driven development: instrumenting new features as we write them, so we can verify they behave correctly in production as they ship.

### Starting and ending spans

OTel tracers track the active span via Go's `context.Context`. To create a child span anywhere in the call stack, we need a tracer and the current context:

```go
import "go.opentelemetry.io/otel"

// define once per module — private, reusable
var tr = otel.Tracer("module_name")

func funcName(ctx context.Context) {
    ctx, sp := tr.Start(ctx, "span_name")
    defer sp.End()

    // do work here
}
```

`tr.Start` creates a child span under whatever span is already in `ctx` (e.g. from an HTTP or gRPC handler). `defer sp.End()` ensures the span is always closed and its duration recorded, even on early returns or panics.

> [!TIP]
> Define the tracer once as a package-level private variable — reused across all functions in the module.

### Adding attributes to a span

We can keep attaching fields throughout the function's lifetime and they all land on the same span:

```go
import (
    "go.opentelemetry.io/otel/attribute"
    "go.opentelemetry.io/otel/trace"
)

span := trace.SpanFromContext(ctx)

span.SetAttributes(
    attribute.Int("http.status_code", statusCode),
    attribute.String("app.user", username),
)
```

`SpanFromContext` retrieves the currently active span from context — no need to pass the span itself around. In languages with implicit thread-local context (Java, .NET), we don't even need to pass `ctx`.

> [!IMPORTANT]
> OTel holds open spans in memory until finished. We can call `SetAttributes` at any point before `sp.End()` — which means we can enrich a single span with data gathered across the entire function's execution.

### Process-wide metrics

Most values — cart totals, error codes, user IDs — belong as attributes on the span that processed them. But some data doesn't belong to any single request: goroutine counts, queue depths, process-level health signals. For those, we use a Meter:

```go
import (
    "go.opentelemetry.io/otel"
    "go.opentelemetry.io/otel/metric"
)

var meter = otel.Meter("example_package")

var appKey       = attribute.Key("app")
var containerKey = attribute.Key("container")

goroutines, _ := metric.Must(meter).NewInt64Measure(
    "num_goroutines",
    metric.WithKeys(appKey, containerKey),
    metric.WithDescription("Amount of goroutines running."),
)

// inside a periodic ticker goroutine:
meter.RecordBatch(
    ctx,
    []attribute.KeyValue{
        appKey.String(os.Getenv("PROJECT_DOMAIN")),
        containerKey.String(os.Getenv("HOSTNAME")),
    },
    goroutines.Measurement(int64(runtime.NumGoroutine())),
)
```

> [!CAUTION]
> Reach for metrics only when the value is genuinely process-wide, non-request-specific, and needs to be pre-aggregated without sampling. For everything tied to a request — response codes, latency buckets, business values — prefer span attributes. Metrics are rigid; span attributes are queryable, composable, and richer.

## Sending data to a backend

Two options: proxy through the OTel Collector, or export directly from the process. Either way, exporters are instantiated once at program startup — typically in `main`.

### OTLP exporter (recommended default)

Unless a backend explicitly lacks OTLP support, always configure the OTLP gRPC exporter. It decouples the app from any specific vendor and works with both commercial backends and the OTel Collector:

```go
driver := otlpgrpc.NewClient(
    otlpgrpc.WithTLSCredentials(credentials.NewClientTLSFromCert(nil, "")),
    otlpgrpc.WithEndpoint("my.backend.com:443"),
)

otExporter, err := otlp.New(ctx, driver)

tp := sdktrace.NewTracerProvider(
    sdktrace.WithSampler(sdktrace.AlwaysSample()),
    sdktrace.WithResource(resource.NewWithAttributes(
        semconv.SchemaURL,
        semconv.ServiceNameKey.String(serviceName),
    )),
    sdktrace.WithBatcher(otExporter),
)
```

`resource.NewWithAttributes` is where we attach service-level metadata (service name, version, environment) that applies to every span — not per-request, but per-process.

### Multiple exporters

OTel allows registering several exporters on the same TracerProvider, so the same telemetry fans out to multiple backends simultaneously. Useful when evaluating a new observability tool without disrupting production:

```go
func main() {
    exporterX := x.NewExporter(...)
    exporterY := y.NewExporter(...)

    tp, err := sdktrace.NewTracerProvider(
        sdktrace.WithSampler(sdktrace.AlwaysSample()),
        sdktrace.WithSyncer(exporterX),   // synchronous — blocks until exported
        sdktrace.WithBatcher(exporterY),  // async — batches before sending
    )

    otel.SetTracerProvider(tp)
}
```

`otel.SetTracerProvider(tp)` sets the global default — all subsequent `otel.Tracer()` calls return a tracer backed by this provider.

> [!NOTE]
> `WithSyncer` exports each span immediately and synchronously. `WithBatcher` queues spans and flushes in batches. Use Batcher for production; Syncer for debugging or low-volume scenarios.

> [!TIP]
> Prefer OTLP gRPC over vendor-specific exporters. Switching backends = changing an endpoint or Collector config, not application code.
