const { spawn, exec } = require("node:child_process");

// using spawn we can run other processes on the machines
const lsProcess = spawn("ls");
lsProcess.stdout.on("data", (data) => {
  console.log(data.toString("utf-8"));
});

exec("ls -alh", (err, stdout, stderr) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stdout: ${stderr}`);
});

// Difference spawn vs exec at first glance, spawn is used to run a command and get the output as a stream, while exec is used to run a command and get the output as a string.
