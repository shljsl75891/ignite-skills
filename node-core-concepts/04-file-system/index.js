import fs from 'node:fs/promises';

const commandFilePath = `${import.meta.dirname}/command.txt`;
const fileHandler = await fs.open(commandFilePath, 'r');

fileHandler.on('change', async () => {
  const {size} = await fileHandler.stat();
  const buffer = Buffer.allocUnsafe(size);

  await fileHandler.read(buffer, {
    offset: 0,
    position: 0,
    length: buffer.byteLength,
  });
  console.log(buffer.toString('utf-8'));
});

const fileWatcher = fs.watch(commandFilePath);

for await (const {eventType} of fileWatcher) {
  if (eventType === 'change') {
    fileHandler.emit(eventType);
  }
}
