## System Design
### High level Design
- Step 1 : Fundamentals
    1. Serverless vs Serverfull
    2. Horizontal vs Vertical Scaling
    3. Whar are threads
    4. What are pages
    5. How does the internet work
- Step 2 : Database
    1. SQL vs NoSQL DBs
    2. In-memory DBs
    3. Data Replication and Migration
    4. Data Partitioning
    5. Sharding
- Step 3 : Consistency vs Availability
    1. Data Consistency & its levels
    2. Isolation & its levels
    3. CAP Theoram
- Step 4 : Cache
    1. What is Cache (Redis, Memcached)
    2. Write Policies : write back, through & around
    3. Replacement Policies : LFU, LRU, Segmented LRU etc.
    4. Content Delivery Networks (CDN)
- Step 5 : Networking
    1. TCP vs. UDP
    2. What is http (1/2/3) & https
    3. Web sockets
    4. WebRTC & Video streaming
- Step 6 : Load Balancers
    1. Load Balancing Algorithms (Stateless & Stateful)
    2. Consistent Hashing
    3. Proxy & Reverse Proxy
    4. Rate Limiting
- Step 7 : Message Queue
    1. Asynchronous Processing (Kafka, RabbitMQ)
    2. Publisher-Subscriber Model

- Step 8 : Monoliths vs MicroServices
    1. Why Microservices
    2. Concept of "Single Point of Failure"
    3. Avoiding cascading failure
    4. Containerization (Docker)
    5. Migrating to Microservices
- Step 9 : Monitoring & Logging
    1. Logging events & monitoring metrics
    2. Anomaly Detection
- Step 10 : Security
    1. Tokens for auth
    2. SSO & OAuth
    3. Access Control List & Rule Engines
    4. Encryption
- Step 11 : System Design TradeOffs
    1. Push vs Pull architecture
    2. Consistency vs Availability
    3. SQL vs NoSQL DBs
    4. Memory vs Latency
    5. Throghput vs Latency
    6. Accuracy vs Latency
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
    1. Encapsulation
    2. Abstraction
    3. Inheritance
    4. Polymorphism
    5. SOLID Principles
        - Single Responsibility :   
        - Open-closed Principle
        - Liskov Substituion
        - Interface Segregation
        - Dependancy Inversion
- Step 2 : Design Patterns
    1. Creational (Singleton, factory etc)
    2. Structural (Proxy, Bridget etc)
    3. Behavioral (Strategy, Command, Observer etc.)

- Step 3 : Concurrency & Thread Safety
    1. Thread safe injection
    2. Locking mechanisms
    3. producer-consumer
    4. race conditions & synchronization

- Step 4 : UML Diagrams
- Step 5 : APIs
    1. API Design
    2. request/response object modeling
    3. versioning & extensibility
    4. Clean Code Principles : DRY, SRP etc
    5. Avoiding God Classes

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
