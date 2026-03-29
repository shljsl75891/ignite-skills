## Caching and Load Balancing

#### Caching

**Locality of Reference Principle**: Anything requested once is likely to be requested again. It states that a program tends to access the small datasets repeatedly over a short period of time. Caching is a technique that takes advantage of this principle by storing frequently accessed data in a faster storage, such as memory, to improve the performance of the system.

- Cached content is stored in memory (RAM) which is a faster to access but volatile memory. Whereas, the original content is stored in a slower storage, such as disk or database, which is non-volatile memory.
- Caching is used to improve the latency of accessing frequently access data.

![](/assets/2026-03-28-18-58-18.png)

> We can cache different kind of data on different layers of the system. Some data can be cached on client side, some on server side, and some on both sides. For example, we can cache static assets such as images and videos on client side, while caching dynamic data such as user profiles and product information on server side.

##### Cache Eviction Policies

- **Least Recently Used (LRU)**: An LRU cache is a fixed-size caching mechanism that stores key–value pairs and, when full, evicts the item that has not been accessed for the longest time. It prioritizes the items that have been accessed recently, and evicts the least recently used items when the cache is full.
- **Least Frequently Used (LFU)**: An LFU cache is a fixed-size caching mechanism that stores key–value pairs and, when full, evicts the item that has been accessed the least number of times. It prioritizes the items that have been accessed more frequently, and evicts the least frequently used items when the cache is full.
- **First In First Out (FIFO)**: A FIFO cache is a fixed-size caching mechanism that stores key–value pairs and, when full, evicts the item that was added to the cache first. It prioritizes the items that were added to the cache more recently, and evicts the oldest items when the cache is full.
- **Last In First Out (LIFO)**: A LIFO cache is a fixed-size caching mechanism that stores key–value pairs and, when full, evicts the item that was added to the cache last. It prioritizes the items that were added to the cache more recently, and evicts the most recently added items when the cache is full.
- **Random Replacement (RR)**: A RR cache is a fixed-size caching mechanism that stores key–value pairs and, when full, evicts a random item from the cache. It does not prioritize any items and evicts items randomly when the cache is full.
- **Most Recently Used (MRU)**: A MRU cache is a fixed-size caching mechanism that stores key–value pairs and, when full, evicts the item that has been accessed most recently. It prioritizes the items that have been accessed less recently, and evicts the most recently used items when the cache is full.

> TTL = Time To Live, which is the duration for which a cache entry is considered valid. After the TTL expires, the cache entry is considered stale and will be evicted from the cache.

##### Cache Invalidation

It is important to keep cache consistent with single source of truth i.e. the original data store. Cache invalidation is the process of removing or updating cache entries when the underlying data changes. This can be done using different strategies such as:

- **Write-through cache**: In this strategy, we first write to the cache and then write to the original data store. This ensures that the cache is always strongly consistent with the original data store.

| Advantages         | Disadvantages                       |
| ------------------ | ----------------------------------- |
| Strong consistency | Higher latency for write operations |
| Reliable           | Performace overhead                 |

- **Write-back cache**: In this strategy, we immedietly return by writting through cache and then write to the original data store asynchronously.

| Advantages              | Disadvantages         |
| ----------------------- | --------------------- |
| Lower latency           | Data consistency risk |
| Faster write operations | Less reliable         |
| High Throughput         | Data loss risk        |

- **Write Around Cache**: In this strategy, we write directly to the original data store and update / delete the cache while returing response.

> [!TIP]
> The Redis and Memcache are popular in memory distributed caching systems.

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
