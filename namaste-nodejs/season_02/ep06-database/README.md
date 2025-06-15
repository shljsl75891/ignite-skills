# Database, Schema and Models

- Always prioritize connecting database before starting app and listening on any port

```js
connectDB()
  .then(() => {
    console.info("Database connection established");
    app.listen(PORT, () => {
      console.info(`The server is running on: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(`Database connection failed: ${err}`);
  });
```
