# System Design Interview Prep

### Phase 1 — Theoretical Questions

#### Topic 1 — Client-Server Architecture & Communication

> Maps to: `01-client-service-architecture.md`, `02-real-time-communication.md`

1. How would we choose between WebSockets, SSE, and long polling for a chat app, a stock ticker, and an LLM streaming UI?
2. How would we choose between REST, GraphQL, and gRPC for a public mobile API, an internal high-throughput microservices mesh, and a flexible client with nested data?
3. Why is SSE almost always enough for server-to-client push, and what breaks WebSockets in corporate proxy environments?
4. How does HTTP/1.1 keep-alive compare to HTTP/2 multiplexing and HTTP/3 over QUIC, and when does HTTP/3's connection migration matter for mobile users?
5. Why is TCP slow to establish a connection, and how does head-of-line blocking hurt it? How does HTTP/3 solve that head-of-line blocking?

#### Topic 2 — Monolithic vs Microservices

> Maps to: `03-monolithic-microservices.md`

1. When should a team stick with a monolith, and what are 3 signals it's time to decompose it?
2. Why is a shared database across multiple services still a monolith in disguise, even when database-per-service is the goal?
3. When does orchestration fit inter-service communication better than choreography, and vice versa?
4. Why does a big-bang monolith-to-microservices migration usually fail, and how does the Strangler Fig pattern avoid that?
5. How do we decide service boundaries — by team ownership, bounded context, or transactional consistency — and which signal is strongest?

#### Topic 3 — Distributed Systems Fundamentals

> Maps to: `04-distributed-systems.md`

1. What's the difference between linearizable, sequential, causal, and eventual consistency, and can we give a real system for each?
2. Why is "pick two" a simplification of the CAP theorem, and what does it actually mean during a network partition?
3. How would we design a distributed lock? Why are leases alone not enough, and what role do fencing tokens play?
4. What is split-brain, and how does quorum-based consensus like Raft prevent it during a partition?
5. What's the difference between strong, eventual, and read-your-writes consistency, and when would we pick each?

#### Topic 4 — Message Queues & Async Processing

> Maps to: `05-message-queues.md`

1. When is Kafka the right choice over RabbitMQ, and why is "Kafka as a task queue" considered an anti-pattern?
2. What's the difference between at-most-once, at-least-once, and exactly-once delivery, and why is true exactly-once so hard to achieve?
3. Why is the idempotent consumer pattern mandatory when using at-least-once delivery?
4. What's the difference between a topic and a queue, and how does Kafka preserve per-partition order across consumer groups?
5. When do we use a Dead Letter Queue, and how does a backoff strategy prevent poison-message loops?

#### Topic 5 — Caching Strategies

> Maps to: `06-caching-and-load-balancing.md`

1. Between cache-aside, read-through, write-through, and write-behind, which is the 95% default, and why?
2. When does LRU win over LFU as an eviction policy, and why does Redis use an approximated LRU?
3. What causes a cache stampede, and what are 3 mitigations against it?
4. How does a CDN act as a caching layer, and what do Cache-Control and ETag headers do for invalidation?
5. How do we compare TTL-based, explicit, and versioned-key cache invalidation strategies across multiple instances?

#### Topic 6 — Load Balancing

> Maps to: `06-caching-and-load-balancing.md`

1. What's the operational difference between L4 and L7 load balancing, and when does each matter for TLS termination, WebSockets, or gRPC multiplexing?
2. Between round-robin, weighted round-robin, least-connections, and IP-hash, which algorithm fails for long-lived connections?
3. Why are sticky sessions considered a smell, and when are they actually justified?
4. What's the difference between active and passive health checks, and how do we drain connections without causing flapping?
5. What extra responsibilities does an API gateway take on compared to a plain reverse proxy or load balancer?

#### Topic 7 — Database Sharding & Partitioning

> Maps to: `07-database-sharding.md`

1. What makes a shard key bad, and how does it lead to hot spots or cross-shard scans?
2. Why does consistent hashing cause less churn than `hash % N`, and what are virtual nodes for?
3. What causes a hot partition, like a celebrity tweet or viral product, and what mitigations fix it?
4. When is range sharding, hash sharding, or directory sharding the right choice?
5. Why is sharding a last resort, and what do we exhaust first — vertical scaling, read replicas, caching, or connection pooling?

#### Topic 8 — NoSQL vs SQL

> Maps to: `08-non-relation-databases.md`

1. Why is "pick two" a simplification of the CAP theorem, and what does PACELC add?
2. What decision criteria push us toward SQL vs NoSQL — schema, joins, consistency, scale, and latency?
3. What workload is each database type designed for — key-value (Redis, DynamoDB), document (MongoDB), column-family (Cassandra), and graph (Neo4j)?
4. What's the trade-off between ACID and BASE, and which system illustrates each — Spanner for global ACID, Cassandra for tunable BASE?
5. Why is "SQL core plus NoSQL specialized for cache, sessions, and activity log" the common production hybrid?

#### Topic 9 — Distributed Transactions

> Maps to: `09-distributed-transactions.md`

1. Why does 2PC block on coordinator failure, and when do we actually still need it?
2. What's the difference between Saga orchestration and choreography, and why are compensating transactions forward-recovery rather than rollback?
3. Why is the outbox pattern mandatory for any saga that publishes events, and how does CDC compare to polling for this?
4. What's the lookup-table pattern for idempotency keys, and why does Stripe prune entries after 24 hours?
5. What does the modern default of Saga plus outbox plus idempotency plus an orchestrator like Temporal solve at each layer?

#### Topic 10 — Capacity Estimation / Back-of-Envelope

> Maps to: `10-capacity-estimation.md`

1. What are the Jeff Dean latency numbers we should know — L1 cache, RAM, SSD random read, same-DC RTT, cross-continent RTT — and why do the order-of-magnitude jumps matter?
2. How do we estimate QPS from DAU and actions per user per day, and what peak multiplier do we apply?
3. How would we estimate storage for a URL shortener at 100M new URLs/month over 5 years, including the replication, index, and backup multiplier stack?
4. Why must we separate read QPS from write QPS when estimating bandwidth?
5. Why do we design for peak, not average, and what's an example where peak is 10x average, like sports streaming?

#### Topic 11 — Rate Limiting

> Maps to: `11-rate-limiting-and-graphql.md`

1. Between token bucket, leaky bucket, fixed window, and sliding window counter, which is the default for API throttling, and why?
2. Why does in-memory per-node rate limiting fail across 100 nodes, and how does a Redis-plus-Lua atomic approach fix it?
3. With a token bucket of capacity 100 and refill rate 10/s, what's the burst budget?
4. What's the fixed-window boundary burst bug (99 requests at 11:59 plus 100 at 12:00 equals 199 in under 60 seconds), and how does a sliding window counter fix it with O(1) memory?
5. When do we fail open vs fail closed if Redis goes down, for a public API vs a payment endpoint?

#### Topic 12 — Scalability Patterns

> Cross-cutting (spans all notes)

1. Why do we scale horizontally for stateless services, and when does vertical scaling win instead, like a single-writer DB or in-memory state?
2. Why does being stateless unlock horizontal scaling, blue-green deploys, and load-balancer-algorithm freedom?
3. What's the DB scaling ladder — indexing, pooling, read replicas, caching, sharding — and why is sharding the last resort?
4. What problem does connection pooling solve, and how does pool max size interact with the DB's max_connections limit?
5. Between circuit breaker, bulkhead, and graceful degradation, which do we reach for first when a downstream is flaky?

---

### Phase 2 — Core "Design X" Problems

| #   | Problem                                              | Scale Context                       | Key Concepts Probed                                                                                                                 | Note Map   |
| --- | ---------------------------------------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| 1   | **Design Twitter / News Feed**                       | 300M DAU                            | Fan-out on write vs read, timeline generation, the celebrity problem, ranking, real-time trending, cache invalidation               | 04, 06, 07 |
| 2   | **Design URL Shortener (TinyURL)**                   | 100M new URLs/mo, 10B redirects/day | Hashing (base62, MD5+counter), key-value storage, consistent hashing, sharding, 301 vs 302 redirects, cache-aside                   | 07, 06, 10 |
| 3   | **Design WhatsApp / Chat**                           | 1B users, 50M DAU                   | WebSocket connection management at scale, message ordering, delivery guarantees, group fan-out, presence, push notifications        | 02, 04     |
| 4   | **Design Distributed Rate Limiter**                  | 50K QPS, multi-region               | Token/sliding/leaky bucket algorithms, atomic Redis operations, distributed shared state, race conditions, fail-open vs fail-closed | 11, 04     |
| 5   | **Design Distributed Cache / KV Store (Redis-like)** | 100M keys, 1M QPS                   | Consistent hashing, replication, eviction policies, cache-aside vs write-through vs write-back, cache stampede, failure detection   | 06, 07, 04 |

> [!IMPORTANT]
> For each design problem, structure the answer: clarify requirements → capacity estimate → high-level design → deep dive → bottlenecks/tradeoffs. The interviewer grades against this framework.

---

> [!NOTE]
> Reusable interviewer prompt + full question bank. Paste the prompt into any AI (ChatGPT/Claude/opencode) → it becomes a FAANG mock interviewer asking **one question at a time**, grading our answers, and pointing us back to the relevant note file for revision.

## How we use this

1. Copy the **Interviewer Prompt** block below.
2. Paste into a fresh AI session with this question bank available below the prompt.
3. The AI asks one question; we answer; it grades (✅/⚠️/❌) + flags the note file to revise.
4. Flow: **Phase 1** (theory, 12 topics, revision-paced) → **Phase 2** (5 core design problems).

---

## Interviewer Prompt

```markdown
You are a FAANG-level system design mock interviewer. Obey these hard rules without exception:

- Ask exactly ONE question at a time. Never batch, list, or dump multiple questions. Never reveal upcoming questions. Always wait for the candidate's answer before proceeding.
- Stay in character: concise, evaluative, interviewer tone. Do not give full model answers unless the candidate explicitly asks for one.
- Use ONLY the question bank provided below this prompt in the same document. Do not invent questions outside that bank. Short follow-up probes on the candidate's answer are permitted.
- After each answer, evaluate using this exact format: (1) Grade: ✅ strong, ⚠️ partial, or ❌ gap. (2) One sentence on what was missed. (3) One-line revision pointer citing the relevant note file. This is a revision session, not a cold screen — grade on whether the core idea landed, not full ceremony. A "strong" grade just needs the right concept + one clear tradeoff; full structured walkthrough (clarify → estimate → high-level → deep dive → tradeoffs) is expected only for Phase 2 design problems.
- If the candidate says "skip", "next", or "done", move on gracefully with no penalty.
- Maintain a progress tracker covering all theoretical topics and design problems. Recap completed items, remaining items, and overall performance at session end.

Session structure:

- Phase 1: Theoretical / conceptual questions. Topics map to note files:
  - 01-client-service-architecture.md → client-server, networking, TCP/UDP, HTTP/HTTPS, WebSockets, SSE, gRPC, REST/GraphQL
  - 02-real-time-communication.md → real-time push, WebSockets, long polling, SSE
  - 03-monolithic-microservices.md → monolith vs microservices, service decomposition
  - 04-distributed-systems.md → consistency, CAP, availability, consensus, leader election, distributed locks
  - 05-message-queues.md → Kafka vs RabbitMQ, pub/sub, delivery semantics, backpressure
  - 06-caching-and-load-balancing.md → cache strategies, eviction, CDN, L4/L7 LB, algorithms
  - 07-database-sharding.md → sharding keys, consistent hashing, hot partitions, rebalancing
  - 08-non-relation-databases.md → NoSQL types, CAP, BASE, SQL vs NoSQL
  - 09-distributed-transactions.md → 2PC, Saga, TCC, outbox, idempotency
  - 10-capacity-estimation.md → back-of-envelope, QPS/storage/bandwidth, latency numbers
  - 11-rate-limiting-and-graphql.md → token/leaky bucket, sliding window, distributed rate limiting
- Phase 2: Five core "Design X" high-level design problems.

Kickoff: Introduce yourself in one line. State the format. Ask the candidate where to start (default Topic 1). Then ask the first question from the selected topic.
```
