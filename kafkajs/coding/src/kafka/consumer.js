import kafka from './index.js';

/**
 * @param {import('kafkajs').ConsumerConfig} config - The configuration for the Kafka consumer.
 * @param {import('kafkajs').ConsumerSubscribeTopics} subscribeTopics - The topics to subscribe to.
 * @returns {Promise<import('kafkajs').Consumer>} - A promise that resolves to the Kafka consumer instance.
 * @description This function creates a Kafka consumer, connects it, and subscribes to a specific topic.
 * It is used to consume messages from the Kafka topic 'learn-apache-kafka-topic'.
 */
async function factory(config, subscribeTopics) {
  const consumer = kafka.consumer(config);
  await consumer.connect();
  await consumer.subscribe(subscribeTopics);
  return consumer;
}
export default factory;
