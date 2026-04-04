## Database Sharding

For example, we are choosing data store for amazon application:

- **User Data**: name, address, payment information, etc.
- **Product Data**: titles, description, images, prices, etc.
- **Order Data**: id, product id, invoice id, item, quantity, shipping address, etc.
- **Inventory Data**: stack levels, quantity, availability, etc.
- **User Interaction Data**: search queries, product reviews, ratings, etc.

We need to understand that every kind of data needs different organization and handling. For example, user data is mostly read and updated, product data is mostly read, order data is mostly written, inventory data is mostly updated, and user interaction data is mostly written. So, we need to choose appropriate data store for each kind of data.

#### How to choose appropriate data store ?

It is based on non functional requirements:

- **Data Model**: structure and complexity
- **Scalability**: throughput load
- **Consistency**: strong or eventual
- **Read/Write Ratio**: read heavy or write heavy
- **Data compliance**: regulatory requirements

Moreover, community support and future requirements also play important role.

#### What is difference between data stores and databases ?

Redis, S3, HDFS, Message Queues, CDN, Google Drive, Azure Blob etc. are data stores.. However, we can't query data from these data stores. On the other hand, MySQL, MongoDB, Cassandra, DynamoDB etc. are databases. We can query data from these databases.

```
                                                ┌──────────────┐
                                                │  Databases   │
                                                │  (Queryable) │
                                                └──────┬───────┘
                                                       │
                                         ┌─────────────┴─────────────┐
                                         │                           │
                                         ▼                           ▼
                              ┌──────────────────────┐  ┌──────────────────────────┐
                              │   Relational         │  │   Non-Relational         │
                              │   (SQL)              │  │   (NoSQL)                │
                              │                      │  │                          │
                              │ - Structured data    │  │ - Flexible schema        │
                              │ - ACID compliant     │  │ - Horizontally scale     │
                              │ - Vertical scale     │  │ - High availability      │
                              │ - Strong consistency │  │ - Eventual consistency   │
                              │ - SQL query (join,   │  │ - Key/ID based lookup    │
                              │   filter, aggregate) │  │ - No joins (denormalized)│
                              └────────┬─────────────┘  └──────────┬───────────────┘
                                      │                             │
                                      ▼                             ▼
                              ┌─────────────────────────┐  ┌───────────────────────┐
                              │  MySQL                  │  │  ┌─────────────────┐  │
                              │  PostgreSQL             │  │  │  Document       │  │
                              │  Oracle DB              │  │  │  MongoDB        │  │
                              │  SQLite                 │  │  ├─────────────────┤  │
                              │  MariaDB                │  │  │  Columnar       │  │
                              │  MS SQL Server          │  │  │  Cassandra      │  │
                              └─────────────────────────┘  │  ├─────────────────┤  │
                                                           │  │  Key-Value      │  │
                                                           │  │  DynamoDB       │  │
                                                           │  ├─────────────────┤  │
                                                           │  │  GraphDB        │  │
                                                           │  │  Neo4j          │  │
                                                           │  ├─────────────────┤  │
                                                           │  │  Time Series    │  │
                                                           │  │  InfluxDB       │  │
                                                           │  └─────────────────┘  │
                                                           └───────────────────────┘
```

> **HOMEWORK**
> | DB Names | Use cases | Availability | Consistency | Scalability |
> | --- | --- | --- | --- | --- |

#### Some important points to consider regarding scalability:

In databases, we have two types of scalability:

- **Vertical Scaling**: adding more resources (CPU, RAM, storage) to a single server.
- **Horizontal Scaling**: adding more servers to distribute the load.

It is important to know that vertical scaling has limitations and can be expensive, while horizontal scaling can provide better performance and availability.

#### Database Partitioning

Breaking large database into smaller ones.

![Types of Partitioning](/assets/2026-04-01-23-19-14.png)

> Huge disadvantage of database partitioning is that joining data across partitions is expensive and complex. It can lead to performance issues and increased latency.
> ![Disadvantage](/assets/2026-04-01-23-40-53.png)

> Horizontal partitioning is also known as sharding.

![Sharding types](/assets/2026-04-01-23-26-10.png)

There are two ways of physical sharding:

- **Algorithmic Sharding**: we write logic on application layer to determine which shard to use.
- **Dynamic Sharding**: we maintain a lookup server that maps data to shards. This would increase latency due to extra network call.

> [!IMPORTANT]
>
> **Local Cache in Databases**
>
> Databases maintain their own in-memory cache (within the DB process itself) to avoid hitting disk for every read. This is different from distributed caches like Redis — it lives on the same machine as the database node.
>
> - **Buffer Pool**: Caches data pages and index pages from disk. When a query needs data, the DB first checks the buffer pool. A miss results in a disk read and the page is loaded into the pool. Warm buffer pool = fast reads. This is why restarting a DB node causes a latency spike — the buffer pool is cold.
> - **Query Cache**: Stores result sets of completed queries along with the query itself. If the same query is received again, the DB returns the cached result without parsing, optimizing, or executing. However, any data modification invalidates the cache, making it less useful for write-heavy workloads. MySQL deprecated query cache in 8.0 for this reason.
> - **Key File Cache (MyISAM Key Cache)**: Caches index blocks for MyISAM tables. Similar to buffer pool but only for indexes, not data.
>
> **Relevance to Sharding**:
>
> - Each shard has its own local cache. There is no cache sharing across shards.
> - A query routed to a wrong shard will never benefit from that shard's buffer pool, adding disk latency.

##### How do we determine on application layer in algorithmic sharding which shard to use ?

- **Hash-Based Sharding**: we can use a hash function on the shard key (e.g., user ID) to determine the shard. For example, `shard_id = hash(req_id / user_id) % number_of_shards`.
- **Range-Based Sharding**: we can define ranges of shard keys for each shard. For example, users with IDs 1-1000 go to shard 1, 1001-2000 go to shard 2, etc.
- **Directory-Based Sharding**: we can maintain a lookup table that maps shard keys to shard IDs. For example, we can have a table that says user ID 1-1000 is on shard 1, user ID 1001-2000 is on shard 2, etc.
- **Geographical Sharding**: we can shard data based on geographical location. For example, users in North America go to shard 1, users in Europe go to shard 2, etc.
- **Random Sharding**: we can randomly assign or round robin shard keys to shards. For example, we can use a random number generator to assign user IDs to shards.

It is important to pick appropriate sharding to evenly distribute the load on multiple servers.

#### Consistent Hashing

##### The Problem with Naive Hash-Based Sharding

With simple hash sharding (`shard_id = hash(key) % N`), the mod operation **N** (number of shards) is baked into the formula. When you change N — by adding or removing a shard — **every single key maps to a different shard**.

### Concrete example:

Say you have 4 shards and user IDs:

```
hash(alice)  = 7  → 7 % 4 = 3  → Shard 3
hash(bob)    = 5  → 5 % 4 = 1  → Shard 1
hash(carol)  = 3  → 3 % 4 = 3  → Shard 3
```

Now you add a 5th shard. **Every key remaps:**

```
hash(alice)  = 7  → 7 % 5 = 2  → Shard 2  (was 3)
hash(bob)    = 5  → 5 % 5 = 0  → Shard 0  (was 1)
hash(carol)  = 3  → 3 % 5 = 3  → Shard 3  (unchanged)
```

> [!CAUTION]
> Please note that, the consistent hashing is just a concept which is already implemented in many distributed databases and caching systems. For example, Redis Cluster, Cassandra, Amazon DynamoDB also uses consistent hashing to distribute data across multiple partitions. We just need to understand the concept of consistent hashing, not the implementation details of these databases.

In consistent hashing, we distribute the servers on a ring, and the requests IDs are hased and is routed to nearest server on the ring in clockwise direction. When we add or remove a server, only a small portion of the keys need to be remapped to different servers, which allows for better scalability and availability of the system

##### Virtual Nodes (VNodes)

We place each physical server at **multiple positions** on the ring. Each position is a virtual node (VNode).

```
Shard A → VN: A1, A2, A3
Shard B → VN: B1, B2, B3
Shard C → VN: C1, C2, C3
```

More VNodes per physical server = more uniform distribution. Typical: 100-200 VNodes per server.

###### Advantages of virtual nodes

- **Better Load Distribution**: With multiple VNodes, the keys are more evenly distributed across physical servers, reducing hotspots.
- **Faster Rebalancing**: When adding/removing a server, only the keys mapped to that server's VNodes need to be remapped, minimizing disruption.
