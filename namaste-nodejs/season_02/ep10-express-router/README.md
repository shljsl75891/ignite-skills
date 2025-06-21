# Diving into APIs and express Router

- We can use `express.Router()` to logically seperate the APIs
- It also helps us to make code more readable and modular

```js
import express from "express";
const app = express();

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/requests", requestRouter);
```

The APIs to be created:

- For `authRouter`
  - POST `/auth/signup`
  - POST `/auth/login`
  - PATCH `/auth/forgot-password`
- For `userRouter`
  - GET `/users/profile`
  - PATCH `/users/update-profile`
  - GET `/users/feed`
  - DELETE `/users/delete-my-account`
- For `requestRouter`
  - GET `/requests/received`
  - POST `/requests/send/:status/:receiver`
  - PATCH `/requests/review/:id/:status`
