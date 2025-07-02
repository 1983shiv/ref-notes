# System Design Roadmap (12 Weeks)

1. Foundation
    - Computer Science Basics
        - Big-O Notation & Time Complexity
        - Arrays, Stacks, Queue, Linked Lists, HashMaps
        - Trees & Graphs Traversal
        - Sorting Algo (Mergs, Quick)
        - Data Structure Trade-offs
    - Networking Essentials
        - HTTP/HTTPS, TCP/IP, UDP
        - DNS Resolution
        - TCP 3 Way Handshake
        - REST APIs and Status Codes
        - Latency, Throughput, Bandwidth
    - OS Concepts
        - [Threads vs Process](#threads-vs-process)
        - CPU Scheduling & Context Switching
        - I/O Blocking & Async I/O
        - Virtual Memory & Paging
        - File Systems & Storage
    - Database
        - Relational vs NoSQL Database
        - SQL Basics & Joins
2. Core System Design
    - Load Balancing & Scaling
        - Vertical vs Horizontal Scaling
        - L4 vs L7 Load Balancers
        - DNS Based Load Balancing
        - Health Checks & Failover
        - Consistent Hashing
    - Caching System
        - Importance of Caching
        - Redis & Memcached
        - Eviction Policies (LRU, FRU, FIFO)
        - Write Strategies (Write-through, Write-back)
    - Database Deep Dive
        - Sharding & Partitioning
        - Replication Models
        - Read/Write Replicas
        - CAP Theoram & Trade-offs
        - Consistency Models
            - Eventual Consistency
            - Strong Consistency
    - Queue & Messaging
        - Message Brokers (Kafka, RabbitMQ)
        - Sync vs Async Communication
        - Pub/Sub Model
        - Delivery Guarantees & Ordering
        - Dead Letter Queues & Retries
3. Practice & Real Systems
    - Design Thinking
        - Requirement Clarification
        - BottleNeck Identification
        - Data & Control Flow
        - Stateless vs Stateful
        - Failure Handling
    - Design Patterns
        - Rate Limiting (Token, leaky Bucket)
        - Circuite Breaker & Retry Logic
        - Leader Election
        - Health Checks & Heartbeats
        - CQRS & Event Sourcing
    - Practice Questions
        - Design URL Shortner
        - Design Chat App
        - Design Youtube System
        - Design Twitter Feed
        - E-Commerce Backend
    - Final Review & Reinforcement
        - Review All Design Concepts
        - Summarize Common BottleNecks
        - FlashCards / Notes ReCap
        - Revise Patterns & Architecture
        - Deep Dive on Weak Areas



## Threads vs Process
**Process**
- System Calls are involved in Process (i.e. fork() are used to created child process)
- OS treats different process differently
- Different process have different copies of data, files, code
- Context Switching is slower
- Blocking a process
- Independent

**Threads**
- There is no system call involved
- All user level threads treated as single task for OS
- Threads share same copy of data, files, & code.
- Context switching is faster
- Blocking a thread will block entire process
- Interdependent

![ Process vs Threads](./img/process-threads.png)

