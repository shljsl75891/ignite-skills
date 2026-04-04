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
