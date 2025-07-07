import fs from 'node:fs/promises';

const commandFilePath = `${import.meta.dirname}/command.txt`;

const fileHandler = await fs.open(commandFilePath, 'r');
const fileWatcher = fs.watch(commandFilePath);

for await (const {eventType} of fileWatcher) {
  if (eventType === 'change') {
    // getting metadata associated with the file
    const {size} = await fileHandler.stat();
    const buffer = Buffer.allocUnsafe(size);

    const content = await fileHandler.read(buffer, {
      offset: 0,
      position: 0,
      length: buffer.byteLength,
    });
    console.log(content);
  }
}
