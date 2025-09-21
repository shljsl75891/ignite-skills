# CLI Commands

#### Kafka Topic CLI

```sh
kafka-topics --bootstrap-server localhost:9092 --list
kafka-topics --bootstrap-server localhost:9092 --topic quickstart --create
kafka-topics --bootstrap-server localhost:9092 --topic quickstart --create --partitions 3 --replication-factor 1
```

#### Kafka Producer CLI

```sh
kafka-console-producer --bootstrap-server localhost:9092 --topic quickstart
```

#### Kafka Consumer CLI

```sh
kafka-console-consumer --bootstrap-server localhost:9092 --topic quickstart
kafka-console-consumer --bootstrap-server localhost:9092 --topic quickstart --from-beginning
kafka-console-consumer --bootstrap-server localhost:9092 --topic quickstart --group group-name
kafka-console-consumer --bootstrap-server localhost:9092 --topic quickstart --offset earliest --partition 0
```

#### Kafka Consumer Group CLI

```sh
kafka-consumer-groups --bootstrap-server localhost:9092 --group gp-1 --describe
```
