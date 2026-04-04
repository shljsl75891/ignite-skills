#### How is data stored on disks and accessed?

Data is stored on disks in contiguous blocks (assume disk to be circular tracks which is divided into sectors). Data is accessed and stored page-wise. A page is a fixed-length contiguous block of virtual memory. If any data is to be accessed, the entire page containing that data is read into memory (for faster processing).

![](/assets/2026-04-04%20at%2011.25.00%20AM.png)

#### Row DB vs Column DB

- Both store data in tables, but the way they store data is different. Row DB stores data in row-wise, while Column DB stores data in column-wise.
- Row DB is optimized for transactional workloads, while Column DB is optimized for analytical workloads.
- Examples of Row DB: MySQL, PostgreSQL, Oracle. Examples of Column DB: Apache Cassandra.
- For fetching selective columns in row DB, the entire row is read into memory, which can be inefficient if only a few columns are needed, required columns are kept while others are discarded after read. Separate rows can be present in different pages, leading to additional I/O operations. In contrast, column DB can read only the required columns, making it more efficient for such queries.

> [!TIP]
> Column DB can achieve better data compression than Row DB because it stores data in a column-wise manner. Similar data types are stored together, allowing for more effective compression techniques.

#### Indexing

- Indexing is a data structure technique used to quickly locate and access data in a database. A lookup table is created for storing unique identifier of a row with the corresponding location of the data on disk.
- **Advantage**: This allows for faster retrieval of data based on the indexed column(s).
- **Disadvantage**: Indexing may slow down write operations (inserts, updates, deletes) because the index needs to be updated whenever the data changes. So, it is not ideal for write-heavy operations.

#### Multi-level Indexing

- If the index lookup table becomes too large, then it may also take a long time for searching the location of data. To solve this problem, multi-level indexing is used.
- In multi-level indexing, we maintain multiple lookup tables.
- The first level index contains pointers to the second level index, which in turn contains pointers to the actual data.
- This uses B-tree (Balanced binary tree)

![](/assets/2026-04-04%20at%2011.35.00%20AM.png)

> As number of level increase, the more write operations become expensive, because each level of index needs to be updated whenever the data changes.

## MongoDB

| Property               | Value                                                                                                                           |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Data Model             | Binary JSON (BSON)                                                                                                              |
| Schema Flexibility     | Flexible                                                                                                                        |
| Availability           | By default, it prioritise the availability over consistency, it is eventually consistent, although this can be tuned            |
| Scalability            | Horizontally scalable                                                                                                           |
| Read/Write Performance | Optimized for high read heavy operations due to indexing, caching and locking. Due to locking, write performance can be slower. |

> [!TIP]
> Binary JSON = BSON is a binary representation of JSON-like documents. The JSON is stored in compact and binary encoded format instead of plain text. This is not readable by humans.

## TSDB (Time Series Database)

_Use cases_: IoT, monitoring, financial data, etc. Eg. Prometheus, InfluxDB etc.

| Property           | Value                                                                                            |
| ------------------ | ------------------------------------------------------------------------------------------------ |
| Data Model         | Time as key dimension                                                                            |
| Schema Flexibility | Flexible                                                                                         |
| Indexing           | on time key (using B-trees and LSM trees) 2026-04-04 at 11.25.00 AM.png                          |
| Querying           | Optimized for time-based queries (e.g., range queries, aggregations like sum, avg, min max etc.) |
| Scalability        | Horizontally scalable (clustering)                                                               |
| Availability       | By default, it prioritise the availability over consistency                                      |

> [!TIP]
>
> - In casandra, it is write heavy because of LSM tree, which is optimized for write performance. When a write operation occurs, the data is first written to an in-memory structure called a `memtable`.
> - Periodically, the memtable is flushed to disk as an immutable file called an `SSTable` (Sorted String Table).

## Graph Based Database

![](/assets/2026-04-04-12-06-29.png)

_Use cases_: Social networks, recommendation systems, fraud detection, etc. Eg. Neo4j, Amazon Neptune etc.

- **Nodes**: Represent entities (e.g., people, products, etc.)
- **Edges**: Represent relationships between nodes (e.g., "friend of", "purchased", etc.)
- **Properties**: Both nodes and edges can have properties (key-value pairs).

Two Types of Indexing:

- **Node Indexing**: Indexes on node properties to quickly find nodes based on their attributes.
- **Edge Indexing**: Indexes on edge properties to quickly find relationships based on their attributes.

> [!IMPORTANT]
> Graph databases are ACID compliant, which means they provide strong consistency guarantees. This is because graph databases often require complex transactions that involve multiple nodes and edges, and ensuring consistency is crucial for maintaining the integrity of the graph data.

- **CYPHER** is a query language for querying graph databases, similar to SQL for relational databases.
- **Read / Write Performance**: Graph databases are optimized for read-heavy workloads.

## Cassandra

![](/assets/2026-04-04-12-13-36.png)

- It is a wide column database.

> Wide column databases store data in tables with rows and columns, but unlike relational databases, each row can have a different set of columns.

- It is designed for write heavy operations
- The query language used is CQL (Cassandra Query Language)
- It has flexible schema which means we can add new columns to a table without affecting existing rows.

> [!CAUTION]
>
> - As, it is a columnar database. It gives compilation error if we try to query the data in row-wise-manner.
> - It also doesn't have support for JOINS. That's also a reason behind its speed.
> - We mostly stored data in denormalized form, which means we duplicate data to avoid the need for joins.

#### Consistent Hashing

- It uses the concept of consistent hashing to distribute data across multiple nodes in a cluster.
- Each node is assigned a range of hash values, and data is stored on the node responsible for the corresponding hash value.

> [!IMPORTANT]
> Cassandra also asks us about number of replicas (Replication Factor) and number of nodes to read/write (Consistency Level) for a query. This is because Cassandra is designed to be eventually consistent, which means that there may be a delay between when data is written and when it becomes visible to read operations. By specifying the consistency level, we can control how many replicas need to acknowledge a write operation before it is considered successful, and how many replicas need to respond to a read operation before it returns a result. This allows us to balance the trade-off between consistency and availability based on our application's requirements.
>
> - The consitency levels possible:
>   - **ONE**: Only one replica needs to acknowledge the write operation for it to be considered successful.
>   - **QUORUM**: Half of the replicas need to acknowledge (50% consistency)
>   - **ALL**: All replicas need to acknowledge the write operation for it to be considered successful.
>
> This consistency level can be indepently set for read and write operations. For example, we can set a lower consistency level for writes (e.g., ONE) to achieve higher write performance, while setting a higher consistency level for reads (e.g., QUORUM) to ensure that we get the most up-to-date data when reading, or vice versa. This flexibility allows us to optimize for different use cases and workloads based on our application's requirements.

###### Difference between Wide Column DB and other non relational databases

- **Columnar (Column-Oriented)**: If you have a table with 100 columns but only query 2, a columnar database only reads those 2 files from the disk. This makes it incredibly fast for "big picture" questions like "What was the average sale price last year?".
- **Wide-Column (Column-Family)**: These are essentially "row-oriented databases on steroids". They use a row key to quickly find a specific record and then access its associated columns. They are better for "individual-level" data, such as a user's profile where some users have a lot of data and others have very little.

> - Wide column databases support either relatively flat data or only till 1 to 2 levels of nesting, while document databases can support deeper level of nesting.
> - Both wide column and document databases access data row-wise. But, wide column databases should be preffered for write heavy operations, while document databases should be preffered for read heavy operations because wide column use LSM trees optimized for write performance, while document databases use B-trees optimized for read performance.
