## SDE-2 (4 YOE) Backend Interview Revision Notes

#### 1. Between Round Robin, Weighted Round Robin, Least Connections, and IP Hash, which algorithm fails for long-lived connections?

**Answer:**

**Least Connections** is the preferred algorithm for long-lived connections (e.g., WebSockets, gRPC streams) because it routes new requests to the server with the fewest active connections.

**Round Robin** and **Weighted Round Robin** perform poorly because they distribute requests without considering existing active connections. A server with many long-lived connections may continue receiving new traffic.

**IP Hash** provides session affinity (sticky sessions) but does not guarantee balanced load. Heavy clients mapped to the same backend can create hotspots.

---

#### 2. In a read-heavy system (10K reads/sec, 100 writes/sec), where would you place the cache?

**Answer:**

Use a layered cache hierarchy:

```
Browser Cache
      ↓
CDN
      ↓
Reverse Proxy (Nginx)
      ↓
Redis / Application Cache
      ↓
Database
```

The request should be served from the first cache that contains the data. Reverse proxy and Redis significantly reduce application and database load. When data changes, invalidate or update the cache layers storing that data.

---

#### 3. A Redis key has a TTL of 1 hour, but the underlying data changes after 5 minutes. How do you prevent stale data?

**Answer:**

Use the **Cache Aside** pattern.

1. Update the database (source of truth).
2. Delete the corresponding Redis key.
3. The next read results in a cache miss.
4. Fetch fresh data from the database.
5. Repopulate Redis with the latest value.

Never rely solely on TTL for data freshness.

---

#### 4. After deleting a cache key, thousands of requests hit the database simultaneously. What is this problem and how do you solve it?

**Answer:**

This is called **Cache Stampede (Dogpile Effect)**.

Mitigations:

- Request Coalescing (Single Flight)
- Distributed Lock (Redis Lock)
- Randomized TTL (TTL Jitter)
- Background Cache Refresh / Stale-While-Revalidate

The most effective mitigation is ensuring only one request rebuilds the cache while others wait.

---

#### 5. Your Redis cache is accidentally flushed (`FLUSHALL`). How do you prevent the database from getting overwhelmed?

**Answer:**

Immediately after cache loss, every request becomes a cache miss, causing a massive spike in database traffic.

Mitigations:

- Request Coalescing / Single Flight
- Rate Limiting or Load Shedding
- Read Replicas
- Redis High Availability (Cluster/Sentinel)
- Stale-While-Revalidate for frequently accessed data

If choosing only one solution, prefer **Request Coalescing** because it prevents duplicate database queries for the same key.

---

#### 6. A backend server becomes very slow (50 ms → 8 s) but still returns HTTP 200. How should the load balancer handle it?

**Answer:**

Basic health checks may still consider the server healthy.

Use:

- Passive Health Checks
- Latency-based Outlier Detection
- Circuit Breakers
- Least Connections

These mechanisms automatically reduce or stop routing traffic to degraded instances before they become a bottleneck.

---

#### 7. When does LRU outperform LFU, and why does Redis use an approximated LRU?

**Answer:**

Choose **LRU** when recent access predicts future access (sessions, feeds, dashboards).

Choose **LFU** when access patterns remain stable over time (product catalogs, configuration data).

Redis uses **Approximated LRU** because maintaining an exact LRU ordering for millions of keys is expensive in terms of CPU and memory. Instead, Redis samples a small number of keys and evicts the least recently used among them, providing near-LRU performance with much lower overhead.

---

#### 8. What extra responsibilities does an API Gateway take on compared to a Reverse Proxy or Load Balancer?

**Answer:**

A Reverse Proxy or Load Balancer mainly performs:

- Request forwarding
- Load balancing
- Health checks
- SSL/TLS termination
- Basic routing

An API Gateway additionally provides:

- Authentication
- Authorization
- Rate Limiting
- Request Routing
- Request/Response Transformation
- Response Aggregation (BFF Pattern)
- API Versioning
- Caching
- Logging, Metrics & Tracing
- Circuit Breaking, Retries & Timeouts
- Request Validation
- Header Manipulation

It centralizes cross-cutting concerns and hides the internal microservice architecture from clients.
