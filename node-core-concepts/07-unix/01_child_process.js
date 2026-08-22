const { spawn, exec } = require("node:child_process");

// using spawn we can run other processes on the machines
const lsProcess = spawn("ls");
lsProcess.stdout.on("data", (data) => {
  console.log(data.toString("utf-8"));
});

exec("ls -alh", { shell: "/bin/zsh" }, (err, stdout, stderr) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stdout: ${stderr}`);
});

// Difference spawn vs exec at first glance, spawn is used to run a command and get the output as a stream, while exec is used to run a command and get the output as a full buffer
// The main difference between them although is exec runs command in a shell by default while spawn does not run it in a shell but just run as a child process by default.
// spawn also looks for the command only in `PATH` variable rather than aliases, functions and shell builtins. exec on the other hand runs the command in a shell.
console.log(process.env.PATH);
