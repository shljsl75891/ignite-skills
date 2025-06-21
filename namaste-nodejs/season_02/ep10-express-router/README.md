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
  - POST `/auth/signup` - for creating my user in the app
  - POST `/auth/login` - for logging in the app
  - PATCH `/auth/forgot-password` - for resetting my password
- For `userRouter`
  - GET `/users/profile` - for seeing my profile
  - PATCH `/users/update-profile` - for updating my profile
  - GET `/users/feed` - for exploring other users to send connection requests
  - DELETE `/users/delete-my-account` - for permanently deleting my account
- For `requestRouter`
  - GET `/requests/sent` - for seeing connection requests sent by me
  - GET `/requests/received` - for seeing my recived connection requests
  - POST `/requests/send/:status/:receiver` - for liking / disliking someone
  - PATCH `/requests/review/:id/:status` - for accepting / rejecting received connection request
