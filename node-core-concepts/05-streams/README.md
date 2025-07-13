# Streams

> It's hardware that makes machine fast. It's software that makes a fast machine slow.
> -- Craig Bruce

## Things to learn

- Fundamentals of streams
  - Using existing `writable streams`
  - Implemeting own `writable stream`
  - Using existing `readable streams`
  - Implementing own `readable stream`
- Implementing and using`duplex streams`
- Implementing and using`transform streams`
- File Encryption and Decryption application

### What exactly are streams ?

- An abstract interface for working with streaming data in Node.js

![](/assets/2025-07-13-13-23-07.png)

- Without streams, we were writting on disk 10 million times.
- But after using streams, number of writes reduced significantly.

##### Funamental Streams

- **Readable Streams**: HTTP Requests
- **Writable Streams**: HTTP Responses

###### More Advanced

- **Duplex Streams**: Both readable and writable streams
- **Transform Streams**: Duplex streams that can modify the data as it is written and read such as _Encryption_ and _Compression_.

### Writable Streams

![](/assets/2025-07-13-13-41-11.png)

- We can fill internal buffer using `stream.write(chunk)` method. We push data until internal buffer is completely filled.
- Destination will be written to only and only when the internal buffer is full.
- If we keep writing data to stream without waiting for internal buffer to be drained, Node.js will pause the pushing of data in internal buffer, and will keep buffering the pushed data until maximum memory usage is reached.
- Draining of a stream means the content of internal buffer is accepted by the operating system, and internal buffer is ready to accept more data.

So, it is crucial to write data to the stream if and only if the internal buffer is drained. Otherwise, we will end up with memory leaks. Doing not so will cause:

- High RAM usage by the Node.js application
- Poor garbage collector performance
- High RSS (**Resident Set Size** - The portion of process memory that is held in RAM) which is not released back to the system, even if it is not required anymore.

`stream.end(chunk)` = This method indicates the this is my last write, and the writing operation is completed. It will fire `finish` event which we can use for cleanup. Writing data after stream ends will throw an error = `Error [ERR_STREAM_WRITE_AFTER_END]: Write after end`.
