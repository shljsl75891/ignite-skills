# Databases

#### What is database ?

Database is organized collection of data in such a way that it is easier to perform operations on it.

#### What is DBMS ?

> DBMS - Database Management System

![](/assets/2025-01-23-18-24-35.png)

It is a software that interacts with end users, applications and database to capture and analyze the data.

#### Types of databases

- Relation DB
- NoSQL DB
- In-Memory DB
- Distributed SQL DB
- Timeseries DB
- Object Oriented DB
- Graph DB
- Hierarchical DB
- Network DB
- Cloud DB

Each type of database serves different purpose. There are so many types of databases because data can be stored in many different ways for different purposes.

##### Relation Databases

> SQL = Structured Query Language

The wave of relational databases started om 1970s-80s. [Edgar F.
Codd](https://en.wikipedia.org/wiki/Edgar_F._Codd), a british computer scientist introduced `Codd's 12 Rules`. In actual, there were 13 rules because they were 0-indexed. If any database followed this rule, that database will be _Relational Database_.

###### Interesting stories of _MySQL_ and _PostgreSQL_

1. **MySQL**

- This was invented by [Michael Widenius](https://en.wikipedia.org/wiki/Michael_Widenius)
- He had three daughters:-
  - `My` => MySQL \_(later acquired by [Sun Microsystems](https://en.wikipedia.org/wiki/Sun_Microsystems) which further acquired by [Oracle](https://en.wikipedia.org/wiki/Oracle_Corporation).
  - `Max` => MaxDB
  - `Maria` => MariaDB _(fork of MySQL)_

2. **PostgreSQL**

- This was invented by [Michael Stonebraker](https://en.wikipedia.org/wiki/Michael_Stonebraker).
- He was working on a project called `Ingres` at the University of California. He left the university, then rejoined later and began developing a project called `Post Ingres`, which eventually evolved into _PostgreSQL_ because it utilized SQL in the project.

##### NoSQL (Not only SQL) databases

- The wave of these databases started in 2000s. There are further many types of NoSQL databases:
  - Document DB = [MongoDB](https://www.mongodb.com/)
  - KeyValue DB = [DynamoDB](https://aws.amazon.com/dynamodb/)
  - Graph DB
  - Wide Columns DB
  - Multi Model DB
- _MongoDB_ was created in 2009 (at the same time of Node.js) and became very famous.
- Both Node.js and MongoDB evolved together, it seems that both are made for each other because MongoDB is very compatible with JS Objects and JSON.
- The name is inspired by `Humoungous` word, which means very huge / large. As, we can store much larger documents in MongoDB.
- It was created by company 10 Gen as open source project, and it was so much successful that company changed its name to [MongoDB Inc.](https://www.mongodb.com/company/newsroom/press-releases/10gen-announces-solutions-name-change-mongodb-inc)

##### SQL v/s NoSQL Databases

- `Table` <=====> `Collection`
- `Rows` <=====> `Documents`
- `Columns` <=====> `Fields`
- `SQL` <=====> `MQL`
- Horizontal scaling is easier in NoSQL.
- Adding columns in easier in NoSQL.
- SQL has very rigid schema and more organized as well as structured.

RDBMS is often used in scenarios requiring complex transactions and strong consistency, such as banking systems. NoSQL databases are preferred for applications needing flexible data models and high-performance, such as content management systems and real-time data processing.
