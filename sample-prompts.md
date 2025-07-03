## Prompt to Generate Kafka + TypeScript Example

```yaml
Write a real-world TypeScript example that demonstrates how to use Apache Kafka for a real-time event streaming scenario.

The example should illustrate:
- A Kafka **producer** simulating real-time events such as user activity (clicks, page views, scrolls) or financial transactions.
- A Kafka **consumer** that listens to these events and processes them (e.g., logs them, filters suspicious ones, or pushes them to a monitoring system).
- The setup should include a Kafka topic (e.g., `user-activity` or `transactions`).
- Use the `kafkajs` library for Kafka integration in TypeScript.
- Include realistic data (e.g., random user IDs, timestamps, actions, or transaction amounts).
- Add comments in the code to explain each step for educational purposes.
- Ensure the code is beginner-friendly and runnable with a local Kafka setup (e.g., Docker).

```

## Sample Output You Can Expect
1. producer.ts – Sends simulated real-time events to Kafka
```js
// product.ts

// Simulates user activity
import { Kafka } from "kafkajs";

const kafka = new Kafka({ clientId: "activity-producer", brokers: ["localhost:9092"] });
const producer = kafka.producer();

async function produceActivity() {
  await producer.connect();

  setInterval(async () => {
    const event = {
      userId: `user_${Math.floor(Math.random() * 1000)}`,
      action: ["click", "view", "scroll"][Math.floor(Math.random() * 3)],
      timestamp: new Date().toISOString()
    };

    await producer.send({
      topic: "user-activity",
      messages: [{ value: JSON.stringify(event) }]
    });

    console.log("Produced:", event);
  }, 1000);
}

produceActivity().catch(console.error);

```
2. consumer.ts – Processes and prints incoming events

```js
import { Kafka } from "kafkajs";

const kafka = new Kafka({ clientId: "activity-consumer", brokers: ["localhost:9092"] });
const consumer = kafka.consumer({ groupId: "activity-group" });

async function consumeActivity() {
  await consumer.connect();
  await consumer.subscribe({ topic: "user-activity", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const activity = JSON.parse(message.value!.toString());

      console.log("Consumed:", activity);

      // Example fraud logic: suspicious if action is "click" repeatedly from same user
      if (activity.action === "click") {
        // Insert custom fraud detection logic here
      }
    }
  });
}

consumeActivity().catch(console.error);

```


## Prompt: Compare Traditional DB vs Kafka for Real-Time Event Streaming in TypeScript

```yaml

Create a TypeScript project that demonstrates the challenges of using traditional databases (RDBMS or NoSQL) for real-time event streaming and how Apache Kafka solves those issues.

The project should include two parts:

---

### Part 1: Using a Traditional Database (e.g., MongoDB or PostgreSQL)
- Simulate real-time events like user activity (clicks, views, scrolls) or financial transactions using a TypeScript script.
- Insert each event into a traditional database as it occurs (one write per event).
- Show/log performance bottlenecks or inefficiencies:
  - Slow inserts when event rate increases
  - No native support for real-time stream processing
  - Complex logic needed to query new data as it arrives
- Include meaningful comments and logs to help students understand what's going wrong or why this approach is not scalable.

---

### Part 2: Solving It with Kafka
- Use the `kafkajs` library to implement:
  - A **Kafka producer** that generates the same events in real-time
  - A **Kafka consumer** that processes and logs each event
- Highlight Kafka’s strengths:
  - Handles high throughput of events easily
  - Decouples data producers from consumers
  - Enables real-time stream processing
  - Retains events for replay/audit
- Use realistic data: random user IDs, timestamps, actions, transaction amounts.
- Include clear comments explaining each line for educational purposes.

---

### Requirements:
- Use TypeScript for all scripts.
- Keep the code simple and beginner-friendly.
- Make it runnable with a local Kafka instance (e.g., via Docker).
- Use console logs to highlight differences in performance or architecture.
- (Optional) Add a README explaining the purpose of each part for teaching.

The goal is to teach students why traditional databases are not suitable for high-speed event ingestion and how Kafka is a better fit for such real-time use cases.


```