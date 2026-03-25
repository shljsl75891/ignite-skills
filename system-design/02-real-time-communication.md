## Ways for Real time communication

#### Why can't servers can store IP addresses of clients for communication b/w them ?

- Because of the dynamic nature of IP addresses, they can change frequently, making it difficult for servers to maintain accurate records for communication.
- Additionally, storing IP addresses raises privacy and security concerns, as it can potentially expose sensitive information about users and their locations.
- Public IP addresses can be shared among multiple users, further complicating the ability to identify and communicate with specific clients based on their IP addresses alone.

#### What are the ways for real time communication b/w clients and servers ?

##### Short Polling

- In short polling, the client repeatedly sends requests to the server at regular intervals to check for new data or updates. The server responds immediately if there is new data, or returns an empty response or older data if there is no new data. This method can lead to increased latency and unnecessary network traffic, especially if the polling interval is too short.
- No persistent connection. Each request needs 3 way handshake and new connection establishment. This can lead to increased latency and overhead on both the client and server.

![](/assets/2026-03-23-20-32-30.png)

###### Disadvantages

- **Increased latency**: The client may experience delays in receiving updates, as it has to wait for the next polling interval.
- **Unnecessary network traffic**: If the polling interval is too short, it can lead to a large number of requests being sent to the server, even when there are no updates
- **Wastage of resources**: Both the client and server may waste resources handling frequent requests and responses, especially when there are no updates.

##### Long Polling

- In long polling, the client sends a request to the server and waits for a response. The server holds the request open until there is new data to send back to the client. Once the server has new data, it responds to the client, which can then immediately send another request to wait for the next update. This method reduces latency and unnecessary network traffic compared to short polling, also it more near to real time communication.
- The connection remains open until the server has new data to send, or timeout happens if no new data on server side.

![](/assets/2026-03-23-20-36-52.png)

###### Disadvantages

- This method still needs client to send a new request to receive the next update, and overhead of making HTTP request and response is still there.
- The persistent connection between new updates can achieved using `keep-alive` header.

##### WebSockets

The WebSocket protocol provides a full-duplex communication channel over a single, long-lived TCP connection between the client and server. Once the connection is established, both the client and server can send messages to each other at any time without the need for repeated HTTP requests in form of text or binary data. This allows for real-time communication with low latency and reduced overhead compared to polling methods.

![](/assets/2026-03-23-23-03-50.png)

> Similar to `http` and `https`, Websockets also have `ws` and `wss` protocols for unencrypted and encrypted communication respectively.
> Websockets use heartbeat mechanism to keep the connection alive and detect if the connection is lost using PING and PONG frames.

###### Advantages

- **Low latency**: WebSockets provide real-time communication with minimal delay, as there is no need for repeated HTTP requests.
- **Reduced overhead**: Once the connection is established, there is no need for the overhead of HTTP headers and handshakes for each message, resulting in more efficient communication. Instead, messages are sent in form of text or binary data frames, which can be more compact and faster to transmit.
- **Full-duplex communication**: Both the client and server can send messages to each other independently, allowing for more interactive and responsive applications. In order to get new data, client doesn't need to send a new request, server can push the data to client whenever it is available.
- **Scalability**: WebSockets can handle a large number of concurrent connections, making them suitable for applications that require real-time updates, such as chat applications, dashboards, and trading platforms.

##### Server-Sent Events (SSE)

- Server-Sent Events (SSE) is a unidirectional communication protocol that allows the server to push updates to the client over a single, long-lived HTTP connection. The client initiates the connection and listens for updates from the server, which can send data in the form of text or JSON. SSE is suitable for applications that require real-time updates from the server, such as news feeds, stock tickers, and live sports scores.
- In case where we have no need for bidirectional communication, and only server needs to push updates to client such as text streaming, SSE can be a simpler and more efficient solution compared to WebSockets.

![](/assets/2026-03-23-23-15-51.png)

> [!IMPORTANT]
> In all above communication methods, the connection can be terminated by either the client or server at any time, and the other party can detect the termination and handle it accordingly. For example, in WebSockets, if the connection is lost, the client can attempt to reconnect automatically, while in long polling, the client can simply send a new request to re-establish the connection.
