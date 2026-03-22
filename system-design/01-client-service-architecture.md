## Client Server Architecture

The client-server architecture is a software design pattern that divides an application into two main components: the client and the server. The client is responsible for interacting with the user and sending requests to the server, while the server processes those requests and returns the appropriate responses. These are relative terms, as a client can also be a server to another client, and vice versa.

For example, A web UI can send request to a web server, which can then send request to a database server. In this case, the web UI is a client to the web server, and the web server is a client to the database server.

## Networking

There are two important layers to remember for interviews. Each layer has its own protocols.

- **The Transport Layer** = How data is transmitted between two parties. In this layer, the data is divided into segments, and then segments are transmitted over the network. The important protocols in this layer are TCP (Transmissin control protocol) and UDP (User datagram protocol).
- **The Application Layer** = How data is structured and formatted for communication between two parties. In this layer, the data is structured in a way that both parties can understand. The important protocols in this layer are HTTP, HTTPS, FTP, etc. This is the top most layer in network layers hierarchy, and it is built on the top of the transport layer. Some of the protocols used in this layer are HTTP, HTTPS, FTP, SMTP, DNS etc.

![](/assets/2026-03-22-21-37-03.png)

> [!NOTE]
> **Why TCP is slow ?**
> TCP is a connection-oriented protocol, which means that it establishes a connection between the client and the server before transmitting data. This connection establishment process involves a three-way handshake, which can introduce latency. Additionally, TCP ensures reliable data transmission by implementing error checking, sequencing & ordering and retransmission mechanisms, which can be computationally expensive and further slow down the communication. Also, it involves graceful connection termination requiring four-way handshake.

#### The Transport Layer Protocols

##### CONNECTION ESTABLISHMENT - Three Way Handshake

![](/assets/2026-03-22-21-41-50.png)

> SYN = Synchronize and ACK = Acknowledgement

##### FLOW CONTROL AND DATA SEGMENTATION WITH SLIDING WINDOW

When a client sends a request to the server, the data is divided into segments. The server then processes each segment and sends an acknowledgment back to the client. The client can only send a certain number of segments before it receives an acknowledgment from the server. This is known as flow control, and it is implemented using a sliding window mechanism.

![](/assets/2026-03-22-21-44-12.png)

> [!IMPORTANT]
> To avoid overhead of sending acknowledgment for each segment by receiver, the receiver send a window size with each acknowledgment, which indicates how many segments the sender can send before it needs to receive an acknowledgment from the receiver. This allows the sender to send multiple segments without waiting for an acknowledgment for each segment, which can improve the performance of the communication.

##### GRACEFUL CONNECTION TERMINATION - Four Way Handshake

For terminating connection, anyone can initiate the termination process (either client or server).
![](/assets/2026-03-22-21-53-19.png)

> FIN = Finish

#### Difference between TCP and UDP

| TCP                                   | UDP                                 |
| ------------------------------------- | ----------------------------------- |
| Connection-oriented protocol          | Connectionless protocol             |
| Reliable data transmission            | Unreliable data transmission        |
| Extensive Error checking              | Basic error checking,               |
| Sequencing and ordering of data       | No sequencing or ordering of data   |
| SLOWER due to overhead                | FASTER due to less overhead         |
| Retransmission of lost packets        | No retransmission of lost packets   |
| Eg. Email, Military, Banking          | Eg. Video streaming, Online gaming  |
| No support for multicast or broadcast | Support for multicast and broadcast |

> [!TIP]
> **Which transport protocol is used by DNS ?**
> DNS primarily uses UDP for its queries and responses because usually the requests are too small which can be sent in 1 single UDP packet, and it is such a common thing that needs to be done very fast. However, if the response data size exceeds the UDP packet size limit (512 bytes), DNS can fall back to using TCP to ensure reliable transmission of the larger data.

#### The Application Layer Protocols

##### HTTP (Hypertext Transfer Protocol)

**Evolution of HTTP**

- HTTP/0.9: This was the first version released in 1991
  - Only supported GET method
  - No headers, status codes
  - Plain text response
- HTTP/1.0: Released in 1996, it introduced several improvements over HTTP/0.9, including:
  - Support for multiple methods (GET, POST, HEAD, etc.)
  - Introduction of headers and status codes
  - Support for MIME types

> [!NOTE]
>
> - Till HTTP/2, all versions were built on top of TCP protocol.
> - Till HTTP/1.0, each request required a new TCP connection, which introduced significant overhead due to the connection establishment and teardown process. This led to increased latency and reduced performance, especially for web pages that require multiple resources (like images, CSS files, JavaScript files, etc.). To address this issue, HTTP/1.1 introduced persistent connections (keep-alive), allowing multiple requests to be sent over a single TCP connection without the need to establish a new connection for each request. This significantly improved the performance of web applications by reducing latency and the overhead associated with establishing and tearing down connections.

- HTTP/1.1: Released in 1997, it is the most widely used version of HTTP and includes several enhancements:
  - Persistent connections (keep-alive) to reduce latency which
  - Pipelining to allow multiple requests to be sent without waiting for responses
  - Chunked transfer encoding for streaming data
- HTTP/2: Released in 2015, ]
  - Introduced multiplexing to allow multiple requests and responses to be sent simultaneously over a single connection
  - Header compression to reduce overhead
- HTTP/3: Released in 2020, it is the latest version of HTTP and is built on top of the QUIC protocol, which is designed to improve performance and security. HTTP/3 includes several improvements over HTTP/2, including:
  - Faster connection establishment with reduced latency
  - Improved performance in high-latency and lossy network conditions
  - Enhanced security features

##### HTTPS (Hypertext Transfer Protocol Secure)

- HTTPS is an extension of HTTP that adds a layer of security by using SSL/TLS (Secure Sockets Layer/Transport Layer Security) to encrypt the data transmitted between the client and the server.
- The transmission of data is encrypted using a combination of symmetric and asymmetric encryption.
- The client and server perform a handshake to establish a secure connection, during which they exchange cryptographic keys using diffie-helmen key exchange (asymmetric encryption).
- Once the secure connection is established, the data transmitted between the client and the server is encrypted using symmetric encryption, which is faster than asymmetric encryption.

![](/assets/2026-03-22-22-22-08.png)
