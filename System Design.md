## System Design
### High level Design
- Step 1 : Fundamentals
    1. **Serverless vs Serverfull**
        - **Serverfull (Traditional)**: You manage servers, infrastructure, OS updates, scaling
            - Example: Running a Node.js app on AWS EC2 instances
            - You handle: Server provisioning, load balancing, auto-scaling, maintenance
        - **Serverless**: Cloud provider manages infrastructure, you only provide code
            - Example: AWS Lambda functions, Vercel, Netlify Functions
            - Benefits: No server management, automatic scaling, pay-per-execution
            - Drawbacks: Cold starts, vendor lock-in, limited execution time
    
    2. **Horizontal vs Vertical Scaling**
        - **Vertical Scaling (Scale Up)**: Adding more power to existing machine
            - Example: Upgrading from 4GB to 16GB RAM, 2 cores to 8 cores
            - Pros: Simple, no code changes needed
            - Cons: Hardware limits, single point of failure, expensive
        - **Horizontal Scaling (Scale Out)**: Adding more machines
            - Example: Going from 1 server to 10 servers behind a load balancer
            - Pros: Better fault tolerance, cost-effective, nearly unlimited scaling
            - Cons: Complex architecture, data consistency challenges
    
    3. **What are threads**
        - **Thread**: Lightweight execution unit within a process
        - **Single-threaded**: JavaScript main thread - one task at a time
            ```javascript
            // Blocking operation
            const result = heavyComputation(); // Blocks entire application
            console.log(result);
            ```
        - **Multi-threaded**: Java, C++ - multiple tasks simultaneously
            ```java
            // Non-blocking with threads
            Thread worker = new Thread(() -> {
                heavyComputation(); // Runs in separate thread
            });
            worker.start(); // Main thread continues
            ```
    
    4. **What are pages**
        - **Memory Pages**: Fixed-size blocks of memory (typically 4KB)
        - **Virtual Memory**: OS technique to use disk as extended RAM
        - **Page Fault**: When requested page isn't in physical memory
            - Example: App requests data → OS checks RAM → If not found, loads from disk
        - **Paging**: Moving data between RAM and disk storage
    
    5. **How does the internet work**
        - **DNS Resolution**: Domain → IP address
            ```
            user types "google.com" → DNS server returns "142.250.191.14"
            ```
        - **TCP/IP Protocol**: Reliable data transmission
        - **HTTP Request/Response**: Client-server communication
            ```
            Client: GET /api/users HTTP/1.1
            Server: HTTP/1.1 200 OK, Content: [users data]
            ```
        - **Routing**: Data travels through multiple routers/ISPs to reach destination
- Step 2 : Database
    1. **SQL vs NoSQL DBs**
        - **SQL (Relational)**: Structured data, ACID properties, relationships
            - Examples: MySQL, PostgreSQL, Oracle
            - Use cases: Financial systems, e-commerce, complex relationships
            ```sql
            -- Structured schema
            CREATE TABLE users (
                id INT PRIMARY KEY,
                name VARCHAR(100),
                email VARCHAR(100) UNIQUE
            );
            ```
        - **NoSQL**: Flexible schema, horizontal scaling, various data models
            - Document: MongoDB, CouchDB
            - Key-Value: Redis, DynamoDB
            - Column-family: Cassandra, HBase
            - Graph: Neo4j, Amazon Neptune
            ```javascript
            // Flexible document structure
            {
                _id: "user123",
                name: "John Doe",
                email: "john@example.com",
                preferences: {
                    theme: "dark",
                    notifications: true
                }
            }
            ```
    
    2. **In-memory DBs**
        - **Definition**: Data stored in RAM for ultra-fast access
        - **Examples**: Redis, Memcached, Apache Ignite
        - **Use cases**: Caching, session storage, real-time analytics
        ```javascript
        // Redis example
        redis.set("user:123", JSON.stringify(userData));
        const user = JSON.parse(await redis.get("user:123"));
        // Access time: microseconds vs milliseconds for disk
        ```
    
    3. **Data Replication and Migration**
        - **Replication**: Copying data across multiple servers
            - Master-Slave: One write node, multiple read replicas
            - Master-Master: Multiple write nodes (conflict resolution needed)
        - **Migration**: Moving data between systems
            ```bash
            # Example: MySQL to PostgreSQL migration
            mysqldump source_db | psql target_db
            ```
    
    4. **Data Partitioning**
        - **Horizontal Partitioning**: Split rows across tables
            ```sql
            -- Users table split by region
            users_usa: users where region = 'USA'
            users_europe: users where region = 'Europe'
            ```
        - **Vertical Partitioning**: Split columns across tables
            ```sql
            -- Split user data
            user_basic: id, name, email
            user_profile: id, bio, avatar, preferences
            ```
    
    5. **Sharding**
        - **Definition**: Distributing data across multiple database servers
        - **Strategies**:
            - Range-based: user_id 1-1000 → shard1, 1001-2000 → shard2
            - Hash-based: hash(user_id) % num_shards
            - Directory-based: Lookup service maps keys to shards
        ```javascript
        // Hash-based sharding
        function getShardId(userId) {
            return hash(userId) % numberOfShards;
        }
        const shard = getShardId(user.id);
        const db = getShardConnection(shard);
        ```
- Step 3 : Consistency vs Availability
    1. **Data Consistency & its levels**
        - **Strong Consistency**: All nodes see the same data simultaneously
            - Example: Banking transactions - account balance must be accurate across all systems
            ```javascript
            // ACID properties ensure strong consistency
            BEGIN TRANSACTION
            UPDATE account SET balance = balance - 100 WHERE id = 1;
            UPDATE account SET balance = balance + 100 WHERE id = 2;
            COMMIT;
            ```
        - **Eventual Consistency**: System will become consistent over time
            - Example: Social media likes - count may vary temporarily but will sync
        - **Weak Consistency**: No guarantees when all nodes will be consistent
    
    2. **Isolation & its levels**
        - **Read Uncommitted**: Can read uncommitted changes (dirty reads)
        - **Read Committed**: Only reads committed data
        - **Repeatable Read**: Same query returns same result during transaction
        - **Serializable**: Highest isolation, transactions appear sequential
        ```sql
        -- Example: Repeatable Read
        SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
        BEGIN;
        SELECT balance FROM account WHERE id = 1; -- Returns 100
        -- Another transaction updates balance to 200
        SELECT balance FROM account WHERE id = 1; -- Still returns 100
        COMMIT;
        ```
    
    3. **CAP Theorem**
        - **Consistency**: All nodes have same data at same time
        - **Availability**: System remains operational
        - **Partition Tolerance**: System continues despite network failures
        - **Rule**: Can only guarantee 2 out of 3 simultaneously
        ```
        Examples:
        - CP System: Traditional RDBMS (MySQL with ACID)
        - AP System: Cassandra, DynamoDB
        - CA System: Single-node databases (not distributed)
        ```
- Step 4 : Cache
    1. **What is Cache (Redis, Memcached)**
        - **Definition**: Temporary storage layer for frequently accessed data
        - **Purpose**: Reduce latency and database load
        ```javascript
        // Cache-first approach
        const getCachedUser = async (userId) => {
            // Check cache first
            let user = await redis.get(`user:${userId}`);
            if (!user) {
                // Cache miss - fetch from database
                user = await database.getUser(userId);
                // Store in cache for next time
                await redis.setex(`user:${userId}`, 3600, JSON.stringify(user));
            }
            return JSON.parse(user);
        };
        ```
    
    2. **Write Policies: write back, through & around**
        - **Write-Through**: Write to cache and database simultaneously
            ```javascript
            // Write-Through
            await cache.set(key, data);
            await database.save(data); // Both operations happen
            ```
        - **Write-Back (Write-Behind)**: Write to cache first, database later
            ```javascript
            // Write-Back - faster writes, risk of data loss
            await cache.set(key, data);
            // Database write happens asynchronously later
            ```
        - **Write-Around**: Write directly to database, bypass cache
            ```javascript
            // Write-Around - for infrequently read data
            await database.save(data);
            // Cache is not updated until next read
            ```
    
    3. **Replacement Policies: LFU, LRU, Segmented LRU etc.**
        - **LRU (Least Recently Used)**: Remove least recently accessed items
        - **LFU (Least Frequently Used)**: Remove least frequently accessed items
        - **FIFO (First In, First Out)**: Remove oldest items first
        ```javascript
        // LRU Cache implementation example
        class LRUCache {
            constructor(capacity) {
                this.capacity = capacity;
                this.cache = new Map();
            }
            
            get(key) {
                if (this.cache.has(key)) {
                    // Move to end (most recent)
                    const value = this.cache.get(key);
                    this.cache.delete(key);
                    this.cache.set(key, value);
                    return value;
                }
                return null;
            }
            
            set(key, value) {
                if (this.cache.has(key)) {
                    this.cache.delete(key);
                } else if (this.cache.size >= this.capacity) {
                    // Remove least recent (first item)
                    const firstKey = this.cache.keys().next().value;
                    this.cache.delete(firstKey);
                }
                this.cache.set(key, value);
            }
        }
        ```
    
    4. **Content Delivery Networks (CDN)**
        - **Definition**: Distributed servers that deliver content from nearest location
        - **Benefits**: Reduced latency, server load distribution, better user experience
        - **Examples**: CloudFlare, AWS CloudFront, Azure CDN
        ```javascript
        // CDN usage example
        // Instead of: https://myserver.com/images/logo.png
        // Use CDN: https://cdn.mysite.com/images/logo.png
        
        // CDN automatically serves from nearest edge server:
        // User in NY → NYC edge server
        // User in London → London edge server
        ```
- Step 5 : Networking
    1. **TCP vs. UDP**
        - **TCP (Transmission Control Protocol)**: Reliable, connection-based
            - Guarantees delivery, order, and error checking
            - Use cases: Web browsing, email, file transfers
            ```javascript
            // TCP example - HTTP request
            const http = require('http');
            const server = http.createServer((req, res) => {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Hello World'); // Guaranteed delivery
            });
            ```
        - **UDP (User Datagram Protocol)**: Fast, connectionless
            - No delivery guarantee, but faster
            - Use cases: Gaming, live streaming, DNS queries
            ```javascript
            // UDP example - Simple message
            const dgram = require('dgram');
            const client = dgram.createSocket('udp4');
            client.send('Hello', 8080, 'localhost'); // Fire and forget
            ```
    
    2. **What is HTTP (1/2/3) & HTTPS**
        - **HTTP/1.1**: One request per connection, text-based
            ```
            GET /api/users HTTP/1.1
            Host: example.com
            Connection: keep-alive
            ```
        - **HTTP/2**: Multiplexing, binary protocol, server push
            ```javascript
            // Multiple requests over single connection
            fetch('/api/users');
            fetch('/api/posts'); // Both sent simultaneously
            ```
        - **HTTP/3**: Built on QUIC, faster connection establishment
        - **HTTPS**: HTTP with SSL/TLS encryption
            ```javascript
            // Certificate verification
            const https = require('https');
            https.get('https://secure-api.com/data', (res) => {
                // Encrypted connection
            });
            ```
    
    3. **Web Sockets**
        - **Definition**: Full-duplex communication over single TCP connection
        - **Use cases**: Real-time chat, live updates, gaming
        ```javascript
        // WebSocket server
        const WebSocket = require('ws');
        const wss = new WebSocket.Server({ port: 8080 });
        
        wss.on('connection', (ws) => {
            ws.on('message', (message) => {
                // Broadcast to all clients
                wss.clients.forEach(client => {
                    client.send(message);
                });
            });
        });
        
        // Client side
        const ws = new WebSocket('ws://localhost:8080');
        ws.on('message', (data) => {
            console.log('Received:', data);
        });
        ```
    
    4. **WebRTC & Video Streaming**
        - **WebRTC**: Peer-to-peer communication for audio/video
            - Direct browser-to-browser connection
            - Use cases: Video calls, file sharing
        ```javascript
        // WebRTC example - Basic setup
        const pc = new RTCPeerConnection({
            iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
        });
        
        // Get user media
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
                pc.addStream(stream);
            });
        ```
        - **Video Streaming**: HLS, DASH for adaptive bitrate
        ```javascript
        // HLS streaming example
        const video = document.querySelector('video');
        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource('stream.m3u8');
            hls.attachMedia(video);
        }
        ```
- Step 6 : Load Balancers
    1. **Load Balancing Algorithms (Stateless & Stateful)**
        - **Round Robin**: Distributes requests equally across servers
            ```javascript
            // Simple round robin implementation
            class RoundRobinBalancer {
                constructor(servers) {
                    this.servers = servers;
                    this.current = 0;
                }
                
                getNextServer() {
                    const server = this.servers[this.current];
                    this.current = (this.current + 1) % this.servers.length;
                    return server;
                }
            }
            ```
        - **Weighted Round Robin**: Assigns weights based on server capacity
        - **Least Connections**: Routes to server with fewest active connections
        - **IP Hash**: Routes based on client IP hash (sticky sessions)
        - **Health Checks**: Only routes to healthy servers
    
    2. **Consistent Hashing**
        - **Definition**: Distributes keys across nodes using hash ring
        - **Benefits**: Minimal redistribution when nodes are added/removed
        ```javascript
        // Consistent hashing example
        class ConsistentHash {
            constructor() {
                this.ring = new Map();
                this.sortedKeys = [];
            }
            
            addNode(node) {
                const hash = this.hash(node);
                this.ring.set(hash, node);
                this.sortedKeys.push(hash);
                this.sortedKeys.sort((a, b) => a - b);
            }
            
            getNode(key) {
                const hash = this.hash(key);
                for (let nodeHash of this.sortedKeys) {
                    if (hash <= nodeHash) {
                        return this.ring.get(nodeHash);
                    }
                }
                return this.ring.get(this.sortedKeys[0]);
            }
        }
        ```
    
    3. **Proxy & Reverse Proxy**
        - **Forward Proxy**: Client → Proxy → Internet (hides client identity)
            ```javascript
            // Forward proxy example
            const proxy = require('http-proxy-middleware');
            app.use('/api', proxy({
                target: 'https://api.example.com',
                changeOrigin: true
            }));
            ```
        - **Reverse Proxy**: Client → Reverse Proxy → Backend Servers
            ```nginx
            # Nginx reverse proxy configuration
            server {
                listen 80;
                location / {
                    proxy_pass http://backend_servers;
                    proxy_set_header Host $host;
                    proxy_set_header X-Real-IP $remote_addr;
                }
            }
            
            upstream backend_servers {
                server 192.168.1.10:3000;
                server 192.168.1.11:3000;
                server 192.168.1.12:3000;
            }
            ```
    
    4. **Rate Limiting**
        - **Token Bucket**: Fixed rate of token generation
            ```javascript
            // Token bucket rate limiter
            class TokenBucket {
                constructor(capacity, refillRate) {
                    this.capacity = capacity;
                    this.tokens = capacity;
                    this.refillRate = refillRate;
                    this.lastRefill = Date.now();
                }
                
                consume(tokens = 1) {
                    this.refill();
                    if (this.tokens >= tokens) {
                        this.tokens -= tokens;
                        return true;
                    }
                    return false;
                }
                
                refill() {
                    const now = Date.now();
                    const timePassed = (now - this.lastRefill) / 1000;
                    const tokensToAdd = timePassed * this.refillRate;
                    this.tokens = Math.min(this.capacity, this.tokens + tokensToAdd);
                    this.lastRefill = now;
                }
            }
            ```
        - **Sliding Window**: Rate limit based on time window
        - **Fixed Window**: Simple counter reset at intervals
- Step 7 : Message Queue
    1. **Asynchronous Processing (Kafka, RabbitMQ)**
        - **Message Queue**: Decouples producer and consumer services
        - **Benefits**: Scalability, fault tolerance, async processing
        ```javascript
        // RabbitMQ example
        const amqp = require('amqplib');
        
        // Producer
        async function publishMessage(queue, message) {
            const connection = await amqp.connect('amqp://localhost');
            const channel = await connection.createChannel();
            await channel.assertQueue(queue);
            channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
            console.log('Message sent:', message);
        }
        
        // Consumer
        async function consumeMessages(queue) {
            const connection = await amqp.connect('amqp://localhost');
            const channel = await connection.createChannel();
            await channel.assertQueue(queue);
            
            channel.consume(queue, (msg) => {
                if (msg) {
                    const data = JSON.parse(msg.content.toString());
                    console.log('Processing:', data);
                    // Process the message
                    channel.ack(msg);
                }
            });
        }
        ```
        - **Kafka**: High-throughput distributed streaming platform
        ```javascript
        // Kafka example
        const kafka = require('kafkajs');
        const client = kafka({ clientId: 'my-app', brokers: ['localhost:9092'] });
        
        // Producer
        const producer = client.producer();
        await producer.send({
            topic: 'user-events',
            messages: [{ value: JSON.stringify({ userId: 123, action: 'login' }) }]
        });
        
        // Consumer
        const consumer = client.consumer({ groupId: 'user-service' });
        await consumer.subscribe({ topic: 'user-events' });
        await consumer.run({
            eachMessage: async ({ message }) => {
                const event = JSON.parse(message.value.toString());
                console.log('Processing event:', event);
            }
        });
        ```
    
    2. **Publisher-Subscriber Model**
        - **Pattern**: Publishers send messages to topics, subscribers receive from topics
        - **Benefits**: Loose coupling, broadcasting, scalability
        ```javascript
        // Pub/Sub example with Redis
        const redis = require('redis');
        const publisher = redis.createClient();
        const subscriber = redis.createClient();
        
        // Publisher
        publisher.publish('notifications', JSON.stringify({
            type: 'email',
            recipient: 'user@example.com',
            message: 'Welcome!'
        }));
        
        // Subscriber
        subscriber.subscribe('notifications');
        subscriber.on('message', (channel, message) => {
            const notification = JSON.parse(message);
            console.log('Received notification:', notification);
            // Process notification (send email, push notification, etc.)
        });
        ```
        - **Use Cases**: Real-time notifications, event-driven architecture, microservices communication

- Step 8 : Monoliths vs MicroServices
    1. **Why Microservices**
        - **Definition**: Breaking down large application into smaller, independent services
        - **Benefits**: Independent deployment, technology diversity, team autonomy, fault isolation
        - **Challenges**: Network complexity, data consistency, monitoring overhead
        ```javascript
        // Monolith example
        class ECommerceApp {
            userService() { /* handle users */ }
            productService() { /* handle products */ }
            orderService() { /* handle orders */ }
            paymentService() { /* handle payments */ }
        }
        
        // Microservices example
        // User Service (port 3001)
        app.get('/users/:id', getUserById);
        
        // Product Service (port 3002)
        app.get('/products/:id', getProductById);
        
        // Order Service (port 3003)
        app.post('/orders', createOrder);
        ```
    
    2. **Concept of "Single Point of Failure"**
        - **Definition**: A component whose failure brings down entire system
        - **Examples**: Single database, single server, single load balancer
        - **Solutions**: Redundancy, clustering, failover mechanisms
        ```javascript
        // Bad: Single point of failure
        const database = new Database('single-db-server');
        
        // Good: Multiple database replicas
        const databases = [
            new Database('db-server-1'),
            new Database('db-server-2'),
            new Database('db-server-3')
        ];
        
        function getDatabase() {
            return databases[Math.floor(Math.random() * databases.length)];
        }
        ```
    
    3. **Avoiding Cascading Failure**
        - **Definition**: Failure in one component causing failures in dependent components
        - **Solutions**: Circuit breakers, timeouts, bulkheads, graceful degradation
        ```javascript
        // Circuit breaker pattern
        class CircuitBreaker {
            constructor(threshold = 5, resetTime = 60000) {
                this.failureCount = 0;
                this.threshold = threshold;
                this.resetTime = resetTime;
                this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
                this.nextAttempt = Date.now();
            }
            
            async call(service) {
                if (this.state === 'OPEN') {
                    if (Date.now() < this.nextAttempt) {
                        throw new Error('Circuit breaker is OPEN');
                    }
                    this.state = 'HALF_OPEN';
                }
                
                try {
                    const result = await service();
                    this.onSuccess();
                    return result;
                } catch (error) {
                    this.onFailure();
                    throw error;
                }
            }
            
            onSuccess() {
                this.failureCount = 0;
                this.state = 'CLOSED';
            }
            
            onFailure() {
                this.failureCount++;
                if (this.failureCount >= this.threshold) {
                    this.state = 'OPEN';
                    this.nextAttempt = Date.now() + this.resetTime;
                }
            }
        }
        ```
    
    4. **Containerization (Docker)**
        - **Definition**: Packaging applications with dependencies into containers
        - **Benefits**: Consistency across environments, easy deployment, resource efficiency
        ```dockerfile
        # Dockerfile example
        FROM node:16-alpine
        WORKDIR /app
        COPY package*.json ./
        RUN npm install
        COPY . .
        EXPOSE 3000
        CMD ["npm", "start"]
        ```
        ```yaml
        # Docker Compose for microservices
        version: '3.8'
        services:
          user-service:
            build: ./user-service
            ports:
              - "3001:3000"
          product-service:
            build: ./product-service
            ports:
              - "3002:3000"
          order-service:
            build: ./order-service
            ports:
              - "3003:3000"
        ```
    
    5. **Migrating to Microservices**
        - **Strangler Fig Pattern**: Gradually replace monolith components
        - **Database Decomposition**: Split shared database into service-specific databases
        - **API Gateway**: Single entry point for all microservices
        ```javascript
        // API Gateway example
        const express = require('express');
        const httpProxy = require('http-proxy-middleware');
        
        const app = express();
        
        // Route to different microservices
        app.use('/api/users', httpProxy({
            target: 'http://user-service:3001',
            changeOrigin: true
        }));
        
        app.use('/api/products', httpProxy({
            target: 'http://product-service:3002',
            changeOrigin: true
        }));
        
        app.use('/api/orders', httpProxy({
            target: 'http://order-service:3003',
            changeOrigin: true
        }));
        ```
- Step 9 : Monitoring & Logging
    1. **Logging events & monitoring metrics**
        - **Structured Logging**: Consistent log format for easier parsing
            ```javascript
            // Good structured logging
            const logger = require('winston');
            
            logger.info('User logged in', {
                userId: 123,
                timestamp: new Date().toISOString(),
                ip: '192.168.1.1',
                userAgent: 'Mozilla/5.0...'
            });
            
            // Bad: Unstructured logging
            console.log('User 123 logged in from 192.168.1.1');
            ```
        - **Centralized Logging**: ELK Stack (Elasticsearch, Logstash, Kibana)
            ```yaml
            # Docker Compose for ELK Stack
            version: '3.7'
            services:
              elasticsearch:
                image: docker.elastic.co/elasticsearch/elasticsearch:7.9.0
                environment:
                  - discovery.type=single-node
              logstash:
                image: docker.elastic.co/logstash/logstash:7.9.0
                depends_on:
                  - elasticsearch
              kibana:
                image: docker.elastic.co/kibana/kibana:7.9.0
                depends_on:
                  - elasticsearch
            ```
        - **Metrics Collection**: Prometheus + Grafana
            ```javascript
            // Prometheus metrics in Node.js
            const prometheus = require('prom-client');
            
            const httpRequestDuration = new prometheus.Histogram({
                name: 'http_request_duration_seconds',
                help: 'Duration of HTTP requests in seconds',
                labelNames: ['method', 'route', 'status']
            });
            
            app.use((req, res, next) => {
                const start = Date.now();
                res.on('finish', () => {
                    const duration = (Date.now() - start) / 1000;
                    httpRequestDuration
                        .labels(req.method, req.route?.path || req.path, res.statusCode)
                        .observe(duration);
                });
                next();
            });
            ```
        - **Application Performance Monitoring (APM)**: New Relic, DataDog, AppDynamics
            ```javascript
            // New Relic setup
            require('newrelic');
            
            // Custom metrics
            const newrelic = require('newrelic');
            newrelic.recordMetric('Custom/Database/QueryTime', queryTime);
            ```
    
    2. **Anomaly Detection**
        - **Statistical Methods**: Detecting deviations from normal patterns
            ```javascript
            // Simple anomaly detection
            class AnomalyDetector {
                constructor(threshold = 2) {
                    this.values = [];
                    this.threshold = threshold;
                }
                
                addValue(value) {
                    this.values.push(value);
                    if (this.values.length > 100) {
                        this.values.shift(); // Keep only last 100 values
                    }
                }
                
                isAnomaly(value) {
                    if (this.values.length < 10) return false;
                    
                    const mean = this.values.reduce((a, b) => a + b) / this.values.length;
                    const variance = this.values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / this.values.length;
                    const stdDev = Math.sqrt(variance);
                    
                    return Math.abs(value - mean) > this.threshold * stdDev;
                }
            }
            
            // Usage
            const detector = new AnomalyDetector();
            if (detector.isAnomaly(responseTime)) {
                logger.warn('Anomalous response time detected', { responseTime });
            }
            ```
        - **Machine Learning**: Using algorithms to learn normal patterns
            ```python
            # Example with scikit-learn
            from sklearn.ensemble import IsolationForest
            import numpy as np
            
            # Train model on normal data
            normal_data = np.array([[cpu_usage, memory_usage, response_time]])
            model = IsolationForest(contamination=0.1)
            model.fit(normal_data)
            
            # Detect anomalies
            new_data = np.array([[90, 85, 5000]])  # High values
            anomaly_score = model.decision_function(new_data)
            is_anomaly = model.predict(new_data) == -1
            ```
        - **Real-time Alerting**: Immediate notification of anomalies
            ```javascript
            // Real-time alerting with Slack
            const { WebClient } = require('@slack/web-api');
            const slack = new WebClient(process.env.SLACK_TOKEN);
            
            async function sendAlert(message, severity = 'warning') {
                await slack.chat.postMessage({
                    channel: '#alerts',
                    text: `🚨 ${severity.toUpperCase()}: ${message}`,
                    attachments: [{
                        color: severity === 'critical' ? 'danger' : 'warning',
                        fields: [{
                            title: 'Timestamp',
                            value: new Date().toISOString(),
                            short: true
                        }]
                    }]
                });
            }
            
            // Usage
            if (errorRate > 0.05) {
                await sendAlert('Error rate exceeded 5%', 'critical');
            }
            ```
- Step 10 : Security
    1. **Tokens for Authentication**
        - **JWT (JSON Web Tokens)**: Self-contained tokens with user info
            ```javascript
            // JWT Creation and Verification
            const jwt = require('jsonwebtoken');
            
            // Create token
            const token = jwt.sign(
                { userId: 123, email: 'user@example.com' },
                'secret-key',
                { expiresIn: '24h' }
            );
            
            // Verify token
            const verifyToken = (req, res, next) => {
                const token = req.headers.authorization?.split(' ')[1];
                try {
                    const decoded = jwt.verify(token, 'secret-key');
                    req.user = decoded;
                    next();
                } catch (error) {
                    res.status(401).json({ error: 'Invalid token' });
                }
            };
            ```
        - **Session Tokens**: Server-side stored tokens
            ```javascript
            // Session-based authentication
            const session = require('express-session');
            
            app.use(session({
                secret: 'session-secret',
                resave: false,
                saveUninitialized: false,
                cookie: { secure: true, maxAge: 24 * 60 * 60 * 1000 } // 24 hours
            }));
            
            // Login endpoint
            app.post('/login', (req, res) => {
                // Validate credentials
                if (validCredentials) {
                    req.session.userId = user.id;
                    res.json({ message: 'Logged in successfully' });
                }
            });
            ```
    
    2. **SSO & OAuth**
        - **Single Sign-On**: One login for multiple applications
        - **OAuth 2.0**: Authorization framework for third-party access
            ```javascript
            // OAuth 2.0 with Google
            const passport = require('passport');
            const GoogleStrategy = require('passport-google-oauth20').Strategy;
            
            passport.use(new GoogleStrategy({
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: "/auth/google/callback"
            }, (accessToken, refreshToken, profile, done) => {
                // Save user profile to database
                User.findOrCreate({ googleId: profile.id }, (err, user) => {
                    return done(err, user);
                });
            }));
            
            // Routes
            app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
            app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
                res.redirect('/dashboard');
            });
            ```
    
    3. **Access Control List & Rule Engines**
        - **Role-Based Access Control (RBAC)**: Permissions based on user roles
            ```javascript
            // RBAC Implementation
            class AccessControl {
                constructor() {
                    this.roles = {
                        admin: ['create', 'read', 'update', 'delete'],
                        editor: ['create', 'read', 'update'],
                        viewer: ['read']
                    };
                }
                
                hasPermission(userRole, action) {
                    return this.roles[userRole]?.includes(action) || false;
                }
                
                authorize(requiredPermission) {
                    return (req, res, next) => {
                        const userRole = req.user.role;
                        if (this.hasPermission(userRole, requiredPermission)) {
                            next();
                        } else {
                            res.status(403).json({ error: 'Access denied' });
                        }
                    };
                }
            }
            
            // Usage
            const ac = new AccessControl();
            app.delete('/users/:id', ac.authorize('delete'), deleteUser);
            ```
        - **Attribute-Based Access Control (ABAC)**: Fine-grained permissions
            ```javascript
            // ABAC Rule Engine
            class RuleEngine {
                constructor() {
                    this.rules = [
                        {
                            resource: 'document',
                            action: 'read',
                            condition: (user, resource) => user.department === resource.department
                        },
                        {
                            resource: 'document',
                            action: 'delete',
                            condition: (user, resource) => user.id === resource.ownerId || user.role === 'admin'
                        }
                    ];
                }
                
                evaluate(user, resource, action) {
                    const rule = this.rules.find(r => r.resource === resource.type && r.action === action);
                    return rule ? rule.condition(user, resource) : false;
                }
            }
            ```
    
    4. **Encryption**
        - **Symmetric Encryption**: Same key for encrypt/decrypt
            ```javascript
            // AES Encryption
            const crypto = require('crypto');
            
            class SymmetricEncryption {
                constructor(key) {
                    this.key = key;
                    this.algorithm = 'aes-256-gcm';
                }
                
                encrypt(text) {
                    const iv = crypto.randomBytes(16);
                    const cipher = crypto.createCipher(this.algorithm, this.key, iv);
                    
                    let encrypted = cipher.update(text, 'utf8', 'hex');
                    encrypted += cipher.final('hex');
                    
                    const authTag = cipher.getAuthTag();
                    return {
                        encrypted,
                        iv: iv.toString('hex'),
                        authTag: authTag.toString('hex')
                    };
                }
                
                decrypt(encryptedData) {
                    const decipher = crypto.createDecipher(this.algorithm, this.key, Buffer.from(encryptedData.iv, 'hex'));
                    decipher.setAuthTag(Buffer.from(encryptedData.authTag, 'hex'));
                    
                    let decrypted = decipher.update(encryptedData.encrypted, 'hex', 'utf8');
                    decrypted += decipher.final('utf8');
                    return decrypted;
                }
            }
            ```
        - **Asymmetric Encryption**: Public-private key pairs
            ```javascript
            // RSA Encryption
            const crypto = require('crypto');
            
            // Generate key pair
            const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
                modulusLength: 2048,
                publicKeyEncoding: { type: 'spki', format: 'pem' },
                privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
            });
            
            // Encrypt with public key
            function encrypt(text, publicKey) {
                return crypto.publicEncrypt(publicKey, Buffer.from(text)).toString('base64');
            }
            
            // Decrypt with private key
            function decrypt(encryptedText, privateKey) {
                return crypto.privateDecrypt(privateKey, Buffer.from(encryptedText, 'base64')).toString();
            }
            ```
        - **Hashing**: One-way encryption for passwords
            ```javascript
            // Password Hashing with bcrypt
            const bcrypt = require('bcrypt');
            
            // Hash password
            async function hashPassword(password) {
                const saltRounds = 12;
                return await bcrypt.hash(password, saltRounds);
            }
            
            // Verify password
            async function verifyPassword(password, hashedPassword) {
                return await bcrypt.compare(password, hashedPassword);
            }
            
            // Usage in registration
            app.post('/register', async (req, res) => {
                const hashedPassword = await hashPassword(req.body.password);
                const user = new User({
                    email: req.body.email,
                    password: hashedPassword
                });
                await user.save();
            });
            ```
- Step 11 : System Design TradeOffs
    1. **Push vs Pull architecture**
        - **Push Model**: Server actively sends data to clients
            - Examples: WebSocket notifications, server-sent events
            - Pros: Real-time updates, immediate delivery
            - Cons: Server overhead, connection management
            ```javascript
            // Push example - WebSocket
            wss.on('connection', (ws) => {
                // Push data immediately when available
                newDataEvent.on('data', (data) => {
                    ws.send(JSON.stringify(data));
                });
            });
            ```
        - **Pull Model**: Client requests data from server
            - Examples: HTTP polling, REST API calls
            - Pros: Simple implementation, client controls timing
            - Cons: Potential delays, unnecessary requests
            ```javascript
            // Pull example - Polling
            setInterval(async () => {
                const data = await fetch('/api/updates');
                updateUI(data);
            }, 5000); // Poll every 5 seconds
            ```
    
    2. **Consistency vs Availability**
        - **Strong Consistency**: All nodes have same data
            - Use case: Banking systems, financial transactions
            - Trade-off: May sacrifice availability during network partitions
        - **Eventual Consistency**: Data will sync eventually
            - Use case: Social media feeds, content distribution
            - Trade-off: Temporary inconsistencies for higher availability
    
    3. **SQL vs NoSQL DBs**
        - **SQL**: ACID compliance, complex queries, relationships
            - Best for: Financial systems, structured data
            - Trade-off: Vertical scaling limits, rigid schema
        - **NoSQL**: Horizontal scaling, flexible schema
            - Best for: Big data, real-time applications
            - Trade-off: Limited query capabilities, eventual consistency
    
    4. **Memory vs Latency**
        - **More Memory**: Cache more data for faster access
            - Trade-off: Higher costs, memory management overhead
        - **Less Memory**: Lower costs but higher latency
            - Trade-off: More database/disk access, slower responses
    
    5. **Throughput vs Latency**
        - **High Throughput**: Process many requests per second
            - Achieved through: Batching, async processing
            - Trade-off: Individual request latency may increase
        - **Low Latency**: Fast response for individual requests
            - Achieved through: Caching, CDNs, optimized queries
            - Trade-off: May limit overall system throughput
    
    6. **Accuracy vs Latency**
        - **High Accuracy**: Complex algorithms, multiple validations
            - Use case: Medical diagnosis systems, fraud detection
            - Trade-off: Slower response times
        - **Fast Response**: Simplified algorithms, approximations
            - Use case: Search suggestions, recommendation systems
            - Trade-off: May sacrifice some accuracy
- Step 12: Practice, Practice, Practice
    1. Youtube
    2. Twitter
    3. WhatsApp
    4. Uber
    5. Amazon
    6. Dropbox/Google Drive
    7. Netflix
    8. Instagram
    9. Zoom
    10. Booking.com/Airbnb

### Low level Design        
- Step 1 : Object Oriented Programming
    1. **Encapsulation**
        - **Definition**: Bundling data and methods that operate on that data within a single unit
        - **Benefits**: Data hiding, controlled access, maintainability
        ```javascript
        // Encapsulation example
        class BankAccount {
            #balance; // Private field
            
            constructor(initialBalance) {
                this.#balance = initialBalance;
            }
            
            // Public methods to access private data
            getBalance() {
                return this.#balance;
            }
            
            deposit(amount) {
                if (amount > 0) {
                    this.#balance += amount;
                }
            }
            
            withdraw(amount) {
                if (amount > 0 && amount <= this.#balance) {
                    this.#balance -= amount;
                    return true;
                }
                return false;
            }
        }
        ```
    
    2. **Abstraction**
        - **Definition**: Hiding complex implementation details while showing only essential features
        - **Benefits**: Simplified interface, reduced complexity, easier maintenance
        ```javascript
        // Abstraction example
        class DatabaseConnection {
            connect() {
                // Abstract method - subclasses must implement
                throw new Error('connect() must be implemented');
            }
            
            query(sql) {
                // Abstract method
                throw new Error('query() must be implemented');
            }
        }
        
        class MySQLConnection extends DatabaseConnection {
            connect() {
                // Specific MySQL connection logic
                console.log('Connected to MySQL');
            }
            
            query(sql) {
                // MySQL-specific query implementation
                console.log(`Executing MySQL query: ${sql}`);
            }
        }
        ```
    
    3. **Inheritance**
        - **Definition**: Creating new classes based on existing classes
        - **Benefits**: Code reusability, hierarchical classification, polymorphism
        ```javascript
        // Inheritance example
        class Animal {
            constructor(name, species) {
                this.name = name;
                this.species = species;
            }
            
            makeSound() {
                console.log('Some generic animal sound');
            }
            
            move() {
                console.log(`${this.name} is moving`);
            }
        }
        
        class Dog extends Animal {
            constructor(name, breed) {
                super(name, 'Canine');
                this.breed = breed;
            }
            
            makeSound() {
                console.log('Woof! Woof!');
            }
            
            fetch() {
                console.log(`${this.name} is fetching the ball`);
            }
        }
        ```
    
    4. **Polymorphism**
        - **Definition**: Same interface, different implementations
        - **Benefits**: Flexibility, extensibility, maintainability
        ```javascript
        // Polymorphism example
        class Shape {
            calculateArea() {
                throw new Error('calculateArea() must be implemented');
            }
        }
        
        class Circle extends Shape {
            constructor(radius) {
                super();
                this.radius = radius;
            }
            
            calculateArea() {
                return Math.PI * this.radius * this.radius;
            }
        }
        
        class Rectangle extends Shape {
            constructor(width, height) {
                super();
                this.width = width;
                this.height = height;
            }
            
            calculateArea() {
                return this.width * this.height;
            }
        }
        
        // Polymorphic usage
        function printArea(shape) {
            console.log(`Area: ${shape.calculateArea()}`);
        }
        
        printArea(new Circle(5));      // Area: 78.54
        printArea(new Rectangle(4, 6)); // Area: 24
        ```
    
    5. **SOLID Principles**
        - **Single Responsibility**: Each class should have only one reason to change
            ```javascript
            // Bad: Multiple responsibilities
            class User {
                constructor(name, email) {
                    this.name = name;
                    this.email = email;
                }
                
                save() {
                    // Database logic
                }
                
                sendEmail() {
                    // Email logic
                }
            }
            
            // Good: Separated responsibilities
            class User {
                constructor(name, email) {
                    this.name = name;
                    this.email = email;
                }
            }
            
            class UserRepository {
                save(user) {
                    // Database logic
                }
            }
            
            class EmailService {
                sendEmail(user, message) {
                    // Email logic
                }
            }
            ```
        
        - **Open-Closed Principle**: Open for extension, closed for modification
            ```javascript
            // Good: Extensible without modification
            class PaymentProcessor {
                process(payment, method) {
                    return method.processPayment(payment);
                }
            }
            
            class CreditCardPayment {
                processPayment(amount) {
                    return `Processing $${amount} via Credit Card`;
                }
            }
            
            class PayPalPayment {
                processPayment(amount) {
                    return `Processing $${amount} via PayPal`;
                }
            }
            ```
        
        - **Liskov Substitution**: Subtypes must be substitutable for their base types
        - **Interface Segregation**: Clients shouldn't depend on interfaces they don't use
        - **Dependency Inversion**: Depend on abstractions, not concretions
- Step 2 : Design Patterns
    1. **Creational Patterns**
        - **Singleton**: Ensures only one instance of a class exists
            ```javascript
            class DatabaseConnection {
                constructor() {
                    if (DatabaseConnection.instance) {
                        return DatabaseConnection.instance;
                    }
                    this.connection = this.createConnection();
                    DatabaseConnection.instance = this;
                    return this;
                }
                
                createConnection() {
                    return { connected: true };
                }
            }
            ```
        - **Factory**: Creates objects without specifying exact classes
            ```javascript
            class VehicleFactory {
                static createVehicle(type) {
                    switch(type) {
                        case 'car': return new Car();
                        case 'truck': return new Truck();
                        default: throw new Error('Unknown vehicle type');
                    }
                }
            }
            ```
    
    2. **Structural Patterns**
        - **Proxy**: Provides placeholder/surrogate for another object
            ```javascript
            class ImageProxy {
                constructor(filename) {
                    this.filename = filename;
                    this.image = null;
                }
                
                display() {
                    if (!this.image) {
                        console.log('Loading image...');
                        this.image = new RealImage(this.filename);
                    }
                    this.image.display();
                }
            }
            ```
        - **Adapter**: Allows incompatible interfaces to work together
            ```javascript
            class LegacyPrinter {
                oldPrint(text) {
                    console.log(`Legacy: ${text}`);
                }
            }
            
            class PrinterAdapter {
                constructor(legacyPrinter) {
                    this.legacyPrinter = legacyPrinter;
                }
                
                print(text) {
                    this.legacyPrinter.oldPrint(text);
                }
            }
            ```
    
    3. **Behavioral Patterns**
        - **Strategy**: Defines family of algorithms, makes them interchangeable
            ```javascript
            class PaymentContext {
                constructor(strategy) {
                    this.strategy = strategy;
                }
                
                pay(amount) {
                    return this.strategy.pay(amount);
                }
            }
            
            class CreditCardStrategy {
                pay(amount) {
                    return `Paid $${amount} using Credit Card`;
                }
            }
            
            class PayPalStrategy {
                pay(amount) {
                    return `Paid $${amount} using PayPal`;
                }
            }
            ```
        - **Observer**: Notifies multiple objects about state changes
            ```javascript
            class Subject {
                constructor() {
                    this.observers = [];
                }
                
                addObserver(observer) {
                    this.observers.push(observer);
                }
                
                notify(data) {
                    this.observers.forEach(observer => observer.update(data));
                }
            }
            
            class Observer {
                update(data) {
                    console.log('Received update:', data);
                }
            }
            ```
        - **Command**: Encapsulates requests as objects
            ```javascript
            class RemoteControl {
                constructor() {
                    this.commands = {};
                }
                
                setCommand(slot, command) {
                    this.commands[slot] = command;
                }
                
                pressButton(slot) {
                    if (this.commands[slot]) {
                        this.commands[slot].execute();
                    }
                }
            }
            
            class LightOnCommand {
                constructor(light) {
                    this.light = light;
                }
                
                execute() {
                    this.light.turnOn();
                }
            }
            ```

- Step 3 : Concurrency & Thread Safety
    1. **Thread Safe Injection**
        - **Definition**: Ensuring shared resources are accessed safely by multiple threads
        - **Techniques**: Synchronization, locks, atomic operations
        ```java
        // Java example with synchronized methods
        public class Counter {
            private int count = 0;
            
            // Thread-safe increment
            public synchronized void increment() {
                count++;
            }
            
            // Thread-safe getter
            public synchronized int getCount() {
                return count;
            }
        }
        ```
    
    2. **Locking Mechanisms**
        - **Mutex**: Mutual exclusion lock for single thread access
        - **ReadWrite Lock**: Multiple readers, single writer
        - **Semaphore**: Controls access to limited resources
        ```java
        // ReentrantLock example
        import java.util.concurrent.locks.ReentrantLock;
        
        public class BankAccount {
            private double balance;
            private final ReentrantLock lock = new ReentrantLock();
            
            public void withdraw(double amount) {
                lock.lock();
                try {
                    if (balance >= amount) {
                        balance -= amount;
                    }
                } finally {
                    lock.unlock();
                }
            }
        }
        ```
    
    3. **Producer-Consumer Pattern**
        - **Definition**: Producers generate data, consumers process it
        - **Implementation**: Using queues and synchronization
        ```java
        // Producer-Consumer with BlockingQueue
        import java.util.concurrent.BlockingQueue;
        import java.util.concurrent.LinkedBlockingQueue;
        
        class Producer implements Runnable {
            private BlockingQueue<String> queue;
            
            public void run() {
                try {
                    queue.put("data"); // Blocks if queue is full
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        }
        
        class Consumer implements Runnable {
            private BlockingQueue<String> queue;
            
            public void run() {
                try {
                    String data = queue.take(); // Blocks if queue is empty
                    process(data);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        }
        ```
    
    4. **Race Conditions & Synchronization**
        - **Race Condition**: When multiple threads access shared data simultaneously
        - **Solutions**: Synchronization primitives, atomic operations
        ```java
        // Race condition example
        public class RaceCondition {
            private static int counter = 0;
            
            // Unsafe - race condition
            public static void unsafeIncrement() {
                counter++; // Not atomic: read, increment, write
            }
            
            // Safe - using AtomicInteger
            private static AtomicInteger atomicCounter = new AtomicInteger(0);
            
            public static void safeIncrement() {
                atomicCounter.incrementAndGet(); // Atomic operation
            }
        }
        ```

- Step 4 : UML Diagrams
    - **Class Diagrams**: Show relationships between classes
        ```
        ┌─────────────────┐
        │     User        │
        ├─────────────────┤
        │ - id: String    │
        │ - name: String  │
        │ - email: String │
        ├─────────────────┤
        │ + login()       │
        │ + logout()      │
        └─────────────────┘
        ```
    - **Sequence Diagrams**: Show interaction flow over time
    - **Use Case Diagrams**: Show system functionality from user perspective
    - **Activity Diagrams**: Show workflow and decision points

- Step 5 : APIs
    1. **API Design**
        - **RESTful Principles**: Resource-based URLs, HTTP methods
            ```javascript
            // Good RESTful API design
            GET    /users          // Get all users
            GET    /users/123      // Get specific user
            POST   /users          // Create new user
            PUT    /users/123      // Update user
            DELETE /users/123      // Delete user
            ```
    2. **Request/Response Object Modeling**
        - **Consistent Structure**: Standard format for all responses
            ```javascript
            // Response format
            {
                "success": true,
                "data": {
                    "user": {
                        "id": 123,
                        "name": "John Doe",
                        "email": "john@example.com"
                    }
                },
                "message": "User retrieved successfully",
                "timestamp": "2023-01-01T00:00:00Z"
            }
            ```
    3. **Versioning & Extensibility**
        - **URL Versioning**: `/api/v1/users`, `/api/v2/users`
        - **Header Versioning**: `Accept: application/vnd.api+json;version=1`
    4. **Clean Code Principles: DRY, SRP etc**
        - **DRY**: Don't Repeat Yourself
        - **SRP**: Single Responsibility Principle
        - **KISS**: Keep It Simple, Stupid
    5. **Avoiding God Classes**
        - **Split Large Classes**: Break into smaller, focused classes
        - **Single Responsibility**: Each class should have one purpose

- Step 6 : Common LLD Problems
    1. Design a Tic tac toe or chess game
    2. Design a Splitwise App
    3. Design a Parking lot
    4. Design an Elevator System with multiple lifts
    5. Design a Notification system
    6. Design a Food delivery app
    7. Design a Movie ticket booking system
    8. Design a URL shortner
    9. Design a Logging Framework
    10. Design a Rate Limiter
