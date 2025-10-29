import consumerFactory from './kafka/consumer.js';
import produceMessage from './kafka/producer.js';

process.env.KAFKAJS_NO_PARTITIONER_WARNING = 1;

const consumer = await consumerFactory(
  {groupId: 'test-group'},
  {topics: ['test-topic'], fromBeginning: true},
);

consumer.run({
  eachMessage: async ({message}) => {
    console.log(message.value.toString());
  },
});

await Promise.all([
  produceMessage('test-topic', [{value: 'Hello from Kafka JS 1'}]),
  produceMessage('test-topic', [{value: 'Hello from Kafka JS 2'}]),
  produceMessage('test-topic', [{value: 'Hello from Kafka JS 3'}]),
  produceMessage('test-topic', [{value: 'Hello from Kafka JS 4'}]),
  produceMessage('test-topic', [{value: 'Hello from Kafka JS 5'}]),
  produceMessage('test-topic', [{value: 'Hello from Kafka JS 6'}]),
  produceMessage('test-topic', [{value: 'Hello from Kafka JS 7'}]),
  produceMessage('test-topic', [{value: 'Hello from Kafka JS 8'}]),
  produceMessage('test-topic', [{value: 'Hello from Kafka JS 9'}]),
  produceMessage('test-topic', [{value: 'Hello from Kafka JS 10'}]),
  produceMessage('test-topic', [{value: 'Hello from Kafka JS 11'}]),
  produceMessage('test-topic', [{value: 'Hello from Kafka JS 12'}]),
  produceMessage('test-topic', [{value: 'Hello from Kafka JS 13'}]),
]);

['SIGINT', 'SIGTERM'].forEach(signal => {
  process.on(signal, async () => {
    await consumer.disconnect();
    process.exit(0);
  });
});
