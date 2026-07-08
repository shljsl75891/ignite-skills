## Caching and Load Balancing

#### Caching

![](/assets/2026-07-06-12-32-34.png)

**Locality of Reference Principle**: Anything requested once is likely to be requested again. It states that a program tends to access the small datasets repeatedly over a short period of time. Caching is a technique that takes advantage of this principle by storing frequently accessed data in a faster storage, such as memory, to improve the performance of the system.

- Cached content is stored in memory (RAM) which is a faster to access but volatile memory. Whereas, the original content is stored in a slower storage, such as disk or database, which is non-volatile memory.
- Caching is used to improve the latency of accessing frequently access data.

![](/assets/2026-03-28-18-58-18.png)

> We can cache different kind of data on different layers of the system. Some data can be cached on client side, some on server side, and some on both sides. For example, we can cache static assets such as images and videos on client side, while caching dynamic data such as user profiles and product information on server side.

##### Where to Cache

We can place a cache at multiple layers of our system. Each layer solves a different problem.

- **External Caching**: A standalone cache service (Redis, Memcached) that our app talks to over the network. Every app server shares the same cache, so it scales well and supports eviction policies + TTL. Use case: high-traffic reads shared across multiple app servers - our default answer for caching.

- **CDN Caching**: A geographically distributed network of edge servers that cache content close to users. Use case: static media (images, video) served at scale to geographically spread users; also increasingly used for public API responses and edge logic.

- **Client-Side Caching**: Data cached on the user's device (browser HTTP cache, localStorage, mobile local storage). We have limited control over it from the backend and invalidation is harder. Use case: offline support and reducing network calls, e.g. Strava keeping run data on device while offline and syncing later.

- **In-Process Caching**: Data cached directly inside the app process's memory instead of calling out to Redis. Reads are even faster than Redis since there's no network hop. Use case: small, frequently accessed values that rarely change - config values, feature flags, hot keys, rate-limiting counters, precomputed values. Downside: each instance has its own cache, so data isn't shared across servers and invalidation on one instance doesn't propagate to others. We mention this only as an optimization layer, after we've already introduced an external cache.

##### Cache Eviction Policies

- **Least Recently Used (LRU)**: An LRU cache is a fixed-size caching mechanism that stores key–value pairs and, when full, evicts the item that has not been accessed for the longest time. It prioritizes the items that have been accessed recently, and evicts the least recently used items when the cache is full.
- **Least Frequently Used (LFU)**: An LFU cache is a fixed-size caching mechanism that stores key–value pairs and, when full, evicts the item that has been accessed the least number of times. It prioritizes the items that have been accessed more frequently, and evicts the least frequently used items when the cache is full.
- **First In First Out (FIFO)**: A FIFO cache is a fixed-size caching mechanism that stores key–value pairs and, when full, evicts the item that was added to the cache first. It prioritizes the items that were added to the cache more recently, and evicts the oldest items when the cache is full.
- **Last In First Out (LIFO)**: A LIFO cache is a fixed-size caching mechanism that stores key–value pairs and, when full, evicts the item that was added to the cache last. It prioritizes the items that were added to the cache more recently, and evicts the most recently added items when the cache is full.
- **Random Replacement (RR)**: A RR cache is a fixed-size caching mechanism that stores key–value pairs and, when full, evicts a random item from the cache. It does not prioritize any items and evicts items randomly when the cache is full.
- **Most Recently Used (MRU)**: A MRU cache is a fixed-size caching mechanism that stores key–value pairs and, when full, evicts the item that has been accessed most recently. It prioritizes the items that have been accessed less recently, and evicts the most recently used items when the cache is full.

> TTL = Time To Live, which is the duration for which a cache entry is considered valid. After the TTL expires, the cache entry is considered stale and will be evicted from the cache.

##### Cache Architectures

It is important to keep cache consistent with single source of truth i.e. the original data store. Cache invalidation is the process of removing or updating cache entries when the underlying data changes. This can be done using different architectures such as:

- **Cache-Aside (Lazy Loading)**: The app checks the cache first. On a hit, it returns the cached value. On a miss, it fetches from the database, stores the result in the cache, then returns it. Use case: general read-heavy workloads - this is the default pattern we should reach for in interviews, since it only caches data when needed and keeps the cache lean.

![](/assets/2026-07-08-14-43-05.png)

| Advantages                                 | Disadvantages                                       |
| ------------------------------------------ | --------------------------------------------------- |
| Cache stays lean (only caches what's used) | Cache miss adds extra latency                       |
| Simple to reason about                     | Stale data possible until next write invalidates it |

- **Write-Through**: We write only to the cache, and the cache synchronously writes through to the database before acknowledging the write. Use case: reads must always return fresh data and we can tolerate slightly slower writes, e.g. financial or inventory data.

![](/assets/2026-07-08-14-43-31.png)

| Advantages                              | Disadvantages                                                                                   |
| --------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Strong consistency between cache and DB | Higher write latency                                                                            |
| Reliable reads                          | Requires a cache library/framework that supports write-through - Redis doesn't do this natively |

> [!CAUTION]
> Write-through still has the dual-write problem: if the cache update succeeds but the DB write fails (or vice versa), the two stores can end up inconsistent. We need retry logic or error handling to fully close this gap.

- **Write-Behind (Write-Back)**: We write only to the cache, and the cache batches and flushes writes to the database asynchronously in the background. Use case: high write throughput where eventual consistency is acceptable, e.g. analytics and metrics pipelines.

![](/assets/2026-07-08-14-43-50.png)

| Advantages            | Disadvantages                                       |
| --------------------- | --------------------------------------------------- |
| Lower write latency   | Data consistency risk                               |
| High write throughput | Data loss risk if the cache crashes before flushing |

- **Read-Through**: The cache acts as a smart proxy - our app never talks to the DB directly. On a miss, the cache itself fetches from the DB, stores it, and returns it. Use case: systems where we want the cache to own fetch-on-miss logic, e.g. CDNs are a read-through cache; less common for application-level Redis caching where cache-aside is simpler.

![](/assets/2026-07-08-14-44-17.png)

- **Write-Around Cache**: We bypass the cache entirely on writes - the write goes straight to the primary DB. The cache only gets populated later, when the written data is subsequently read. This keeps the cache from being polluted with data that's rarely accessed.

![](/assets/2026-07-08-15-13-34.png)

How it works:

1. **Write Path**: The write goes straight to the DB, skipping the cache.
2. **Read Path**: When the app needs that data, it checks the cache first.
3. **Cache Miss & Population**: On a miss, we fetch from the DB and insert it into the cache for future reads.

| Advantages                                                                                                       | Disadvantages                                                                                                                                                                                                                |
| ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Prevents cache pollution - ideal for write-heavy workloads or logging where data is rarely read back immediately | Higher initial read latency - first read after a write is a cache miss                                                                                                                                                       |
| Faster initial writes - no synchronous double-write                                                              | Stale data on cache hit - if a cached copy already exists from a prior read and we then write-around update the record, the cache entry isn't invalidated, so hits keep returning the old value until TTL/eviction clears it |

Use case: logging and analytics (high write volume, occasionally queried), large file/media uploads (shouldn't occupy expensive in-memory cache space), and write-heavy/read-rare workloads in general.

> [!TIP]
> Redis and Memcache are popular in-memory distributed caching systems.

##### Global cache for distributed systems

While using caching in distributed systems, keeping cache different for every microservice needs cache coherency.

**Cache Coherence**: It is the consistency of data stored in cache across multiple nodes in a distributed system. It ensures that all nodes have the same view of the cached data, and that any updates to the cached data are propagated to all nodes in a timely manner.

To overcome this, we generally use a global cache that is shared across all nodes in the distributed system. This allows for better cache coherence and ensures that all nodes have access to the same cached data.

###### Advantages of Global Cache

- Cache coherency
- Less Data Redundancy accross multiple nodes
- Improved latency due to no propagation delay

> [!TIP]
> Why Redis is more popular than Memcache ?
>
> - Redis supports more data structures such as strings, hashes, lists, sets, sorted sets, etc. Whereas, Memcache only supports key-value pairs.
> - The main advantage of Redis over Memcache is that Redis supports data persistence, which means that the data stored in Redis can be saved to disk and can be recovered in case of a failure. Memcache does not support data persistence, which means that all data stored will be lost if the server goes down or restarts.
> - Data persistence in Redis happens by two mechanisms: RDB (Redis Database) and AOF (Append Only File). RDB creates snapshots of the data at regular intervals, while AOF logs every write operation to a file. By default, Redis uses RDB for data persistence, but it can be configured to use AOF or both RDB and AOF for data persistence.
> - For data persistence, the RDB is faster than AOF, but it can lead to data loss if the server goes down before the next snapshot is taken. AOF is slower than RDB, but it provides better durability and can recover data up to the last write operation.

##### Common Caching Problems

Caching makes systems faster, but it introduces new failure modes we need to plan for.

**Cache Stampede (Thundering Herd)**: A stampede (also called dog-piling) happens when the cached copy of a heavily-read DB record expires and every concurrent request for that record falls through to the database at once. For example, during a flash sale, a product's price/inventory row might be cached with a 30-second TTL and read by 2,000 requests/second as shoppers refresh the page. The moment that cache entry expires, every one of those requests in that window misses the cache simultaneously and queries the DB for the same row - the DB gets hit with thousands of duplicate reads for one record in a fraction of a second, which can overwhelm it and potentially cause congestion collapse ([Wikipedia: Cache stampede](https://en.wikipedia.org/wiki/Cache_stampede)).

How we mitigate it:

- **Locking**: On a cache miss, a process attempts to acquire a lock for that key; only the lock-holder recomputes and repopulates the cache. While the lock is held, other requests for that same key either wait for the result, get a "not-found" response, or are served stale data - which option we pick comes down to a consistency-vs-availability tradeoff per CAP theorem (wait/not-found favor consistency, serving stale data favors availability). This prevents stampedes if implemented correctly, but costs an extra write for the lock and adds complexity around lock TTL tuning and lock-holder failure handling.
- **Request Coalescing (Singleflight)**: Deduplicates concurrent identical requests into a single backend call and shares the result among all callers - if 100 users request the same key at once, we make one DB query instead of 100. Implementations use an in-process "singleflight" pattern for a single instance, or a Redis-based coordinator (lock + pub/sub) when coalescing needs to work across multiple app instances ([OneUptime: How to Implement Request Coalescing](https://oneuptime.com/blog/post/2026-01-25-request-coalescing/view)).

**Cache Consistency**: Happens when the cache and DB return different values for the same data, since most systems read from cache but write to the DB first, leaving a window where the cache is stale.

How we mitigate it:

- **Invalidate on write**: Delete the cache entry right after updating the DB so the next read repopulates it fresh.
- **Short TTLs**: Let slightly stale data live briefly if eventual consistency is acceptable.
- **Accept eventual consistency**: Fine for feeds, metrics, and analytics where a short delay doesn't matter.

**Hot Keys**: A cache entry that receives disproportionate traffic compared to everything else, e.g. a viral profile or trending post. Even with a high overall hit rate, one hot key can overload a single cache node/shard.

How we mitigate it:

- **Replicate the hot key**: Store the same value on multiple cache nodes and load balance reads across them.
- **Add a local fallback cache**: Keep extremely hot values in-process to avoid pounding the shared cache.
- **Rate limit**: Slow down abusive traffic patterns hitting a specific key.

#### Proxy and Load Balancing

> **Proxy**: It is intermediary component that acts on behalf of another entity. There are two types of proxies:
>
> 1. Client Side Proxy or Forward Proxy: It is a proxy that acts on behalf of the client. It receives requests from the client and forwards them to the server. It can be used for various purposes such as caching, security, content filtering, access control etc. Thus, server would only know about the proxy and not the actual client.
> 2. Server Side Proxy or Reverse Proxy: It is a proxy that acts on behalf of the server. It receives requests from the client and forwards them to the appropriate server. It can be used for various purposes such as load balancing, security, caching, SSL termination (The communication between proxy and client would be HTTPS but proxy to servers can be HTTP, so no certificate checks required) etc. Thus, client would only know about the proxy and not the actual server.

- **Load Balancing**: It is the process of distributing incoming network traffic across multiple nodes of same microservice to ensure that no single server becomes overwhelmed with too much traffic.

- **Service Directory**: It is a component that keeps track of all the available servers for a all microservices along with their IP and port information. This can be kept on load balancer itself or can be a separate component. It allows the load balancer to route requests to the appropriate server based on the availability and health of the servers. The request on the final server can be done by service directory or by load balancer itself by getting response from service directory.

###### Load Balancing Strategies

- **Round Robin**: In this strategy, the load balancer distributes incoming requests to servers in a circular manner. Each server receives an equal number of requests in a sequential order. This strategy is simple and easy to implement, but it does not take health checks into account, which can lead to uneven distribution of traffic if some servers are down or experiencing high load.
- **Least Connections**: In this strategy, the load balancer distributes incoming requests to the server with the least number of active connections. This strategy takes into account the current load on each server and can help to ensure that traffic is distributed more evenly across servers.
- **Weighted Round Robin**: In this strategy, the load balancer assigns a weight to each server based on its capacity or performance. The load balancer then distributes incoming requests to servers in a round-robin manner, but servers with higher weights receive more requests than those with lower weights. This strategy can help to ensure that traffic is distributed more efficiently based on the capabilities of each server.
- **Weight Least Connections**: In this strategy, the load balancer assigns a weight to each server based on its capacity or performance. The load balancer then distributes incoming requests to the server with the least number of active connections, but servers with higher weights receive more requests than those with lower weights. This strategy has best of both worlds as it takes into account both the current load on each server and the capabilities of each server to ensure that traffic is distributed more efficiently.
- **IP Hash**: In this strategy, the load balancer uses the client's IP address to determine which server to route the request to. The load balancer applies a hash function to the client's IP address and uses the result to select a server from the pool of available servers. This strategy can help to ensure that requests from the same client are always routed to the same server, which can be useful for stateful systems. However, it may not distribute traffic evenly if there are a large number of clients with similar IP addresses.
- **Content Based**: In this strategy, the load balancer routes incoming requests to servers based on the content of the request. For example, it can route requests for uploading youtube videos to servers that are optimized for handling large file uploads, while routing requests for viewing videos to servers that are optimized for serving video content. This strategy can help to ensure that requests are routed to the most appropriate server based on the specific requirements of each request. However, it can be more complex to implement and may require additional processing overhead to analyze the content of each request.
- **Geo Location Based**: In this strategy, the load balancer routes incoming requests to servers based on the geographic location of the client. For example, it can route requests from clients in North America to servers located in North America, while routing requests from clients in Europe to servers located in Europe. This strategy can help to reduce latency and improve performance for clients by routing their requests to servers that are geographically closer to them. However, it may not be effective if there are a large number of clients with similar geographic locations.

#### CDNs (Content Delivery Networks)

It is a network of geographically distrubuted servers to deliver content to the users efficiently. It is used to improve the performance and availability of web applications by caching content on servers that are closer to the users.

**PoPs (Points of Presence)** are the locations where CDN servers are located. They are strategically placed in different geographic locations according to customer's locations.

- The CDNs are not just for caching, but also for load balancing, security, and DDoS protection. They can help to distribute traffic across multiple servers and can provide additional layers of security to protect against attacks.
- Failover and Redundancy: CDNs can provide failover and redundancy by routing traffic to different servers in the event of a failure. This can help to ensure that content is always available to users, even if one server goes down.

> [!NOTE]
> Modern CDNs are also capable of caching HTTP API responses, GraphQL responses along with static assets. For example: Cloudflare, Akamai, Fastly etc.
