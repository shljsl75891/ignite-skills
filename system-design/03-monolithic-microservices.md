## Monolith vs Microservices Architecture

- In a monolithic architecture, there is a single, unified codebase that handles all aspects of the application. However, it can also lead to scalability issues and difficulties in maintaining and updating the application as it grows. Also, if any feature breaks, it can potentially affect the entire application, leading to downtime and a poor user experience.
  - It is easy to develop, test and deploy but as application grows, they can become disadvantage easily.
  - If a single small feature is updated, the entire application needs to be redeployed, which can lead to downtime and potential issues with other parts of the application.
  - Having multiple replica nodes of same deployed codebase doesn't make it a microservices architecture, it is still a monolith with multiple instances.
  - Multiple developers working on the same codebase can lead to conflicts and coordination issues, especially as the application grows in size and complexity.
  - We have to follow single technology for each module forcefully.

- In contrast, a microservices architecture breaks down the application into smaller, independent services that can be developed, deployed, and scaled independently. Each service is responsible for a specific functionality and communicates with other services through APIs. This allows for greater flexibility, scalability, and maintainability of the application.
  - If one service needs to be updated, it can be done without affecting the other services, and new features can be added without impacting the existing functionality.
  - If any service fails, it doesn't bring down the entire application, as other services can continue to operate independently.
  - Each service can be developed using different technologies and programming languages, allowing for greater flexibility and innovation in the development process.
  - Increase in infra cost, overhead of communication between services, coordination between teams working on different services, and debugging is a challenge.

> Infact, some companies take 2-3 years to migrate from monolith to microservices architecture, and it is not always necessary to do so. Netflix took years to migrate from monolith to microservices architecture and received an award.

#### Some patterns for migrating from monolith to microservices architecture

- **Strangler (गला घोंटना) Fig Pattern**: This pattern involves gradually replacing parts of the monolithic application with microservices. The new microservices are developed and deployed alongside the existing monolith, and over time, the monolith is "strangled" as more functionality is moved to the microservices.
  - We can gradually replace parts of monolith application like authentication, logging to different microservices, and eventually we can have a complete microservices architecture.
  - **PARALLEL RUN**: In this approach, both the monolithic application and the new microservices run in parallel for a period of time. This allows for testing and validation of the new microservices while still maintaining the existing functionality of the monolith. Once the new microservices are fully tested and validated, the monolith can be gradually phased out.

![](/assets/2026-03-25-19-53-03.png)

- **Branch by Abstraction**: When we can't directly replace a module to different service from monolithic application due to tightly coupled code, we need to follow this code refactoring + migration pattern. In this approach, we create an abstraction layer that allows us to decouple the tightly coupled code from the monolith. Basically, by following SOLID principles (especially dependency inversion principle).

![](/assets/2026-03-25-20-00-20.png)

> [!IMPORTANT]
> There are also patterns for deciding whether we should use a share database for all micro services or each microservice should have its own database. It depends on the use case and requirements of the application. If the microservices are tightly coupled and require frequent data sharing, a shared database may be more efficient. However, if the microservices are loosely coupled and can operate independently, it may be better to have separate databases for each service to improve scalability and reduce the risk of data corruption.

## Remote Procedure Calls (RPC)

- In a microservices architecture, services often need to communicate with each other to exchange data and perform operations. One common way to achieve this is through Remote Procedure Calls (RPC). RPC allows a service to call a function or method in another service as if it were a local function call, abstracting away the complexities of network communication.
- The most famous RPC framework is gRPC, which is an open-source RPC framework developed by Google. It uses HTTP/2 for transport and **Protocol Buffers** for serialization, making it efficient and suitable for high volume data transmission between microservices.

![](/assets/2026-03-26-19-09-33.png)

> The gRPC is not natively supported in browsers. That's why still REST APIs are widely used for communication between frontend and backend services, while gRPC is often used for communication between backend microservices. The gRPC-Web is a JavaScript client library that allows web applications to communicate with gRPC services, but it doesn't have full support for all gRPC features and have certain limitations. Although browser support HTTP/2, it doesn't support all features of gRPC.

![](/assets/2026-03-26-19-16-24.png)

## WebHooks

![](/assets/2026-03-26-19-20-07.png)

- We can use webhooks to use event driven notifications by third party systems instead of polling for updates.
- We need to register a callback URL with the third party system, and whenever there is an event or update, the third party system will send an HTTP request to the registered callback URL with the relevant data. This allows our application to receive real-time updates without the need for continuous polling, which can be inefficient and resource-intensive.
