const app = require("express")();
const PORT = 7777;

app.use("/", (_, res) => {
  res.send("Namaste NodeJS");
});

app.use("/test", (_, res) => {
  res.send("Testing the server");
});

app.use("/hello", (_, res) => {
  res.send("Hello from the server");
});

app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});
