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

> For replication, Replication Factor must be greater than 1, also it must be less tthan or equal to number of brokers in the cluster.

### Brokers

> Where these Kafka topics and partitions reside ?

- A Kafka cluster is composed of a network of machines communicating over network with one another. Each machine in the cluster is called a broker.

![](/assets/2025-08-29-12-26-28.png)

- A broker is simply a machine running Kafka process by any means.
- A parition resides on a single broker.
- Thus, a topic with multiple partitions can be distributed across multiple brokers.

For connecting to whole network of brokers called Kafka Cluster, we can connect to any one broker in the cluster, and that broker will take care of connecting us to other brokers in the cluster. That's why also, every broker is the cluster is called `Bootstrap Broker`.

### Producers

- These are the client applications that publish (or produce) events to Kafka topics.
- Producers + Consumers are where we developers will spend most of our time.
- It is the producer which decides which partition within a topic the event should go to. Whether it should go to a specific partition based on the key or in round-robin fashion if no key is provided.
- Producers put the data into the leader partition, and then the followers replicate the data from the leader.
- Before producer start producing events, it gets information about the cluster, # of brokers, topics, # of partitions, etc from the broker it is connected to.
- This everything is already handled by libraries written by amazing people, we just need to use those libraries.

#### Acknowledgments

Producer does have option to choose the level of acknowledgment for data consistency:

1. `acks=0` - Producer does not wait for any acknowledgment before sending next message. This is the fastest but least reliable option, as there can be data loss.
2. `acks=1` - Producer waits for acknowledgment from the leader partition only not ISRs. This is a balanced option between speed and reliability with limited data loss possible.
3. `acks=all` - Producer waits for acknowledgment from all ISRs before sending the next message. This is the slowest but most reliable option resulting no data loss.

### Consumers

1. These are the client applications that subscribe to (or consume) events from Kafka topics.
2. They just read data from the partitions, but not destroy them like other messaging systems.
3. Consumers can be part of a consumer group, which allows for load balancing and fault tolerance.

![](/assets/2025-08-30-18-00-46.png)

> **NOTE:** One consumer can read from multiple partitions, but one partition cannot be read by multiple consumers within a consumer group. One partition is assigned to only one consumer within a consumer group.
> Generally it is recommended that # of consumers in a consumer group should be less than or equal to # of partitions in the topic.

#### Consumer offsets

- If a consumer crashes in between of processing of an read event, it can resume from the last processed event using offsets.
- This happens because Kafka maintains a special topic called `__consumer_offsets` which keeps track of the offsets of each consumer group for each partition.
- Consumers periodically commit their current offsets to this topic, either automatically or manually.

##### Three ways to commit offsets to `__consumer_offsets` topic:

1. **At most once:** Offsets are committed just after the event is read from topic, and processing is not started. If consumer crashes during processing, that event is lost.
2. **At least once:** Offsets are committed just after the event is processed. If consumer crashes before committing the offset, that event will be reprocessed when consumer restarts, leading to duplicate event processing. So, it is important to make event processing **_idempotent_** in consumer.
3. **Exactly once:** Useful for Kafka to Kafka workflow not for other consumer client.
