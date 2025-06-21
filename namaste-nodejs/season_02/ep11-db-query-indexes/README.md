# Logical DB Query and Indexes

- Always think about the corner cases from the perspective of an attacker of APIs
  - What if a user sends a connection request to himself
  - What if the receiver of request doesn't exist in the database
  - What if the user tries to send the connection request to someone by whom he already received a connection request
- Leverage the schema hooks for different type of validations like `pre` hook.What if a user sends a connection request to himself.

```js
requestSchema.pre("save", function (next) {
  if (this.sender.equals(this.receiver))
    throw new Error("A user cannot send connection request to itself");
  next();
});
```

- Use indexes to enforce constraints and improve performance of the database []()
  - `unique` index to enforce constraint
  ```js
  // 1 = Ascending, -1 = Descending
  requestSchema.index({ sender: 1, receiver: 1 }, { unique: true });
  ```
  - We can add `index: true` as well in schema paths properties
- Advantages and Disadvantages of creating indexes
- Read about [Compound Indexes](https://www.mongodb.com/docs/manual/core/indexes/index-types/index-compound/) in mongodb
- Read about [Querying](https://www.mongodb.com/docs/manual/reference/operator/query/)
