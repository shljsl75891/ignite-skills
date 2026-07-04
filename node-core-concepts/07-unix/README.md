# UNIX - UNiplexed Information Computing System

> Pretty much everything on the web uses those two things: C and UNIX. The browsers are written in C. The UNIX kernel - that pretty much the entire internet runs on, is written in C.
> **Rob Pike**

> Those who don't understand UNIX are condemned (to sentence or punish) to reinvent it, poorly.
> **Henry Spencer**

> This is the Unix philosophy. Write programs that do one thing and do it well. Write programs to work together. Write programs that handle text streams, because that is a universal interface.
> **Douglas McIlroy**

## What is UNIX ?

![Ken Thompson](/assets/2026-07-01-15-28-57.png)

![Dennis Ritchie](/assets/2026-07-01-15-30-13.png)

> Some consider UNIX to be the second most important invention to come out of AT&T Bell Labs, after the transistor.
> **Dennis Ritchie**

Unix is arguably one of the most influential things to ever come out of software. Ken Thompson and Dennis Ritchie built it at Bell Labs — the same AT&T (American Telephone and Telegraph) research lab that gave the world the transistor, the thing every modern CPU is built on. So in a roundabout way, we owe both our chips and our operating systems to the same lab. They wrote the first version of Unix in assembly language, which sounds fine until needed to run it on different hardware — assembly is tied to one specific machine, so a new architecture meant starting over. Ritchie's fix was to build the C language and rewrite Unix in it. That rewrite is why Unix could suddenly run almostanywhere, and it's a big part of why both C and Unix took off the way they did. Original Unix doesn't really exist anymore, at least not as something we run. What we use today are its descendants: BSD, Linux, macOS, Darwin (which sits on top of BSD), Android, iOS. Linux itself doesn't contain a line of the original Unix code — Linus Torvalds built it from scratch, inspired by Unix's design, while still a 21-year-old student. Unix wasn't open source at the time; Linux was, and that difference is basically why Linux ended up as the biggest open source project in the world. Torvalds also happens to be the person behind Git.

> [!TIP]
> ENOENT = It means "Error NO ENTry" or "No such file or directory". It is a common error code in Unix-like operating systems, indicating that a specified file or directory could not be found.

## UNIX Shells

A shell is just a process running on top of the kernel (the core of the OS which talks to hardware). It is an application usually written in C that communicated with kernel through system calls.

#### What is system call and how can we use it ?

The system calls allow our programs to communicate with the operating system. They provide an interface that lets our programs request services from the OS, such as file operations, process management, and hardware access. We can make system calls in the C programming language by using header files that give us access to system call functions. The shell is also a program written in C. When we use the terminal, the shell makes system calls behind the scenes to talk to the kernel and carry out our commands.

> The official man page definition: "The system call is the fundamental interface between an application and the Linux kernel in Linux OS".

![](/assets/2026-07-04-10-14-55.png)

##### How can we find system calls using MAN pages ?

Man pages are divided into sections, mainly in follows, each covering a different aspect of the system as follows:

- **Section 1**: General Commands (programs and shell commands)
- **Section 2**: System Calls (functions provided by the kernel)
- **Section 3**: Library functions (functions provided by C libraries)

> Although there are many sections which can be explored by writting `man man` in the terminal, we will focus on the above three sections for now.

> [!TIP]
> Try to run `man 2 intro` and `man 2 syscalls` in terminal to see the list of system calls available in your system.

**How can we start shell application ? Do we need to open by double clicking on any application ? Or it automatically is started when our system boots up ?**

We open any terminal application to access the shell. Whenever any terminal is opened, the terminal application will tell Unix kernel to start a shell process. We can not open terminal without a shell, because the purpose of terminal application is just a window that allows us to interact with the shell. The terminal is parent process and the shell is child process.

![](/assets/2026-07-04-10-45-02.png)

There are many different shells available to use, each with its own features and capabilities. Some of the most popular shells include:

- **Thompson Shell (sh) (1971)**: The original Unix shell, developed by Ken Thompson just after 2 years of UNIX. It is a simple and lightweight shell that provides basic command-line functionality.
- **Bash (Bourne Again Shell) (bash) (1989)**: This was the successor to the original Bourne Shell (sh) (1979 by Stephane Bourne) and was developed by Brian Fox for the GNU Project. The default shell on many Linux distributions. It provides features like command history, tab completion, and scripting capabilities. It is a programming language in itself and is widely used for writing shell scripts. It was one of the first softwares ported into Linux by Torvalds, and the other one was GCC (GNU Compiler Collection).
- **Zsh (Z Shell) (1990)**: It was developer by Paul Falstad, and known for its powerful features and customization options. It has gained popularity in recent years, especially with the introduction of Oh My Zsh, a framework for managing Zsh configurations. It is a default shell on macOS Catalina and later versions, and mostly compatible with _bash_.
- **Fish (Friendly Interactive Shell) (2005)**: It was developed by Axel Liljencrantz. It focuses on user-friendliness and ease of use. It provides features like syntax highlighting, autosuggestions, and a more intuitive command-line experience.

> [!NOTE]
> We can make any shell as default shell for our kernel. For example, we can make _bash_ as default shell for our kernel by running the command `chsh -s /bin/bash` in terminal.
