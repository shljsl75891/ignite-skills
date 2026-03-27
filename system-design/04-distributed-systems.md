## Distributed Systems

A distributed system is a collection of independent components that appear to the users of the system as a single component. The computers in a distributed system communicate with each other through a network. For eg. distributed webservers, distributed databases, distributed file systems, etc.

#### Types of consistency possible in a distributed system:

1. **Strong consistency**: All nodes see the same data at the same time. This is the most intuitive form of consistency, but it can be difficult to achieve in a distributed system due to network latency and failures.

![](/assets/2026-03-27-10-01-15.png)

2. **Eventual consistency**: All nodes will eventually see the same data, but there may be a delay before that happens. This is a more relaxed form of consistency that can be easier to achieve in a distributed system.

![](/assets/2026-03-27-10-03-05.png)

> Choosing the right consistency model depends on the specific requirements of the application. For example, a banking application may require strong consistency to ensure that all transactions are processed correctly, while a social media application may be able to tolerate eventual consistency for user posts and comments.

3. **RYW Consistency**: Read Your Writes consistency is a consistency model that guarantees that if a client writes data to the system, it will be able to read that data back immediately. For example. putting posts on instagram should be reflected immediately.

#### Functional vs Non Functional Requirements

Functional requirements describe what the system should do, while non-functional requirements describe how the system should do it. For example, a functional requirement for a social media application might be that users can create and share posts, while a non-functional requirement might be that the system should be able to handle 100 million users. Consistency, Availability, and Partition Tolerance are all non-functional requirements that can impact the design of a distributed system.

- Availability is measured by 9s. For example, 99.9%, 99.99%, etc. The more 9s, the higher the availability.

| Availability | Downtime per year                              |
| ------------ | ---------------------------------------------- |
| 99%          | 87.6 hours                                     |
| 99.9%        | 8.76 hours                                     |
| 99.99%       | 52.56 minutes                                  |
| 99.999%      | 5.26 minutes                                   |
| 99.9999%     | 31.5 seconds (almost impossible in real world) |

###### Ways to achieve high availability:

- **Replication**: Replicating data across multiple nodes can help ensure that if one node fails, the data is still available on another node.
- **Load balancing**: Distributing traffic across multiple nodes can help prevent any one node from becoming a bottleneck and improve overall system performance.
- **Failover**: Implementing failover mechanisms can help ensure that if one node fails, another node can take over its responsibilities without causing downtime for users.
- **Scaling**: Scaling the system horizontally by adding more nodes can help improve availability by providing more resources to handle traffic and reduce the impact of failures.
- **Geographical distribution**: Distributing nodes across different geographic locations can help improve availability by reducing the impact of localized failures, such as natural disasters or power outages. For example, in AWS you can use multiple availability zones to achieve this.
- **Monitoring and alerting**: Implementing monitoring and alerting systems can help detect failures early and allow for quick response to minimize downtime.
- **Load Testing**: Regularly performing load testing can help identify potential bottlenecks and weaknesses in the system, allowing for proactive measures to improve availability before issues arise.

### Network Partitioning

![](/assets/2026-03-27-10-15-23.png)

Network partitioning occurs when a distributed system is divided due to network failures, resulting in some nodes being unable to communicate with others.

![](/assets/2026-03-27-10-22-41.png)

##### CAP Theorem

- In Distributed systems, we can choose either consistency or availability in the event of a network partition, but not both. This is known as the CAP theorem.
- The consistency and availability can only be achieved when there is no network partition, and in real world this is possible only in monolithic application.

#### Some Techincal Terms to know:

1. **Latency**: The time taken for a request to be processed and a response to be received.
2. **Throughput**: The number of requests that can be processed in a given amount of time.
3. **Resiliency / Fault Tolerance**: The ability of a system to recover from failures and continue to operate.
4. **Redundancy**: The duplication of critical components or functions of a system to increase reliability and availability.
5. **Fault vs Failure**: A fault is a defect or abnormal behavior in a system, while a failure is the inability of a system to perform its intended function due to a fault. Faults can lead to failures / Fault is the cause of failures.

| Statefull systems                                                                  | Stateless systems                                                                 |
| ---------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Store client state on the server                                                   | Do not store client state on the server                                           |
| Dependent on saved information                                                     | Isolated independent transactions                                                 |
| Personalization possible                                                           | No personalization possible                                                       |
| Scaling difficult due to state management. As, state may be stored on another node | Easier to scale due to statelessness. Any node can handle the independent request |
| No need to sent same data again                                                    | Need to send same data again and again for each request                           |
