const app = require("express")();
const PORT = 7777;

// Express runs chain of callbacks
// Middlewares - Mix Matching signatures
app.use(
  "/user",
  (req, res, next) => {
    console.log("First callback");
    res.send("Resonse from sixth callback");
    next();
  },
  [
    (req, res, next) => {
      console.log("Second callback");
      next();
    },
    (req, res, next) => {
      console.log("Third callback");
      next();
    },
    (req, res, next) => {
      console.log("Fourth callback");
      // throw new Error("Error from Fourth callback");
      next();
    },
  ],
  (req, res, next) => {
    console.log("Fifth callback");
    next();
  },
  (req, res, next) => {
    console.log("Sixth callback");
    res.send("Resonse from sixth callback");
    next();
    console.log("Response is sent");
  },
);

app.use("/user", (req, res, next) => {
  console.log("Seventh Callback");
  // res.send("_") -> Throws error as req res lifecycle is already closed by sixth callback
  next();
});

app.use("/user", (req, res, next) => {
  console.log("Eighth Callback");
  next();
});

// Prefix Route Matching vs Exact Route Matching
app.use("/admin", (req, res, next) => {
  console.log("Use Method");
  next();
});

app.all("/admin", (req, res, next) => {
  console.log("All Method");
  next();
});

// Request Handler, in case this didn't exist it would thrown Cannot <Method> /admin
// Additionally, In case if no next() call was there is `app.all()`, request would timeout
app.get("/admin", (req, res, next) => {
  res.send("Admin Response");
});

// `app.use()` callback will be called not `app.all()`
app.get("/admin/getData", (req, res) => {
  res.send("Sent the data");
});

app.delete("/admin/deleteData", (req, res) => {
  res.send("Delete the data");
});

app.use((err, req, res, next) => {
  res.status(500).send(err.message ?? "Something went wrong");
});

app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});
