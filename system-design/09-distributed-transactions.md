## What are Transactions

- Transaction is an abstraction that allows us to treat multiple operations into a single logical operation.
- Transactions help us to make databases fault tolerant and consistent.

#### ACID Properties

Most of the relational database systems support ACID properties. However, some non-relational databases offer partial support for ACID properties such as Redis, DynamoDB, Cassandra etc.

| Property        | Definition                                                                                  |
| --------------- | ------------------------------------------------------------------------------------------- |
| **Atomicity**   | All operations in a transaction succeed or none do. No partial updates.                     |
| **Consistency** | Transaction takes the DB from one valid state to another, preserving all rules/constraints. |
| **Isolation**   | Concurrent transactions execute independently without interfering with each other.          |
| **Durability**  | Once committed, results should be permanent and must not be lost even in any case           |

### Isolation Levels

##### Serializable

> Serializable isolation sab transactions ko ek-ke-baad-ek chalne jaisa banata hai, koi blocking nahi hoti. Agar isse lagta ki concurrent execution galat result (aesa result jo agr wo transactions sequentially chlti kisi bhi way mei, to kabhi ni aa paata) de raha hai toh wo transaction fail kar deta hai, tumhe retry karna padega.

![Serializable](/assets/Serializable.gif)

> If `WHERE` clause uses primary key to identify any row, the database has no need to scan all rows for identification. However, if `WHERE` clause is not using primary key, then database has to scan all rows to identify the row to be updated. In latter case, there is a possibility of serializable anomaly leading to a conflict.

##### Repeatable Read

> Ek transaction mei jitni mrji baar read kro, hmesha same dikhega. Regardless koi or kuch bhi commit krta rhe

![Repeatable_Read](/assets/Repeatable_Read.gif)

##### Read Committed

> Jb koi another transaction commit kuch commit krde, tbhi current running transaction ko updated data dikhe

![Read_Committed](/assets/Read_committed.gif)

##### Read Uncommitted

> Koi bhi transaction commit ho ya na ho, sbka dirty data padh lo. Jaise whatsapp forward — verify kiye bina hi sabko bhej do.

All concurrently running transactions can easily interfere with one another even any is not committed or rollbacked yet.

#### Row Level Locking mechanism in relational databases

There are two types of locks in relational databases:

- **Pessimistic (Negative sochna) Locking**: This is a conservative approach. In this locking mechanism, the transaction acquires a lock on the data before it can read or write to it. If one transaction has acquired a lock on a row, any other transaction that tries to access the same row will be blocked until the lock is released. This can lead to performance issues and deadlocks if not managed properly.
  - _Share Lock_: This lock allows multiple transactions to read the same row but not write to it. If a transaction has a share lock on a row, other transactions can only read the row but cannot update or delete it until the share lock is released.
  - _Exclusive Lock_: This lock blocks all other transactions from reading or writing to the row. If a transaction has an exclusive lock on a row, no other transaction can read or write to the row until the exclusive lock is released.

This locking mechanism is useful for the cases where we need higher number of write operations because it ensures that the data is consistent and prevents conflicts. However, it can lead to performance issues (increased latency) and deadlocks if not managed properly.

- **Optimistic (Positive sochna) Locking**: In this there is no such locking mechanism. Instead, the transactions are unblocking and every write operation will have a version or timestamp. While a write operation is performed, if databases encounter a version mismatch or conflict, those conflicts are resolved using different strategies such as retrying the transaction, LWW, FWW, priority based, merging the changes, or aborting the transaction.

| Strategy           | Full Name         | Rule                                                                                     |
| ------------------ | ----------------- | ---------------------------------------------------------------------------------------- |
| **LWW**            | Last Writer Wins  | The most recent write (by timestamp) overwrites all previous writes                      |
| **FWW**            | First Writer Wins | The first write "wins" — subsequent writes to the same version are rejected/aborted      |
| **Priority-based** | —                 | Writes have assigned priorities; higher priority write wins on conflict                  |
| **Merge**          | —                 | Changes from conflicting transactions are merged (e.g., CRDT-style or field-level merge) |
| **Abort**          | —                 | The transaction is simply aborted/retried on conflict                                    |

This locking mechanism is useful for the cases where we need lower number of write operations because it allows for higher concurrency and better performance. However, it can lead to conflicts and data inconsistency if not managed properly.

#### Normalization

## Why there is need for distributed transactions ?

As we know, in microservice architecture, we have leverage of using different databases for different services. In this case, the database transactions are not sufficient to maintain the consistency of data across multiple services. We need distributed transactions to maintain the consistency of data across multiple services.

Suppose we are buying something on Amazon.. Behind the scenes, Amaon may have to use following services:

- **Payment Service**: To process the payment for the order.
- **Inventory Service**: To check the availability of the product and update the inventory.
- **Order Service**: To create the order and manage the order lifecycle.

In any flow, if the transaction fails due to unknown reasons (may be network partitioning), the we need a way to rollback the transaction to maintain the consistency of data across multiple services. This is where distributed transactions come into play.

### Patterns for Distributed Transactions

#### Two-Phase Commit (2PC)

In this pattern, there is a coordinator that manages the transaction across multiple services. The coordinator sends a prepare message to all the participating services (cohorts), and if all the services respond with a vote to commit, then the coordinator sends a commit message to all the services.

![Two Phase Commit](/assets/2026-04-05-16-49-39.png)

**Phase 1**

- Generates a transaction ID and sends a prepare message to all the participating services (cohorts).
- Each cohort performs the necessary operations and responds with a vote to commit or abort. Basically, they let coordinator know whether transaction is possible on the basis of current state.
- The cohorts acquire locks on the resources they need to modify and prepare to commit the transaction. They do not actually commit the transaction yet, but they are ready to do so if the coordinator decides to commit.
- If any cohort votes to abort, the coordinator sends an abort message to all the cohorts and the transaction is rolled back.

> Prepare means performing operation without committing the transaction.

**Phase 2**

- If all the cohorts vote to commit, the coordinator sends a commit message to all the cohorts and all the transaction is committed.
- Coordinator then gets acknowledgement from all the cohorts that they have committed the transaction.

> [!CAUTION]
> **Long Running Transactions**: In this pattern, if somehow due to network partition or coordinator failure, if prepare phases get stuck. Cohorts will be holding locks for an extended period of time, which can lead to performance degradation and blocking of other transactions.

#### Three Phase Commit (3PC)

This is an extension of 2PC that addresses the **blocking problem** when coordinator crashes. It adds an extra "pre-commit" phase to ensure progress even if the coordinator fails.

![](/assets/2026-04-05-17-26-33.png)

**Phase 1 — CanCommit**

- Coordinator sends `CanCommit` to all cohorts.
- Cohorts respond with `Yes` (I can commit if asked) or `No` (abort).
- If any cohort says No → coordinator sends abort to all. Done.

**Phase 2 — PreCommit**

- Coordinator sends `PreCommit` to all cohorts who voted Yes.
- Cohorts acknowledge `ACK`. They keep the transaction prepared (in a durable log entry).
- This is the key difference from 2PC — by receiving ACKs, coordinator knows all cohorts are aware of the intent to commit.
- Cohorts now can commit on their own if coordinator fails after this point, because they know the transaction is in pre-commit state.

**Phase 3 — DoCommit**

- Coordinator sends `DoCommit` to all cohorts.
- Cohorts commit and send final ACK to coordinator.

> Both patterns are synchronous and require all cohorts to be available (which is not possible in real world due to high possibility of network partitions). Also, there is a single point of failure (the coordinator) which can lead to blocking in 2PC and 3PC. Due to these limitations, these patterns are not widely used in distributed systems. Instead, we often use eventual consistency and compensation-based approaches for handling distributed transactions in microservices.

#### SAGA Pattern - Asynchronous and Eventual Consistency

- In this, we distribute the transaction into a series of smaller, independent transactions (called "sagas") that can be executed asynchronously across multiple services with the use of message queues.
- In this all transactions happen asynchronously using event drive architecture,
- There are two types of SAGA patterns:
  - **Orchestration**: There is a central orchestrator that manages the flow of the transaction. The orchestrator sends commands to each service to perform its part of the transaction and waits for responses before proceeding to the next step.
    - Centralized
    - Single Point of failure

![Orchestrater SAGA](/assets/2026-04-05-17-45-37.png)

- **Choreography**: Each service publishes events when it completes its part of the transaction, and other services listen for those events to trigger their own actions. There is no central coordinator; the services coordinate through events.
  - Decentralized
  - Complex integration

![Choreography SAGA](/assets/2026-04-05-17-48-35.png)

## BLOB Storage

> BLOB = Binary Large Object

BLOB storage is designed to store unstructured data — images, videos, backups, logs, documents — basically anything that doesn't fit neatly into rows and columns of a relational database. Think of it as a giant filesystem on the cloud that can scale to petabytes.

### Core Concepts

| Concept    | Description                                                                  |
| ---------- | ---------------------------------------------------------------------------- |
| **Bucket** | A container for objects. Like a folder, but flat — no nesting.               |
| **Object** | The actual file (data + metadata). Stored with a unique key within a bucket. |

### Popular Services

- **AWS S3**: Industry standard. 11 nines (99.999999999%) durability. Tiered storage classes.
- **Azure Blob Storage**: Tight integration with Azure ecosystem. Hot/Cool/Archive tiers.
- **GCP Cloud Storage**: Similar tiering. Strong consistency by default (unlike early S3).
