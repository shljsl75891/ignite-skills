# UNIX - UNiplexed Information Computing System

> Pretty much everything on the web uses those two things: C and UNIX. The browsers are written in C. The UNIX kernal - that pretty much the entire internet runs on, is written in C.
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
