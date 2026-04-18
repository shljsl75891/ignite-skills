## Introduction to Observability

- Observability is not a tool or a product, but a practice that helps us understand the internal state of our system by analyzing its outputs.
- It is not just monitoring or telemetry, but a holistic approach to gaining insights into our system's behavior and performance.
- Traditional practices for debugging the internal state of software were designed for monolithic applications, which were much simpler than we have today.
- With the rise of microservices, distributed systems, and cloud-native architectures, these systems have become infinitely more complex. Observability tools were born out of pure necessity, when traditional approaches were no longer sufficient to understand and debug the issues quickly.

#### History of Observability

![](/assets/2026-04-12-16-56-14.png)

- The observability concept was first introduced in the field of control theory of mathematical control systems by Rudolf E. Kálmán in the 1960s.
- He defined observability as the measure of how well internal states of a system can be inferred from knowledge of its external outputs.

The same concept was adapted by modern software engineers, and it opens up a fundamentally different way of interacting with and understanding the code we write

For a software application to have observability, we must be able to do the following:

- Understand the inner workings of application
- Understand any system state our application may have gotten itself into even new ones. We have never seen before and couldn't have predicted.
- Understand the inner working and system state slowly by observing and interrogating with external tools without shipping any new custom code to handle it.

After the system is observable, we should be able to answer the following questions:

- Can we understand what any particular user of our software may be experiencing at any given time?
- Can we identify which system user is generating the most load as well as the second third or hundred most load generating user ?
- If the 142nd slowest user complaint about performance speed, can we isolate their all requests to understand why exactly things are slow for that specific user?
- Can we answer questions like these about our applications even if we have never seen or bugged this particular issue before?
- Can we quickly (within minutes) isolate any fault in our system? No matter how complex, deeply buried or hidden within our stack ?

and many more such questions. The observability Does help us to clearly see what's happening in all the obscure corners of our software.

> [!NOTE]
> The definition of observability for a software system is a measure of how well we can understand and explain any state our system can get into no matter, how novel or bizarre (unusual, unexpected, or previously unseen system behaviors). If we are able to do this without shipping any new code, we can easily say that the system is observable.

### How is it different from monitoring?

- Another definition of observability popularly being promoted by SaaS developer tool vendors, is that the observability is just a synonym for _telemetry_, indistinguishable from monitoring.
- Observability is not just about three pillars of monitoring: `Metrics`, `Logs`, and `Traces`. They promote these definitions solely to sell their tools.

Instead, the observability requires evolving the way we think about gathering the data needed to debug effectively, and how we use that data to understand the system.

##### What is wrong with traditional monitoring ?

- The traditional approach of using metrics and monitoring is fundamentally a reactive approach, where we set up alerts and dashboards to monitor specific metrics and logs, and then react to them when they trigger.
- This approach has limitations because it relies on us knowing what to monitor and what to alert on, but on issues which can arise from unexpected interactions between components.
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

## Role of Cardinality and Dimensionality in Observability

- **Cardinality** is the number of unique values that a particular attribute can have. In the context of databases, it refers to the uniqueness of data valies contained in a column. High cardinality means that there are many unique values, while low cardinality means that there are few unique values. For example, UUID is a high cardinality attribute because it can have a large number of unique values, while a boolean attribute is a low cardinality attribute because it can only have two unique values.
  - High cardinality attributes are essential for observability because they allow us to identify and track individual users, sessions, or requests.
  - Metrics based tooling can only deal with low cardinality attributes, which place unintended restrictions on the ways that data can be interogated.

- **Dimensionality** refers to the number of attributes or features that are used to describe a particular entity or object.
  - In observable systems, telemetry data is generated as an wide structured event. They are wide because they can and should contains 100s or even 1000s of key-value pairs (dimensions).
  - More dimensions means wider the event, the more richer context captured when the event occurred, and thus more we can discover what happened in the system when we are trying to debug an issue.

> [!NOTE]
> Observeability is often mischaracterised as being achieved when we have three pillars of different elementary data types (Metrics, Traces and Logs). However, if we must have three pillars of observability, then what they should be is tooling that it supports high cardinality, high dimensionality and explorability.

#### How it helps in debugging ?

- Observability encourages us to capture as much context as possible, which allows us to ask any question about our system at some point down the line.
- Observability tools are specifically designed to query against high cardinality and high dimensionality data to interrogate the data in any number of aribitrary ways, which is essential for debugging complex systems.

> A key function of observable systems is the ability to explore our system in open-ended ways, because observeability means that we can understand and explain any state our system can get into no matter how novle or bizarre without shipping and new code.

> [!CAUTION]
> Monitoring takes a reactive approach — it only catches problems we've already predicted and added checks for. If something unexpected breaks, we have to see it happen first, then investigate what went wrong, and wait to see the same issue again before we can add a proper check for it. This cycle is slow and frustrating. Observability is different — it lets us ask any question about our system's state whenever we need to, without having to deploy new code or wait to see the problem twice.

- In distributed systems, the ratio of _predictable failurs **:** unpredictable failures_ is heavily weighted towards novel and bizarre unpredictable failures, which is why observability is so important for modern software systems.
