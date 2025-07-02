High-Level Application: Scalable Video Streaming Platform (Like YouTube Lite)
This app helps you understand system design, scalability, data flow, and performance under load.

🔍 What You’ll Build:
A simplified video platform where users can:

Upload videos
Stream videos
Comment and like

View video recommendations

🔧 Concepts Covered:
Step	Concept	How It’s Applied
1.	Serverless vs Serverfull	Use Lambda (upload notifications) or EC2/containers (streaming backend)
2.	SQL vs NoSQL	Metadata in PostgreSQL; comments in MongoDB
3.	CAP Theorem	Prioritize availability (AP) for video access vs consistency for comments
4.	CDN	Store video chunks on CDN (Cloudflare, Akamai)
5.	TCP vs UDP	Use TCP for UI/API; UDP for fast video streaming protocols
6.	Load Balancers	NGINX to route traffic to encoding, streaming servers
7.	Message Queue	Kafka to asynchronously process video uploads
8.	Microservices	Separate services for auth, video encoding, user data, comments
9.	Monitoring	Prometheus + Grafana for load, logs, and performance
10.	Security	Use JWT tokens, OAuth for login, rate limit abuse
11.	Trade-offs	Throughput vs latency in serving videos vs live chat

You get to see caching, CDN, rate limiting, queuing, and data modeling in action — all at once.

✅ Low-Level Application: Thread-Safe Ride Booking System (Like Uber Core)
This app helps you understand low-level concurrency, design patterns, thread safety, and clean code.

🔍 What You’ll Build:
A simple console app or backend microservice that:

- Matches riders to nearby drivers
- Handles concurrent requests
- Logs trips and locations
- Allows search by rider history

🔧 Concepts Covered:
Step	Concept	How It’s Applied
1.	OOP	Use Rider, Driver, Trip classes with encapsulation and interfaces
2.	Design Patterns	Use Factory (create trips), Singleton (dispatcher), Observer (location updates)
3.	Thread Safety	Use thread-safe queues for incoming trip requests
4.	Concurrency	Implement producer-consumer model for ride dispatching
5.	API Design	Create REST APIs for booking, cancelling, and tracking rides
6.	Clean Code	Apply DRY, SRP, and avoid God objects (e.g., a TripManager that does everything)

You'll experience race conditions, locking, threading, design decisions, and extensibility hands-on.

🚀 Want to Start Small?
For high-level, start by building just the video upload and playback system.

For low-level, just implement the trip matching algorithm with threads.