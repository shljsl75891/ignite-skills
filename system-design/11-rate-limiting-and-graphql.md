## API Design and GraphQL

There are three ways of communication between the client and the server:

1. **REST** (Representational State Transfer) API: This is the most common way of communication between the client and the server. It is stateless, cachebale and based on HTTP protocol and uses HTTP methods (GET, POST, PUT, DELETE).
   - It contains HTTP status codes to indicate the success or failure of the request.
   - Versioning is done through URL (e.g. /api/v1/resource)
   - Query parameters are used to filter and sort the data (e.g. /api/v1/resource?sort=asc&filter=active)
1. **SOAP** (Simple Object Access Protocol): This is XML based protocol which is not used as much as REST API. It also requires more overhead and bandwidth than REST API.
1. **GraphQL** (Graph Query Language): The issue of over fetching / under fetching of data (when multiple clients wants different data) is solved by GraphQL. It allows the client to specify exactly what data it needs and the server will return only that data. It also allows the client to request multiple resources in a single request.
   - It uses a single endpoint (e.g. /graphql) and the client sends a query in the request body.
   - The query is written in a specific syntax and the server returns the data in JSON format.
   - It also supports mutations (for creating, updating and deleting data) and subscriptions (for real-time updates).

> [!NOTE]
> The GraphQL APIs are generally POST requests because we have to send the query always in request body to tell the server what data we want.
> **N+1 problem**: When we have to fetch a list of items and for each item we have to fetch some related data, it can lead to N+1 problem. For example, if we have to fetch a list of users and for each user we have to fetch their posts, it can lead to N+1 problem. The GraphQL also solves this problem.

### Example GraphQL Query

```graphql
query GetUsersWithPosts {
  users {
    id
    name
    email
    posts {
      id
      title
      content
      createdAt
    }
  }
}
```

In this query, we fetch only the fields we need (no overfetching) and get related posts in one request (no N+1 problem). The server responds with JSON matching the exact structure of our query.

> [!TIP]
> **ETags for conditional requests**: We can use ETags to implement caching and reduce bandwidth. When the client sends an `If-None-Match` header with the ETag, the server returns 304 (Not Modified) if the resource hasn't changed. The 304 response includes no body — just headers — saving significant bandwidth. ETags come in two forms:
>
> - **Strong ETag** (e.g., `"abc123"`): Exact byte-for-byte match. Used when content must be identical.
> - **Weak ETag** (e.g., `W/"abc123"`): Semantically equivalent, minor formatting differences OK. More flexible for caching.
>   Always match the ETag format the server sends back — if it's weak, include the `W/` prefix in the request.
>
> ![](/assets/2026-04-19-15-32-57.png)

## Filtering and Pagination

##### Filtering

- It is used to retrieve a subset of data based on certain criteria. For example, we can filter users by their name or email.
- In REST API, we can use query parameters for filtering (e.g. `/api/v1/users?name=John`). In GraphQL, we can use arguments in the query. It may also contains logical operators (AND, OR) and comparison operators (>, <, >=, <=) for more complex filtering.

##### Pagination

- It is used to retrieve a subset of data when there are a large number of records. For example, we can retrieve 10 users at a time.
- In REST API, we can use query parameters for pagination (e.g. `/api/v1/users?page=1&limit=10`). In GraphQL, we can use arguments in the query.

## Rate Limiting and Throttling

#### Rate Limiting

- It is used to limit the number of requests a client can make to the server in a given time period. For example, we can limit a client to make 100 requests per hour.
- It is used to prevent abuse and ensure fair usage of the API. It can be implemented using a token bucket algorithm or a leaky bucket algorithm.

Mostly, we can achieve the rate limiting using hash tables as below:

| IP_URL / Token_URL                                     | Count | Previous Request Time |
| ------------------------------------------------------ | ----- | --------------------- |
| 11.22.33.44\_/api/v1/resource                          | 5     | 2026-04-19 15:00:00   |
| eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\_/api/v1/resource | 10    | 2026-04-19 15:05:00   |

In above table, whenever a new request comes, we can do three things:

- Check if the IP_URL or Token_URL exists in the table. If not, create a new entry with count = 1 and previous request time = current time.
- If it exists, check if the previous request time is within the fixed window (e.g 15 minutes). If it is, increment the count.If the count exceeds the limit (e.g. 100), reject the request.
- If it is not within the fixed window, reset the count to 1 and update the previous request time to current time.

##### Fixed Window vs Sliding Window

But, there is a problem with the fixed window approach — it can lead to bursts of traffic at the edges of the window. For example, if the limit is 100 requests per hour, a client could make 100 requests at 1:59 PM and then immediately make another 100 requests at 2:00 PM, effectively doubling their allowed rate.

![](/assets/2026-04-19-16-17-58.png)

To solve this problem, we can use a sliding window approach. Instead of resetting the count at the end of the fixed window, we can keep track of the timestamps of each request and only count those that fall within the last hour. This way, the rate limit is enforced more smoothly over time. (Allowed limit: 100 requests per hour)

Now, if new requests come in, we can do the following:

- Firstly, remove any timestamps that are older than 1 hour from the current time
- Count the remaining timestamps. If the count exceeds the limit (e.g. 100), reject the request. Otherwise, add the current timestamp to the list.

The table look like below now:

| IP_URL / Token_URL                                     | Timestamps                                      |
| ------------------------------------------------------ | ----------------------------------------------- |
| 11.22.33.44\_/api/v1/resource                          | [2026-04-19 15:00:00, 2026-04-19 15:05:00]      |
| eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\_/api/v1/resource | [2026-04-19 15:00:00, 2026-04-19 15:05:00, ...] |

Thus, this approach prevents bursts of traffic at the edges of the window and provides a more accurate rate limiting mechanism. But, we also need to keep in mind the trade-off of this approach — it requires more memory to store the timestamps of each request and it can be more complex to implement.

##### When to use IP-based rate limiting, and when to use token-based rate limiting?

- **IP-based rate limiting**: It is useful for unauthenticated endpoints or when we want to limit traffic from a specific IP address. However, it can be easily bypassed by using a different IP address or by using a proxy server. It can also lead to false positives if multiple users share the same IP address (e.g. behind a NAT).
- **Token-based rate limiting**: It is more secure and accurate for authenticated endpoints. It allows us to track the usage of each user or API key independently. However, it requires authentication and can be more complex to implement.

> [!CAUTION]
> IP-based rate limiting is weak for authenticated endpoints. A hacker sharing or spoofing an IP with a normal user drains their bucket too. Always key by user ID or API key for auth'd routes — use IP only as a secondary signal (e.g. blocking unauthenticated floods).

##### Token bucket

A bucket holds tokens. Each request consumes one. Tokens refill at a fixed rate — when the bucket is empty, requests are rejected.

```
[Token source] --refills at fixed rate--> [ 🪙 🪙 🪙 🪙 🪙 ]  (capacity = max burst)
                                                    |
                                             request arrives
                                             has token? → ✅ pass
                                             empty?     → ❌ reject
```

- Burst traffic is fine — if we saved up 10 tokens, 10 requests fire instantly
- Refill rate = sustained throughput. Capacity = max burst we allow
- Used by AWS API Gateway, Stripe, GitHub APIs

##### Leaky bucket

Requests queue up in a bucket and drain out at a constant rate — no matter how fast they arrive.

```
[Burst of requests] → [ req  req  req  req ] → drains at fixed rate → processed
                              ↑
                        overflow = dropped
```

- Bursts never reach downstream — output is always smooth and steady
- Bucket size = how much burst we absorb before dropping. Leak rate = processing rate
- Used for network traffic shaping, protecting databases from sudden spikes

###### Bucket scope — per user, not global in both algorithms

Each user gets their own independent bucket, keyed by user ID or API key. One user exhausting their bucket has no effect on anyone else.

| Keying strategy   | Isolated?                                        |
| ----------------- | ------------------------------------------------ |
| User ID / API key | Yes — one user can't affect another              |
| IP address        | No — shared or spoofed IPs draw from same bucket |
| Global            | No — one heavy user throttles everyone           |

#### Throttling

Throttling is different from rate limiting — it delays requests instead of rejecting them.

| Approach      | Behavior                          | When to use                     |
| ------------- | --------------------------------- | ------------------------------- |
| Rate limiting | Returns 429 when limit exceeded   | Prevent abuse, strict quotas    |
| Throttling    | Queues and delays excess requests | Graceful degradation under load |

When a request arrives beyond the limit:

- **Rate limiting** → Immediate rejection (hard stop)
- **Throttling** → Added to queue, processed with delay (soft handling)

> [!TIP]
> We layer both: rate limiting at the edge to block abuse, throttling at the service layer to handle legitimate traffic spikes gracefully.
