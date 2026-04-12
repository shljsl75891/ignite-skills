## Introduction to Observability

- Observability is not a tool or a product, but a practice that helps you understand the internal state of your system by analyzing its outputs.
- It is not just monitoring or telemetry, but a holistic approach to gaining insights into your system's behavior and performance.
- Traditional practices for debugging the internal state of software were designed for monolithic applications, which were much simpler than we have today.
- With the rise of microservices, distributed systems, and cloud-native architectures, these systems have become infinitely more complex. Observability tools were born out of pure necessity, when traditional approaches were no longer sufficient to understand and debug the issues quickly.

#### History of Observability

![](/assets/2026-04-12-16-56-14.png)

- The observability concept was first introduced in the field of control theory of mathematical control systems by Rudolf E. Kálmán in the 1960s.
- He defined observability as the measure of how well internal states of a system can be inferred from knowledge of its external outputs.

The same concept was adapted by modern software engineers, and it opens up a fundamentally different way of interacting with and understanding the code we write

For a software application to have observability, we must be able to do the following:

- Understand the inner workings of application
- Understand any system state our application may have gotten itself into even new ones. You have never seen before and couldn't have predicted.
- Understand the inner working and system state slowly by observing and interrogating with external tools without shipping any new custom code to handle it.

After the system is observable, we should be able to answer the following questions:

- Can you understand what any particular user of your software may be experiencing at any given time?
- Can you identify which system user is generating the most load as well as the second third or hundred most load generating user ?
- If the 142nd slowest user complaint about performance speed, can you isolate their all requests to understand why exactly things are slow for that specific user?
- Can you answer questions like these about your applications even if you have never seen or bugged this particular issue before?
- Can we quickly (within minutes) isolate any fault in your system? No matter how complex, deeply buried or hidden within your stack ?

and many more such questions. The observability Does help us to clearly see what's happening in all the obscure corners of our software.

> [!NOTE]
> The definition of observability for a software system is a measure of how well we can understand and explain any state our system can get into no matter, how novel or bizarre (unusual, unexpected, or previously unseen system behaviors). If we are able to do this without shipping any new code, we can easily say that the system is observable.

### How is it different from monitoring?

- Another definition of observability popularly being promoted by SaaS developer tool vendors, is that the observability is just a synonym for _telemetry_, indistinguishable from monitoring.
- Observability is not just about three pillars of monitoring: `Metrics`, `Logs`, and `Traces`. They promote these definitions solely to sell their tools.

Instead, the observability requir,s evolving the way we think about gathering the data needed to debug effectively, and how we use that data to understand the system.

##### What is wrong with traditional monitoring ?

- The traditional approach of using metrics and monitoring is fundamentally a reactive approach, where you set up alerts and dashboards to monitor specific metrics and logs, and then react to them when they trigger.
- This approach has limitations because it relies on you knowing what to monitor and what to alert on, but on issues which can arise from unexpected interactions between components.
- We need to understand that monitoring is not the only way to understand the systems, instead it's just one way to do that, which works well before but now in today's complex systems.

These monitoring tools were built with certain assumptions such as:

- Our application is a monolithic application
- There is only one stateful database.
- The apps run on containers and virtual machines.
- We have fairly static and long running set of nodes to monitor.
- Engineers examine system for problems only after the problem occurs.

and many more such assumptions, which are no longer valid in today's complex systems. Modern applications are built on microservices, distributed systems, multiple databases, and infrastructure that is dynamic and ephemeral due to autoscaling and serverless architectures. Automatic instrumentation is insufficient for understanding these complex systems.

> [!IMPORTANT]
> Monitoring is for known unknowns, while observability is for unknown unknowns.

Historically, in monolithic applications, unpredictable failures were relatively rare, and mostly were the variants of known issues. But, today's modern distributed systems architectures can easily notroiously fails in novel ways that no one is able to pedict, and has experienced before (obviously because of unpredictable platform abstracted infrastructure, and interactions between microservices on unpredictable network).

> Every application has an inherent amount of irreducible complexity. The only question is who will have to deal with it - the user, the application developer, or the platform developer.
>
> - Larry Tesler

- In modern cloud native systems, the hardest thing about debugging is no longer understanding how the code runs but finding where in our system the code with the problem even lives.
- Debugging is not now as easier as using traditional debuggers and stepping into code due to 20-30 network hops in a single function.

> [!IMPORTANT]
> Debugging with observability is about preserving as much of the context around any given request as possible, so that we can reconstruct the environment and circumstances that triggered the novel failure mode.
