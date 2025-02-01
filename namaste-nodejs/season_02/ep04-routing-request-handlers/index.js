const app = require("express")();
const PORT = 7777;

// Regex
app.get("/ab+c", (req, res) => {
  res.send("Req URL: " + req.url);
});

app.get("/ab?c", (req, res) => {
  res.send(req.url);
});
app.get(/a/, (_, res) => {
  res.send("Regex");
});

app.get(/.*fly$/, (_, res) => {
  res.send("Butterfly");
});

// methods
app.get("/user", (_, res) => {
  res.json({
    method: "GET",
    firstName: "Sahil",
    lastName: "Jassal",
  });
});

app.get("/user/:id", (req, res) => {
  res.json({
    id: req.params.id,
    method: "GET",
    firstName: "Sahil",
    lastName: "Jassal",
  });
});

app.post("/user", (_, res) => {
  res.json({
    method: "POST",
    firstName: "Sahil",
    lastName: "Jassal",
  });
});

app.patch("/user", (_, res) => {
  res.json({
    method: "PATCH",
    firstName: "Sahil",
    lastName: "Jassal",
  });
});

app.put("/user", (_, res) => {
  res.json({
    method: "PUT",
    firstName: "Sahil",
    lastName: "Jassal",
  });
});

app.delete("/user", (_, res) => {
  res.json({
    method: "DELETE",
    firstName: "Sahil",
    lastName: "Jassal",
  });
});

// all methods
app.use("/test", (_, res) => {
  res.send("Testing the server");
});

app.use("/hello", (_, res) => {
  res.send("Hello from the server");
});

app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});
