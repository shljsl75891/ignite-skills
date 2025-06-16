# Middlewares and Error Handling

- Express follows a chain of responsibility design pattern. It executes chain of callback functions matching the route.

```js
app.use("/1", rh1, rh2, [rh3, rh4, rh5], rh6);
app.use("/1", rh7, rh8, [rh9]);
```

- **Middleware**, **Request Handler**, **Error Middleware** are just lingo for route handlers which are executed one by one.
- In case of sending response mulitple times, express will throw an error. As, it can't be resent after request response lifecycle is completed

```js
Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
```

#### `app.use()` vs `app.all()`

- Both runs for all HTTP Methods.
- `use` will be run using prefix route matching
- `all` will be run with exact route matching

```js
// Assume `next()` is called in each route handler
// rh1 will be called for /admin/* routes
// rh2 will be called only for /admin
app.use("/admin", rh1);
app.all("/admin", rh2);
app.get("/admin", rh3); // rh1, rh2, rh3
app.get("/admin/test", rh4); // rh1, rh3, rh4
```

- Order of these route handlers is very important
- The next route handler will only be called if `next()` function is executed.
- Route handler responsible for sending the response is called **Request Handler**.
- Route handlers before **Request Handler** is called **_Middleware_**.

> - `next()` will throw `Cannot <method> <route>` if there is no **Request Handler**.
> - If `next()` is not there, then request will timeout if there is no **Request Handler**.

#### Error Handling

- Although, we should write code in `try...catch` block for gracefull error handling
- We can write a error handler (error middleware) for handling unhandled errors as follows:

```js
app.use((err, req, res, next) => {
  res.status(500).send(err.message ?? "Something went wrong");
});
```

- This must be written at the last of all routes. As _Order of route handlers is very important._

- `express.json()` returns a middleware, which converts JSON payloads to Javascript Objects, and add them in `request`.
