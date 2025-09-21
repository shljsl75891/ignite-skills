# Zookeeper role in Kafka

### Message Broker

![](/assets/2025-09-20-19-21-44.png)

- This is a very simple and straightforward example of a message broker
- Basically, producers produce data, and message brokers store the data
- The consumers consume the data from the message brokers
- It acts as a intermediary between two services communicating with each other

### Distributed Systems

![](/assets/2025-09-20-19-24-58.png)

- As soon as, the brokers are increased in a cluster, it becomes a distributed system.
- The state will be distributed across multiple message brokers in a cluster
- Distributed systems are complex to manage, and they have many challenges like:
  - Service Discovery
  - Replication
  - Partitioning
  - Failure detection
  - Consistency
  - Storage

> Read about CONSENSUS algorithm: All members agree on single data value

### External Metadata Cluster

![](/assets/2025-09-20-19-35-00.png)

- To manage the complexity of distributed systems, we use an external metadata cluster
- In case of Apache Kafka:
  - **Apache Kafka** act like a data cluster
  - **Zookeeper** is used as an external metadata cluster
    > **Kafka Raft (KRaft)** is a new mode that removes the need for Zookeeper
- To achieve service discovery in a distributed system, each broker in a cluster must know about other brokers in the cluster.
- This is done by storing the metadata of the data cluster in an external metadata cluster like Zookeeper.
- Zookeeper is responsible for storing metadata of brokers in Kafka cluster, and electing a controller broker.

> Metadata clusters themselves are distributed systems, but they have a simpler design and fewer responsibilities. They don't need any other cluster to manage them, as they have no high throughput stream requirements.
