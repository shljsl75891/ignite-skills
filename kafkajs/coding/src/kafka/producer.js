import kafka from './index.js';

/**
 * @param {string} topic - The Kafka topic to produce messages to.
 * @param {Array<{key: string, value: string}>} messages - The messages to produce.
 */
async function produceMessage(topic, messages) {
  const producer = kafka.producer();
  await producer.connect();
  await producer.send({topic, messages});
  await producer.disconnect();
}

export default produceMessage;
