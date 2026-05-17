### Authentication vs Authorization

Authentication is the process of verifying the identity of a user or system, while authorization is the process of determining what actions or resources a user or system is allowed to access.

### OAuth2.0

OAuth2.0 is an authorization framework that allows third-party applications to access a user's limited resources without sharing their credentials for a limited period of time. It provides a secure and standardized way for users to grant access to their resources on one site (the resource server) to another site (the client) without sharing their username and password.

**Why do we need OAuth2.0?**
Without OAauth2.0, if we want some third party application to access our resources on another site, we would have to share our username and password with that application which is a security risk as the third party application could misuse our credentials or store them insecurely. Even if we provide credentials, either the third party application needs to store them somewhere and send those credentials while making requests or we need to provide them every time we want to access the resources. Former is a security violation and providing them every time is not user-friendly. OAuth2.0 solves this problem by allowing users to grant limited access to their resources without sharing their credentials, and it also provides a way for users to revoke access when they no longer want the third party application to have access to their resources.

### OAuth2.0 Roles

1. Resource Owner: The user who owns the resources that the client wants to access.
2. Client: The application that wants to access the resources on behalf of the resource owner.
3. Authorization Server: The server that issues access tokens to the client after successfully authenticating the resource owner and obtaining authorization from them.
4. Resource Server: The server that hosts the protected resources and accepts access tokens from the client to access those resources.

### OAuth2.0 Grant Types

1. Authorization Code Grant: It involves a two-step process where the client first obtains an authorization code from the authorization server and then exchanges it for an access token. This is typically used for web applications where the client can securely store the client secret. The authorization code is obtained by redirecting the user to the authorization server's authorization endpoint, where they authenticate and authorize the client. After the user grants permission, the authorization server redirects back to the client with the authorization code, which the client then exchanges for an access token.
2. Implicit Grant: It is a simplified flow where the client directly receives the access token from the authorization server without the need for an authorization code. This is typically used for single-page applications (SPAs) or mobile applications where the client cannot securely store the client secret. The client redirects the user to the authorization server's authorization endpoint, and after the user grants permission, the authorization server redirects back to the client with the access token in the URL fragment. But this is not recommended due to security concerns, as the access token is exposed in the URL and can be intercepted by malicious actors.
3. Resource Owner Password Credentials Grant: It allows the client to obtain an access token by directly using the resource owner's username and password. This is typically used in scenarios where the client is highly trusted.
4. Client Credentials Grant: It allows the client to obtain an access token by using its own credentials (client ID and client secret) without involving the resource owner. This is typically used for server-to-server communication where the client needs to access resources on behalf of itself rather than a user. This can be used for machine-to-machine communication, such as cron jobs or backend services that need to access protected resources without user involvement.

### OAuth2.0 Token Types

1. Access Token: A token that is issued by the authorization server and used by the client to access protected resources on the resource server. It typically has a limited lifespan and can be revoked by the resource owner or authorization server.
2. Refresh Token: A token that is issued by the authorization server along with the access token. It is used to obtain a new access token when the current access token expires. Refresh tokens are typically long-lived and can be used to maintain a user's session without requiring them to re-authenticate.
3. Identity Token: A token that is issued by the authorization server and contains information about the authenticated user. It is typically used in OpenID Connect (OIDC) flows to provide user authentication and can include claims such as the user's name, email, and other profile information. OIDC is an authentication layer built on top of OAuth2.0 that allows clients to verify the identity of the user and obtain basic profile information about them.

### OAuth2.0 Scopes

Scopes are a way to specify the level of access that a client is requesting from the resource owner. They define the permissions that the client is asking for when accessing protected resources. For example, a client may request read-only access to a user's profile information or full access to their calendar data. Scopes help to limit the access that a client has to a user's resources and provide a way for users to understand what permissions they are granting to the client.

### Authorization Code Grant Flow:

This is also known as the "three-legged" flow. Let's say we have a client application (e.g., dev.io) that wants to access a user's Github repositories on a resource server (e.g., Github). The flow would look like this:

![alt text](/assets/2026-05-11-02-21-15.png)

When client redirects the user to the authorization server, it includes the following parameters in the URL:

- `response_type`: This parameter indicates a grant type (tells authorization how we would like to obtain access token). In this case, it would be `code` since we want to obtain an authorization code.
- `client_id`: it's an identification of a client application, which tells authorization server (GitHub in this case) for which application access will be granted.
- `redirect_uri`: This parameter specifies the URI to which the authorization server will redirect the user after they have authorized or denied the client's request.
- `scope`: This parameter defines the level of access that the client is requesting from the resource owner e.g. read, write, etc, in our example it's user,email,repo which means that Dev.io would like to have access to user, email address and repositories information.
- `state`: This parameter is used to prevent CSRF attacks. It is a random string that the client generates and includes in the authorization request. When the authorization server redirects back to the client, it includes the same state parameter, allowing the client to verify that the response is from a legitimate source.
  Example URL:

```
https://github.com/login?client_id=devto_id&response_type=code&scope=user,email,repo&state=sFf4sd&redirect_uri=https://dev.to
```

After the user grants permission, the authorization server redirects back to the client with an authorization code and the state parameter:

```
https://dev.to?code=auth_code&state=sFf4sd
```

Role of refresh token in this flow:
In the authorization code grant flow, after the client exchanges the authorization code for an access token, the authorization server may also issue a refresh token along with the access token. The refresh token can be used by the client to obtain a new access token when the current access token expires without requiring the user to go through the authorization process again. This allows for a better user experience, as the user does not have to re-authenticate every time the access token expires. The client can simply use the refresh token to get a new access token and continue accessing the protected resources on behalf of the user.

![alt text](/assets/2026-05-11-03-09-50.png)

_Note: Why did OAuth1.0 not become as popular as OAuth2.0? OAuth1.0 has some limitations compared to OAuth2.0, such as more complex implementation and less flexibility in handling different types of applications. It included cryptographic signatures for authentication, which made the implementation more complex. OAuth1.0 had a rigid flow that did not allow for different grant types or token types, which limited its applicability in various scenarios._

#### JSON Web Token (JWT)

Earlier, before the introduction of JWT and Oauth, the client applications had to maintain a session with the server to keep track of the user's authentication state. This often involved storing session information on the server side, which could lead to scalability issues and made it difficult to implement stateless authentication.

![](/assets/2026-05-11-03-24-52.png)

> There is 1 benefit in session based authentication, which is that the server can easily invalidate a session by deleting it from the server, while with JWT, the server cannot easily invalidate a token until it expires. However, this can be mitigated by implementing token revocation mechanisms or using short-lived tokens.

Issues with this approach:

1. Statefulness: The server has to maintain session state for each user and client needs to send the session ID with each request, which can lead to scalability issues as the number of users increases.
2. Scalability: As the number of users increases, the server needs to manage more sessions, which can lead to performance degradation and increased memory usage.
3. Load Balancing: In a distributed system with multiple servers, maintaining session state can be challenging as the user may be directed to different servers for each request, leading to inconsistent session management.
4. Cross-Origin Resource Sharing (CORS): When the client and server are on different domains, managing sessions can be more complex due to CORS restrictions, which can limit the ability to share session information across domains.
5. Vulnerabilities: Storing session information on the server can make it vulnerable to attacks such as session hijacking, where an attacker can steal a user's session ID and impersonate them. CSRF attacks can also be a concern, as attackers can trick users into making requests that they did not intend to make while they are authenticated. XSS attacks can also be a concern, as attackers can inject malicious scripts into web pages that can steal session information from users.
6. Since the server is responsible for maintaining session state, the session information can be lost if the server crashes or is restarted, leading to a poor user experience.
7. The serverless architecture, which is becoming increasingly popular, does not have a traditional server to maintain session state, making it difficult to implement session-based authentication.

To solve the above issues and to enable stateless authentication, JSON Web Tokens (JWT) were introduced.

**JWT** is a compact, stateless, and self-contained way to securely transmit information between parties as a JSON object. It consists of three parts: a header, a payload, and a signature.

1. Header: The header majorly consists of two parts: the type of token (JWT) and the signing algorithm being used (e.g., HMAC SHA256 or RSA). It is Base64Url encoded to form the first part of the JWT.
2. Payload: It contains information about the user and any additional data that needs to be transmitted. It can include standard claims such as `iss` (issuer), `sub` (subject), `aud` (audience), `exp` (expiration time), and custom claims defined by the application. The payload is also Base64Url encoded to form the second part of the JWT.
3. Signature: This is created by taking the encoded header, the encoded payload, a secret key, and the specified signing algorithm. The signature is used to verify the integrity of the token and ensure that it has not been tampered with. The signature is Base64Url encoded to form the third part of the JWT.
   Signature = Base64UrlEncode(HMACSHA256(Base64UrlEncode(header) + "." + Base64UrlEncode(payload), secret))
   If someone tries to tamper with the token by changing the header or payload, the signature will not match when the server verifies it, and the token will be rejected.

JWT token looks like this: Base64UrlEncode(header).Base64UrlEncode(payload).Base64UrlEncode(signature)

Drawbacks of JWT:

1. Since JWTs are self-contained and stateless, they cannot be easily revoked by the server until they expire. This can be a security concern if a token is compromised, as it can be used by an attacker until it expires. For mitigating this issue, token revocation mechanisms can be implemented, such as maintaining a blacklist of revoked tokens or using short-lived tokens that expire quickly.
2. If the secret key used to sign the JWT is compromised, an attacker can create valid tokens and gain unauthorized access to protected resources. It is crucial to keep the secret key secure and use strong, random keys to prevent this type of attack.
3. JWTs can be vulnerable to certain attacks, such as Cross-Site Scripting (XSS) attacks, where an attacker can inject malicious scripts into web pages that can steal JWTs from users. JWTs are generally stored in client-side storage (e.g., localStorage or sessionStorage), which can be accessed by malicious scripts if the application is vulnerable to XSS attacks. To mitigate this risk, either the token can be stored in an HttpOnly cookie, which is not accessible to JavaScript, or proper input validation and sanitization can be implemented to prevent XSS vulnerabilities in the application.

\__Note_: JWTs are encoded but not encrypted by default, which means that the information contained in the payload can be easily decoded and read by anyone who has access to the token. Therefore, it is important to avoid including sensitive information in the payload of a JWT, or to use encryption if sensitive data needs to be included. Encoding is simply a way to represent data in a different format, while encryption is a process of converting data into a format that cannot be easily understood without the appropriate decryption key.

\__Note_: To ensure that noone is able to access JWTs by intercepting network traffic, it is important to use secure communication channels (e.g., HTTPS) when transmitting JWTs between the client and server. This helps to protect the confidentiality and integrity of the token during transmission. HTTPS uses SSL/TLS encryption to secure the communication between the client and server, making it difficult for attackers to intercept and read the JWTs. Additionally, using secure cookies (with the `Secure` flag) can help to ensure that JWTs are only transmitted over secure channels.

JWTs are used in both access tokens and refresh tokens in OAuth2.0 flows. Access tokens are typically short-lived and are used to access protected resources, while refresh tokens are long-lived and are used to obtain new access tokens when the current access token expires. Refresh tokens should be stored securely and should not be exposed to the client-side, as they can be used to obtain new access tokens without user interaction. Refresh tokens are typically stored in an HttpOnly cookie or a secure server-side storage to prevent unauthorized access.

#### OpenID Connect (OIDC)

OpenID Connect (OIDC) is an authentication layer built on top of the OAuth2.0 framework. It allows clients to verify the identity of the user and obtain basic profile information about them. OIDC uses the same authorization flows as OAuth2.0 but adds an additional token called the ID token, which contains information about the authenticated user.
Why do we need OIDC when we already have OAuth2.0? OAuth2.0 is primarily an authorization framework and does not provide a standardized way to authenticate users or obtain user profile information. OIDC fills this gap by providing a standardized way to authenticate users and obtain their profile information, making it easier for developers to implement authentication in their applications while still leveraging the benefits of OAuth2.0 for authorization.

#### SSO (Single Sign-On)

Single Sign-On (SSO) is a user authentication process that allows a user to access multiple applications with one set of login credentials.
There are 3 main parts of an SSO system:

1. User: The individual who wants to access multiple applications using a single set of credentials.
2. Identity Provider (IdP): The service that authenticates the user and provides identity information to the services the user wants to access. The IdP is responsible for verifying the user's identity and issuing authentication tokens or assertions that can be used to access other applications. For example, Google, Google Workspace and Microsoft are popular identity providers that offer SSO services.
3. Service Provider (SP): The application or service that the user wants to access using SSO. The SP relies on the IdP to authenticate the user and provide the necessary information for granting access to the application. For example, applications like Salesforce, Slack, and Dropbox can act as service providers that support SSO.

2 common SSO protocols are: SAML and OpenID Connect (OIDC).

1. SAML (Security Assertion Markup Language): It is an XML-based protocol that allows for the exchange of authentication data between parties, in particular, between an identity provider (IdP) and a service provider (SP).
   Flow Diagram of SAML-based SSO:

![alt text](/assets/2026-05-17-08-44-39.png)

SAML assertion is a signed XML document that contains information about the authenticated user, such as who the user is, when did he login, expiration time of the assertion, etc. It is signed using the IdP's private key, and the SP can verify the signature using the IdP's public certificate to ensure that the assertion is valid and has not been tampered with. This is asymmetric signature.
Asserions look like this:

```xml
<saml:Assertion xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion" ID="1234567890" IssueInstant="2026-05-11T12:00:00Z" Version="2.0">
    <saml:Issuer>https://idp.example.com</saml:Issuer>
    <saml:Subject>
        <saml:NameID Format="urn:oasis:names:tc:SAML:2.0:nameid-format:emailAddress">
</saml:NameID>
    </saml:Subject>
    <saml:Conditions NotBefore="2026-05-11T12:00:00Z" NotOnOrAfter="2026-05-11T13:00:00Z"/>
    <saml:AuthnStatement AuthnInstant="2026-05-11T12:00:00Z">
        <saml:AuthnContext>
            <saml:AuthnContextClassRef>urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport</saml:AuthnContextClassRef>
        </saml:AuthnContext>
    </saml:AuthnStatement>
</saml:Assertion>
```

Service providers maintain sessions for users in cookies, and the SAML assertion is used to establish the session when the user first logs in. Once the session is established, the user can access other applications without needing to re-authenticate, as long as the session is valid.
Like JWT, SAML assertions are also vulnerable to certain attacks, like replay attacks, XSS attacks, etc. For mitigating replay attacks, SAML assertions should have a short expiration time, should be transported over secure channels (e.g., HTTPS), and should be used only once. Proper input validation and sanitization should be implemented to prevent XSS vulnerabilities in the application.

SAML can either be SP-initiated or IdP-initiated. In SP-initiated SSO, the user first tries to access a service provider (SP) application, which then redirects the user to the identity provider (IdP) for authentication. After successful authentication, the IdP sends a SAML assertion back to the SP, which establishes a session for the user. In IdP-initiated SSO, the user first authenticates with the IdP and then selects an application to access. The IdP sends a SAML assertion directly to the selected SP, which establishes a session for the user without requiring an initial request from the SP.

2. OpenID Connect (OIDC): It is an authentication protocol built on top of OAuth2.0 that allows clients to verify the identity of the user and obtain basic profile information about them. OIDC can also be used for SSO, where the identity provider (IdP) issues an ID token to the client application after successful authentication, which can then be used to access other applications without requiring the user to re-authenticate.

_Note_: OAuth is an authorization framework, while OpenID Connect (OIDC) is an authentication protocol built on top of OAuth2.0. OAuth is authorization framework and not an authentication protocol because it does not provide a standardized way to authenticate users or obtain user profile information.

#### Heartbeats

Heartbeats are a mechanism used in distributed systems to monitor the health and availability of components or services. They involve sending periodic signals (heartbeats) from one component to another to indicate that it is still alive and functioning properly. If a component fails to receive a heartbeat within a specified time interval, it can assume that the other component is unavailable or has failed, allowing it to take appropriate actions such as retrying the connection, switching to a backup service, or alerting administrators about the issue.
Use cases of heartbeats include:

1. Load balancing: Heartbeats can be used to monitor the health of servers in a load-balanced environment. If a server fails to send a heartbeat, the load balancer can stop sending traffic to that server and redirect it to healthy servers.
2. If any operation on a Database in distributed system applies locks on the data, then heartbeats can be used to detect if the process holding the lock has failed. If a heartbeat is not received from the process within a certain time frame, the system can assume that the process has failed and release the lock to prevent deadlocks and ensure that other processes can continue to access the data.

#### API Gateway VS Load Balancer

API Gateway: API Gateway is a single entry point for all client requests to access backend services in a microservices architecture. Features provided by API Gateway are:

1. Request routing: API Gateway can route incoming requests to the appropriate backend services based on the request path, method, or other criteria. Because of this feature, client doesn't need to know the details of the backend services and can simply send requests to the API Gateway, which will handle the routing.
2. Authentication and Authorization: API Gateway can handle authentication and authorization for incoming requests, ensuring that only authorized clients can access the backend services. It can integrate with various authentication providers (e.g., OAuth2.0, JWT, etc.) to validate client credentials and enforce access control policies so that every microservice doesn't need to implement its own authentication and authorization logic.
3. Rate Limiting: API Gateway can enforce rate limits on incoming requests to prevent abuse and ensure fair usage of backend services. This helps to protect the backend services from being overwhelmed by excessive traffic.
4. Load Balancing: API Gateway can distribute incoming requests across multiple instances of backend services to ensure high availability and scalability. It can use various load balancing algorithms (e.g., round-robin, least connections, etc.) to efficiently distribute the traffic.
5. Caching: API Gateway can cache responses from backend services to improve performance and reduce latency for frequently accessed resources.
6. Request and Response Transformation: API Gateway can modify incoming requests and outgoing responses, allowing for data transformation, protocol translation, or adding additional headers as needed by the backend services.
7. Monitoring and Logging: API Gateway can provide monitoring and logging capabilities to track incoming requests, response times, error rates, and other metrics to help identify issues and optimize performance.
8. SSL Termination: API Gateway can handle SSL termination, allowing clients to connect securely over HTTPS while communicating with backend services over HTTP. This offloads the SSL processing from the backend services and simplifies the security configuration.

Examples of API Gateways include Amazon API Gateway, Kong, Apigee, and NGINX. For integrating API Gateway into your application, you would typically configure the API Gateway to route requests to your backend services, set up authentication and authorization mechanisms, and define any necessary request/response transformations or rate limiting policies. The specific steps for integration will depend on the API Gateway you choose and the architecture of your application.

Load Balancer: A load balancer is a device or software that distributes incoming network traffic across multiple servers to ensure high availability and reliability of applications. It acts as a reverse proxy, receiving client requests and forwarding them to the appropriate backend servers based on various load balancing algorithms (e.g., round-robin, least connections, etc.). The main purpose of a load balancer is to improve the performance and scalability of applications by distributing the workload evenly across multiple servers, preventing any single server from becoming a bottleneck. Load balancers can also provide health checks to monitor the status of backend servers and automatically route traffic away from unhealthy servers to ensure continuous availability of applications.

Reverse proxy is a server that sits in front of one or more backend servers and forwards client requests to those servers. It can be used for load balancing, SSL termination, and other purposes. An API Gateway can be considered a type of reverse proxy that provides additional features such as authentication, rate limiting, and request/response transformation, while a traditional load balancer primarily focuses on distributing traffic across multiple servers without the additional features provided by an API Gateway.

_Note_: API Gateway and Load Balancer are not mutually exclusive and can be used together in a microservices architecture. The API Gateway can handle authentication, rate limiting, and other features, while the load balancer can distribute traffic across multiple instances of the API Gateway for high availability and scalability. Multiple instances of the API Gateway can be deployed behind a load balancer to ensure that incoming requests are distributed evenly and that the system can handle increased traffic without becoming a bottleneck.

#### ELK Stack

ELK Stack is a collection of three open-source products: Elasticsearch, Logstash, and Kibana. It is commonly used for log management and analytics in distributed systems.

1. Elasticsearch: It is a distributed search and analytics engine that allows you to store, search, and analyze large volumes of data in real-time. It provides powerful full-text search capabilities and is often used for indexing and searching log data. Data is stored in Elasticsearch in the form of JSON documents, which can be easily queried and analyzed using its RESTful API. Data retrieval from Elasticsearch is fast because it uses an inverted index i.e. it creates an index of all the terms in the documents and their corresponding locations, allowing for efficient searching and retrieval of relevant documents based on search queries.
   Data is split across multiple shards in Elasticsearch, and each shard can have multiple replicas for fault tolerance and high availability. When a search query is executed, it is distributed across all the shards, and the results are aggregated and returned to the client.
2. Logstash: It is a data processing pipeline that ingests data from various sources, transforms it, and then sends it to a destination such as Elasticsearch. It can collect and parse logs from different sources (e.g., files, databases, message queues, etc.) and apply various transformations (e.g., filtering, parsing, enriching, etc.) to the data before sending it to Elasticsearch for indexing and analysis.
3. Kibana: It is a data visualization and exploration tool that works with Elasticsearch. It provides a user-friendly interface for creating visualizations, dashboards, and reports based on the data stored in Elasticsearch. It allows users to explore and analyze their data through interactive visualizations.

ELK stack is set up by installing and configuring each component (Elasticsearch, Logstash, and Kibana) on your servers. You would typically configure Logstash to collect and process log data from your applications or infrastructure, and then send the processed data to Elasticsearch for indexing. Once the data is indexed in Elasticsearch, you can use Kibana to create visualizations and dashboards to analyze and monitor your log data in real-time.

_Note_: There are also other similar stacks like EFK (Elasticsearch, Fluentd, Kibana) and OpenSearch stack (OpenSearch, OpenSearch Dashboards, etc.) that provide similar functionalities for log management and analytics. Grafana is another popular tool that can be used for data visualization and monitoring, and it can be integrated with Elasticsearch to create powerful dashboards for analyzing log data.

_Note_: Nowadays, people are also using Beats (lightweight data shippers) to collect and send data to Elasticsearch instead of Logstash, as Beats can be more efficient for certain use cases and can be easier to set up and manage. For example, Filebeat is a popular Beat that is used for collecting and shipping log files to Elasticsearch. It is designed to be lightweight and efficient, making it a good choice for collecting logs from multiple sources in a distributed system. But Logstash is still widely used for more complex data processing and transformation needs, as it provides a rich set of plugins and features for handling various data sources and formats.
