# Pipes

- The pipes are used to handle the flow of data of a readable stream to destination writable stream with all backpressuring and draining automatically managed by Node.js.
- The pipes can be chained if using duplex and transform streams as destination, without overwhelming the memory usage.
- The pipes automatically emit `destinationStream.end()` when the `readableStream` emit an `end` event by default.

> `readableStream.readableFlowing` = `null` (data consumption not started) | `true` (data is being consumed) | `false` (data is being consumed but paused)

- In production, using `pipe` method is generally discourgeed because there are very less options available for error handling and it don't destroy destination streams in case of unexpected failures leading to memory leaks.
  It is recommended to use `pipeline(s1, s2,s3, ..., callback)` method from `stream` module which provides better error handling and cleanup of all the streams in the pipeline.

> Before `pipeline` method was introduced in Node.js v10, it was recommended to use [`pump`](https://www.npmjs.com/package/pump) module from npm for better error handling and cleanup of streams.
