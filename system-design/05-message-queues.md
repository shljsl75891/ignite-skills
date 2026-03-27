## Message Queues

It is used for asynchronous communication between microservices. It allows one service to send a message to another service without waiting for a response.

#### Advantages

- **Load Balancing**: The throughput of receiver services is reduced if we use the message queue. If we try to do sent large number of messages, using message queue, all will be processed with lesser rate compared to synchronous communication.
- **Fault Tolerance**: If the receiver service is down, the message (persistent messages) will be stored in the queue until the receiver service is back up. This allows for better fault tolerance and ensures that messages are not lost.
- **Scalability**: Number of message queues can easily be increased to handle more messages. This allows for better scalability and can help to improve the performance of the system.
- **Decoupling**: Message queues decouple the sender and receiver services, allowing them to operate independently. This can lead to better modularity and easier maintenance of the system.
- **Buffering and Throttling**: Message queues can act as a buffer to handle bursts of traffic and process them gradually. It can also help to throttle the rate at which messages are processed by receiver service.

### Distributed Message Queues

Distributed message queues are designed to handle large volumes of messages across multiple servers connected over network. For example, Apache Kafka, RabbitMQ, Amazon SQS, etc.

#### Advantages

- **High Availability**: Distributed message queues can be designed to be highly available, with multiple nodes that can take over if one node fails. This ensures that messages are not lost and that the system remains operational even in the event of hardware or software failures.
- **Geographical Distribution**: Distributed message queues can be deployed across multiple geographic locations, allowing for better performance and reduced latency for users in different regions.
- **Scalable & High Throughput**: Distributed message queues can handle a large number of messages and can be designed to scale horizontally by adding more nodes to the cluster.

###### Difference between Message Queues and Publish-Subscribe Systems

- **Message Queues**: In a message queue system, messages are sent to a queue and are processed by a single consumer. Each message is consumed by only one consumer.
- **Publish-Subscribe Systems**: In a publish-subscribe system, messages are published to a topic and can be consumed by multiple subscribers. Each message can be consumed by multiple subscribers. These models generally have higher level of decoupling between the sender and receiver services, as the sender does not need to know about the specific subscribers that will receive the messages.

#### Architecture of Apache Kafka

![](/assets/2026-03-27-22-25-22.png)

- _Broker_ is just a server that runs on Kafka cluster. Kafka cluster consists of multiple brokers.
- Every message should be grouped as per categories, which are called _Topics_ in Kafka.
- For each topic, we can have multiple _Partitions_, which are ordered and immutable sequences of messages.
- Each partition is assigned to a different _Broker_, and also are replicated across multiple brokers for fault tolerance.
- _Producer_ is a client that sends messages to Kafka cluster. It can send messages to specific topics and partitions.
- _Consumer_ is a client that reads messages from Kafka cluster. It can subscribe to specific

While sending messages to Kafka, we can also specify an optional `key` or `partition` along with `value`. The `key` is used to determine which partition the message should be sent to. Messages with the same key will always be sent to the same partition, which allows for ordered processing of messages with the same key. If no key is specified, messages will be distributed randomly across partitions such as round robin manner.

![](/assets/2026-03-27-22-30-58.png)

- _Offset_ is a unique identifier for each message in a partition. It is used to keep track of which messages have been consumed by a consumer. Consumers can commit their offsets to Kafka, which allows them to resume consuming messages from where they left off in case of a failure.
- _Consumer Group_ is a group of consumers that work together to consume messages from a topic. Each consumer in the group is responsible for consuming messages from a specific partition. This allows for parallel processing of messages and can help to improve the performance of the system.

![](/assets/2026-03-27-22-28-20.png)

> [!TIP]
> Apache Kafka has a lot of high throuput and low latency, which makes it a popular choice for building real-time data pipelines and streaming applications. The use cases such as real time data processing, logs aggregation and processing videos on different quality levels.

> [!IMPORTANT]
> The transport layer protocol used by Apache Kafka is TCP, which provides reliable and ordered delivery of messages. They have built an application layer protocol on top of TCP to handle the communication between producers, consumers, and brokers.
