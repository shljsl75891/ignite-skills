# [Networkin

A way of communication between computers.

> The Internet ? We are not interested in it.
> -- Bill Gates, 1993

Node.js was built for building scalable networking applications.

##### Modules to Learn

- Related to networking: `net`, `dgram`, `DNS`
- Not Related to networking: `readline`, `process`, `TTY`

##### Applications to build

- A simple chat application
- A simple file uploader service
- A simple TCP application
- A simple UDP application

#### History of netrworking

30 years ago....

- There was no way to connect computers together
- There was no way to send data between computers
- To transfer data, you had to use floppy disks or other physical media

This way of communication becomes impractical as distance between computers increases.

###### Switches and MAC Addresses

1. **Cables**: This is the most basic thing for moving information in form of bits 0 and 1s.
2. **Switches**: These are the most basic devices after cables, which are used to connect computers together.

![](/assets/2025-06-29-20-46-31.png)

For this way of communication:

- Each computer must have capability to have ethernet port.
- Also, each computer must have a networking card/ Now a days, all laptops comes with a prebuilt networking card.
- Each network card has a unique identifier associated with it called **MAC (Medium Access Control) Address**.
- So, computers don't had network card from the beginning after its invention, but it was added later on.

> MAC Address is of this format: `00:1A:2B:3C:4D:5E` of 48 bits (6 bytes) in hexadecimal format.<br>
> _(This is very sensitive and unique to each computer. If any hacker gets access to your MAC address, he can use it to impersonate you on the network..)_

In order to communicate through switches, a computer need to send info in form of frames, which are packets of data that contain the MAC address of the sender and receiver.

![](/assets/2025-06-29-20-54-26.png)

Switch is smart enough to read the MAC address of the sender and receiver, and then it forwards the frame to the correct destination.

###### Routers

- Now, using swicthes and networking cards, we can connect computers together in a local area network (LAN). But these LANs are not enough to connect computers across the world.
- As switch can only connect limited number of computers, we need a way to connect multiple LANs together.
- Otherwise, how communication would happen between cities to cities, countries to countries, and continents to continents?

![](/assets/2025-06-29-20-57-56.png)

- Now routers come into play. They act as a layer on top of swicthes. Routers of multiple LANs are connected together to form a wide area network (WAN).
- Each router is assigned a unique range of IP addresses, which are used to identify the devices connected to the router.
- In order for computers to send the information, it should know the IP address + port number of the destination computer.

Thus, how internet works. If we are connected to internet by any means, we are connected to whole world physically through cables, switches, and routers.

## Networking Layers

![](/assets/2025-06-29-21-03-36.png)

1. **Physical Layer**: This layer only knows how to transer bits (0 and 1s) over the physical medium (cables).
2. **DataLink Layer**: In this layer, the switces receives the bits and converts them into frames, which contain the MAC address of the sender and receiver. They route them to the correct destination through physical layer again, and then receivers's machine reads those bits and converts them back to frames.
3. **Network Layer**: In this layer, all routers receives the frames and converts them into packets. They are smart enough to determine the shortest path to the destination based on the IP address, no matter how far the source and destination are.
4. **Transport Layer**: This layer make sure thay the sent packets gets accross safely in the internet to destination. It also handles the flow control and error correction. If any packet get lost (which is very common in internet), it may be resent or retransmitted. In that case, the sender will be notified about the lost packet, and it will be resent.
5. **Application Layer**: This is the layer where all the data is processed and presented to the user. Node.js networking applications run on this layer.

#### HOMEWORK

- Analyze the tcp app using wireshark application
