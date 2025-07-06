# File System

## What exactly is a file ?

- The files are just sequence of bits. Those can be interpreted differently based on type of file + encoding & decoding.
- Everything on a computer such as storage devices, HDD, SSD, USB, etc. are just files.
- A file can represent different things such as text, image, video, audio, program etc.

![](/assets/2025-07-06-21-21-46.png)

The metadata associated with any file is stored in another file called `FileData`. It containes information such as:

- File Name
- Permissions
- Location
- Size
- Type to indicate encoding and decoding system
- Timestamps
- ... and other stuff so on...

Our operating system only knows about the execution of executable files. It doesn't have any idea about:

- A Video File
- An Image File
- A Text File
- A Program File
- A Document File such as PDF, DOCX, etc.

We need additional programs to interpret these files based on different types of encoding and decoding systems.

## How Node.js deal with files ? How it does CRUD operations on files ?

![](/assets/2025-07-06-21-32-26.png)

Node.js doesn't directly goes to hard drive to do CRUD operations on files. It offloads that thing to `libuv`, which do system calls such as `open()`, `rename()` etc. to the OS to perform these operations. The OS also offloads these operations to the kernel, which is the core part of the OS that interacts with the hardware.

```
Node.js JS Code
      ↓
libuv (C/C++ layer, manages async I/O)
      ↓
System Calls (e.g., open, read, write, rename)
      ↓
Operating System
      ↓
Kernel (interacts with file system drivers, hardware)
      ↓
Disk (SSD/HDD)
```

### Three different ways of file handling in Node.js

1. **Synchronous**: Blocking main thread operations that wait for the file operation to complete before moving on to the next line of code.
   - Example: `fs.readFileSync()`, `fs.writeFileSync()`. This is the slowest way. Try to avoid this way unless you are doing something very simple and quick, such as reading a config file at the start of your program.
2. **Asynchronous**: Non-blocking operations that allow the program to continue executing while the file operation is being performed in the background.
   - Example: `fs.readFile()`, `fs.writeFile()`. This is the fastest way. Use this way when performaance is very critical.
3. **Promises**: Using Promises to handle file operations, which allows for cleaner code and better error handling.
   - Example: `fs.promises.readFile()`, `fs.promises.writeFile()`. This is the faster and modern way. Stick with this 90% of the time.
