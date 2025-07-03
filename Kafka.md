## Kafka


# Applications of Apache Kafka

Apache Kafka is a powerful distributed event streaming platform widely used in modern software architecture. You can use Kafka in various types of applications, especially where high-throughput, real-time data processing and integration are critical. Below are some common applications:

---

# Why Kafka?

## 🔄 High-Throughput Messaging System
- Handles millions of messages per second with low latency.  
- Scales horizontally by adding more brokers (servers).

## ⚙️ Real-Time Data Processing
- Enables real-time data pipelines and streaming applications.  
- Supports stream processing via Kafka Streams and integrations with Apache Flink, Spark, etc.

## 💾 Durability & Reliability
- Messages are persisted on disk and replicated across brokers.  
- Guarantees message delivery even during system failures.

## 📌 Decouples Producers and Consumers
- Producers send messages to topics without knowing who the consumers are.  
- Consumers can independently read data at their own pace.

## 🔁 Replayable Message Log
- Kafka stores messages with configurable retention.  
- Consumers can reprocess events by rewinding the offset.

## 🏗️ Scalable and Distributed
- Distributed architecture allows for high availability and load balancing.  
- Easy to scale out by adding more partitions and brokers.

## 🔐 Security & Governance
- Supports SSL encryption, SASL authentication, and ACLs for fine-grained access control.  
- Auditability via persistent logs.

## 🌐 Ecosystem and Integration
- Strong ecosystem with Kafka Connect (for integration with databases, cloud services, etc.).  
- Broad community and support across many platforms and tools.

## 📉 Low Latency
- Designed for fast data ingestion and delivery—suitable for real-time applications like fraud detection, recommendation engines, etc.

---

# Kafka vs. Traditional Databases (RDBMS & NoSQL)

---

## 1. 🧩 Purpose & Use Case

| Feature            | **Kafka**                                         | **Traditional Databases (RDBMS / NoSQL)**        |
|--------------------|---------------------------------------------------|--------------------------------------------------|
| Primary Role       | Real-time data streaming and event processing     | Data storage, querying, and retrieval            |
| Usage Pattern      | Append-only log of events                         | CRUD operations (Create, Read, Update, Delete)   |
| Ideal For          | Real-time pipelines, pub/sub, data integration    | Business apps, transactional systems, analytics  |

---

## 2. 🗃️ Data Model

| Feature            | **Kafka**                           | **RDBMS / NoSQL**                                |
|--------------------|-------------------------------------|--------------------------------------------------|
| Data Format        | Key-value pairs (serialized events) | Structured (tables) / semi-structured (JSON)     |
| Schema Enforcement | Optional (Schema Registry)          | Strict (RDBMS), flexible (NoSQL)                 |

---

## 3. ⚙️ Performance Characteristics

| Feature        | **Kafka**                           | **RDBMS / NoSQL**                            |
|----------------|-------------------------------------|----------------------------------------------|
| Latency        | Sub-second, real-time               | Variable (transactional or batch-based)      |
| Throughput     | Very high (millions of events/sec)  | Lower in comparison                          |
| Concurrency    | High (many producers/consumers)     | Limited by query/load throughput             |

---

## 4. 💾 Data Storage & Retention

| Feature            | **Kafka**                               | **RDBMS / NoSQL**                            |
|--------------------|-----------------------------------------|----------------------------------------------|
| Persistence Model  | Append-only log, time/topic-based       | Mutable storage (insert, update, delete)     |
| Data Retention     | Configurable (minutes to forever)       | Persistent unless manually deleted           |

---

## 5. 🏗️ Scalability

| Feature         | **Kafka**                         | **RDBMS / NoSQL**                            |
|-----------------|-----------------------------------|----------------------------------------------|
| Scaling Model   | Horizontally (via partitions)     | RDBMS: vertical; NoSQL: horizontal           |
| Replication     | Built-in (at topic level)         | RDBMS: clustering; NoSQL: varies             |

---

## 6. 🔍 Querying

| Feature          | **Kafka**                                     | **RDBMS / NoSQL**                            |
|------------------|-----------------------------------------------|----------------------------------------------|
| Query Language   | None directly; uses Kafka Streams / KSQL      | SQL (RDBMS), proprietary/JSON-like (NoSQL)   |
| Ad-hoc Queries   | Not typical                                   | Core functionality                           |

---

## 7. 🔐 Data Integrity & Transactions

| Feature          | **Kafka**                                       | **RDBMS / NoSQL**                            |
|------------------|-------------------------------------------------|----------------------------------------------|
| ACID Compliance  | Limited (idempotent writes, per-topic TXNs)     | Strong (RDBMS), weaker in many NoSQL systems |
| Consistency Model| Eventually consistent                           | Strong (RDBMS), eventual (NoSQL)             |

---

## ✅ Summary

| Feature             | **Kafka**                          | **Traditional Databases**                   |
|---------------------|-------------------------------------|---------------------------------------------|
| Designed for        | Event streaming, messaging          | Transactional apps, data querying           |
| Data operations     | Write and consume events            | CRUD operations                             |
| Query capabilities  | Limited; external tools required    | Rich queries, indexes, joins                |
| Storage model       | Immutable logs                      | Mutable data                                |
| Real-time capability| Strong                              | Varies                                      |

---



## 🔄 Real-Time Data Processing Applications

**Use Case**: Collect and process data in real time.

**Examples**:
- Fraud detection systems  
- Real-time analytics dashboards  
- Stream processing with Apache Flink, Apache Storm, or Kafka Streams

---

## 🛒 E-commerce Platforms

**Use Case**: Track user activity and behavior in real time.

**Examples**:
- Clickstream data tracking  
- Inventory updates  
- Order and payment event handling

---

## 📈 Log Aggregation & Monitoring

**Use Case**: Centralize logs and metrics from distributed systems.

**Examples**:
- Sending logs from multiple microservices to Elasticsearch via Kafka  
- Central monitoring with Prometheus, Grafana, etc.

---

## 🏦 Banking and Financial Services

**Use Case**: Stream transaction data securely and reliably.

**Examples**:
- Real-time transaction processing  
- Risk and compliance monitoring  
- Payment gateways

---

## 📱 Messaging Applications

**Use Case**: Build scalable messaging backbones.

**Examples**:
- WhatsApp-like chat platforms  
- Notification systems  
- Real-time feeds

---

## 🏭 IoT and Sensor Data

**Use Case**: Handle data from thousands of IoT devices.

**Examples**:
- Smart homes or smart cities  
- Manufacturing monitoring systems  
- Vehicle telemetry

---

## 🧬 Healthcare Applications

**Use Case**: Stream patient data for real-time analysis.

**Examples**:
- Vital signs monitoring  
- Real-time alerting for anomalies  
- Data ingestion into health records systems

---

## 🔗 Data Integration Pipelines

**Use Case**: Connect disparate systems with Kafka as the central bus.

**Examples**:
- ETL pipelines  
- Microservices communication  
- Data lake or warehouse feeding (e.g., Kafka → Snowflake, BigQuery)

---

Kafka Producer
Kafka Cluster ( group of Kafka Brokers)
Kakfa consumer

Kafka zookeeper
kafka stream
kafka connect ( source + sink)

navigate to bin/windows in kafka folder

```bash

zookeeper-server-start.bat ..\..\config\zookeeper.properties

kafka-server-start.bat ..\..\config\server.properties

kafka-topics.bat --create --topic my-topic --bootstrap-server localhost:9092 --replication-factor 1 --partitions 3

kafka-console-producer.bat --broker-list localhost:9092 --topic my-topic

kafka-console-consumer.bat --bootstrap-server localhost:9092 --topic my-topic --from-beginning


kafka-console-producer.bat --broker-list localhost:9092 --topic my-topic --property "key.separator=-" --property "parse.key=true"

kafka-console-consumer.bat --bootstrap-server localhost:9092 --topic my-topic --from-beginning --property "key.separator=-" --property "parse.key=true"

```

## Kafka Partition and Topics
![ Kafka Partition and Topics](../img/kafka-partition-topics.png)


## How to send kafka message from cli

- two things - key and value, key is optional
- we can send message with key or without key
- when sending message with key, ordering will be maintained as they will be in the same partition
- without key we can not guarantee the ordering of message as consumer poll the message from all the partitions at the same time.


```bash
kafka-console-producer.bat --broker-list localhost:9092 --topic my-topic --property "key.separator=-" --property "parse.key=true"

kafka-console-consumer.bat --bootstrap-server localhost:9092 --topic my-topic --from-beginning --property "key.separator=-" --property "parse.key=true"

producer>>hello-apple
consumer>>apple

producer>>hello-banana
consumer>>banana

producer>>hello-kiwi
consumer>>kiwi

```

## Consumer Offset

- Position of a consumer in a specific partition of a topic
- When a consumer group reads messages from a topic, each member of the group maintains its own offset and updates it as it consumes messages.

what is
__consumer_offset
- __consumer_offset is a built-in topic in Apache Kafka that keeps track of the latest offset committed for each partition of each consumer group
- The topic is internal to the kafka cluster adn not meant to be read or written to directly by clients.
- Instead, the offset information is stored in the topic and updated by the Kafka broker to reflect the position of each consumer in each partition.
- The information in __consumer_offset is used by Kafka to maintain the reliability of the consumer groups and to ensure that messages are not lost or duplicated.
There is a separate __consumer-offsets topic created for each consumer group, So if you have 2 consumer groups containing 4 consumers each, you will have a total of 2 __consumer_offsets topics created.
- The __consumer_offsets topic is used to store the current offset of each consumer in each partition for a given consumer group. Each consumer in the group updates its own offset for the partition it is assigned in the __consumer_offsets topic, and the group coordinator uses this information to manage the assignment of partitions to consumers and to ensure that each partition is being consumed by exactly one consumer in the group.

- when a consumer joins a consumer group, it sends a join request to the group coordinator.
- The group coordinator determines which partitions the consumer should be assigned based on the number of consumers in the group and the current assignment of partitions to consumers.
- The group coordinator then sends a new assignment of partitions to the consumer, which includes the set of partitions that the consumer is responsible for consuming.
- The consumer starts consuming data from the assigned partitions.

- It is important to note that consumers in a consumer group are always assigned partitions in a "sticky" fashion, meaning that a consumer will continue to be assigned the same partitions as long as it remains in the group. This allows consumers to maintain their position in the topic and continue processing where they left off, even after a rebalance.


```js

// to list all the consumer group
kafka-console-consumer.bat --bootstrap-server localhost:9092 --list

kafka-console-consumer.bat --bootstrap-server localhost:9092 --topic my-topic --from-beginning --group console-consumer-2682

// to check the partition detail of any topic
kafka-topics.bat --describe --topic my-topic --bootstrap-server localhost:9092


```

## Understanding Segments, Commit Log, and Retention Policy


