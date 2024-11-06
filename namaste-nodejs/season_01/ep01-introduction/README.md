# Introduction to NodeJS

![Quote By Jeff Atwood](/assets/2024-11-03-22-03-49.png)

This quote was said by him even before NodeJS was developed. Today, Javascript is everywhere and his words make a lot of sense now.

### What is NodeJS?

- On official website of [Node.js](https://nodejs.org/en), it claims that run JS everywhere.
- It is a **_JavaScript runtime_** built on Chrome's V8 **_JavaScript engine_**.
- It helps to execute JavaScript code outside web browser.
- It is an _open-source_ environment maintained by the committe OpenJS foundation.
- It has an **_Event Driven Architecture_** and is capable of **_Non-Blocking I/O_**.

### History of NodeJS

The first version of NodeJS was developer by Ryan Dahl in 2009. Still, today it is so much popular in 2024. It has very interesting history and controversies.

- To run JS anywhere, we must need JS engine. We can't just run JS code without it. Ryan Dahl was just making NodeJS as a project out of curiosity.
- He named this initially **_Web.js_** as he wanted to create webservers using this technology. But later on, he realized its potential, and he renamed it to NodeJS.
- Ryna Dahl was developing NodeJS using **SpiderMonkey JS Engine** of Mozilla Firefox not Google Chrome's V8 Engine. But just after 2 days, he switched to **Chrome's V8** and never looked back.
- He was independent developer working on this. But, a company named **Joyent** was also working on something similar in an internal project.
- The company was very fascinated by Ryan's project, and said to him that they will fund him to continue working on this as a employee in the company.
- The Joyent used NodeJS internally and built some projects initially. It played very important role in NodeJS popularity. As of now, Joyent is no more maintaining the NodeJS.

##### Why Ryna was building NodeJS ?

- Initially, _Apache HTTP server_ was used for creating web servers. But, it had blocking nature. Ryan wanted to solve this blocking problem and wanted to build non-blocking web servers.
- The advantage of non blocking web server was that it could handle multiple requests using lesser number of threads.

While Ryan was working on NodeJS, a developer of Joyent named **_Isaac Z. Schlueter_** built **NPM** in 2010 (a package manager for Node) so that, anyone can contribute and build small useful packages. This was very significant achievement for NodeJS.

- The NodeJS was initially released for MacOS and Linux. In 2011, Microsoft and Joyent together decided and created NodeJS support for Windows as well and targetted a lot bigger developer's community.

> In 2012, Ryan Dahl, the creator left the NodeJS project just after 3 years of creating it. Although, he didn't left the company. But, he wasn't maintaining the project anymore. So, **Isaac Z. Schlueter** held the responsibilty for maintaining the NodeJS.

- After Isaac Z. Schlueter took off the project, he was facing a lot of challenges. He wasn't able to catch up the pace of NodeJS with updates of Chrome's V8 Engine. Although, NodeJS was an open source, but Joyent was limiting its release cycle. The development process became very slow.
- So, in December 2014, **Fedor Indutny** created `io.js`, a fork of Node.js created because of dissatisfaction with Joyent's governance. He along with his team, started maintaining `io.js`. So, it became very confusing due to two versions and different release cycle of same framework. So, it became very confusing due to two versions and different release cycles of same framework.
- In September 2015, NodeJS and `io.js` collaborated. There was a NodeJS foundation formed, which now said that they will maintain the official final NodeJS, which is now being used today.
- In 2019, two committes (JS Foundation and NodeJS foundation) were merged into single OpenJS Foundation and that took the control of NodeJS.

As of today, this foundation is responsible for all active versions and releases of NodeJS. They try to keep NodeJS fast and upgraded with Chrome's V8 Engine with a lot of new features.
