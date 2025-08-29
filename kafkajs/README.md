# Apache Kafka

Apache Kafka is an open-source distributed event streaming platform.

> A distributed system means that it runs on multiple servers (or nodes) that work together to provide high availability, fault tolerance, and scalability.

## Fundamentals

### Topics

In Kafka, events are categorized into topics. A topic is a logical channel to which events are published and from which events are consumed.

![](/assets/2025-08-29-12-14-37.png)

- Kafka can as many topics as needed.
- It is kind of a technique to organize events.
- Events are representation of a fact or occurrence. They are immutable, just like in real world, once an event happens, it cannot unhappen.
- Event Logs are durable in Kafka unlike other messaging systems where messages are deleted once consumed.
  > ( Default duration = 7 days )

### Partitions

If a topic remain on one machine, it put restrictions to scalability and fault tolerance. If that machine goes down, the topic becomes unavailable.

![](/assets/2025-08-29-12-17-29.png)

- To solve this problem, Kafka splits topics into partitions and distributes them across multiple machines (or brokers).
- A topic can have multiple partitions. Each partition can be hosted on seperate machine.
- An message in a topic is in form of `Key` and `Value` pairs on high level.
- If messages have no `Key`, they are distributed in round-robin fashion across partitions.
- If messages have `Key`, Kafka use that key to figure our which partition to send the message to.
- Kafka gurantees that all messages with same key will go to same partition.

```javascript
const parition = Murmur_hash(Key) % number_of_partitions;
```

> **NOTE:** Order of messages is guranteed only within a partition, not across partitions.

#### Replication of partitions

- To ensure high availability and fault tolerance, Kafka replicates partitions across multiple brokers.
- If a broker hosting a partition goes down, another broker with the replica of that partition can take over.

![](/assets/2025-08-29-18-27-30.png)

- Generally, all reads and writes go to the leader partition, and then followers pull data from the leader.

> Followers = ISRs ( In-Sync Replicas )

- If the leader goes down, one of the followers is elected as the new leader using a `Leader Election Algorithm`.
- The replication factor is the number of copies of each partition that Kafka maintains across different brokers.
- Just like partitions, the replicas of partitions are evenly distributed across brokers to balance the load.
- It is an automatic process behind the scenes, and we developers don't have to worry about it.

> For replication, Replication Factor must be greater than 1.

### Brokers

> Where these Kafka topics and partitions reside ?

- A Kafka cluster is composed of a network of machines communicating over network with one another. Each machine in the cluster is called a broker.

![](/assets/2025-08-29-12-26-28.png)

- A broker is simply a machine running Kafka process by any means.
- A parition resides on a single broker.
- Thus, a topic with multiple partitions can be distributed across multiple brokers.

For connecting to whole network of brokers called Kafka Cluster, we can connect to any one broker in the cluster, and that broker will take care of connecting us to other brokers in the cluster. That's why also, every broker is the cluster is called `Bootstrap Broker`.
