# Frontend System Design Interview (QnA)

Here is a detailed breakdown of the questions and answers discussed in the "Frontend System Design Interview (Build Instagram)" video, presented with additional conceptual code examples where relevant. Please note that **the original source material does not contain any code examples**. All code snippets provided below are illustrative JS/TS examples added to enhance your understanding of the discussed concepts and should be independently verified as they are outside the scope of the original source.

***

### System Design Interview: Instagram Feed Feature (Frontend Focus)

The interview follows a **four-step framework** for solving system design problems:
1.  **Requirements Analysis**
2.  **Building the Minimum Viable System (MVS)**
3.  **Scaling the System**
4.  **Scaling Individual Components**

The video also highlights **five common mistakes developers make** in system design interviews:
1.  **Assuming too much and not clarifying requirements**.
2.  **Not getting enough buy-in from the interviewer**.
3.  **Running out of things to say (not being proactive)**.
4.  **Talking about things they don't know**.
5.  **Being too implementation-focused (missing the big picture)**.

---

### 1. Requirements Analysis

This initial phase focuses on understanding the problem and going from ambiguous requirements to concrete system specifications. The key is to ask clarifying questions.

*   **Task:** Design a social media feed feature with a **focus exclusively on the feed**. Comments and likes are out of scope.
*   **Q: Are we focusing on the mobile app or the web app use case?**
    *   **A: The web side of the app**.
*   **Q: What are the features needed from the feed?**
    *   **A: Different posts, including images with descriptions.** Video is out of scope for now.
*   **Q: Do I need to care about buttons, likes, comments, or share buttons?**
    *   **A: No, these are out of scope.** This simplifies things significantly.
*   **Q: How many users do we anticipate for this application?**
    *   **A: Assume 1 million daily active users (DAU)**.
*   **Q: How many posts will each user create daily?**
    *   **A: Around one daily post per user**.
*   **Q: How many posts do users typically consume or scroll through?**
    *   **A: Assume they will consume around 100 posts**.
*   **Q: Is there any pattern to user login or activity (e.g., seasonality, peak traffic)?**
    *   **A: Yes, there are two peak traffic moments**: around **1 PM** (lunchtime) and **9 PM** (evening).
    *   **Peak time definition:** Around **70% of the users are active at the same time**. This means **700,000 active users at peak** (70% of 1 million DAU).
*   **Q: Do we have any information about the size of the images?**
    *   **A: On average, 1 Megabyte (MB)**.

**Key Data Derived from Requirements:**
*   **Read-to-Write Ratio:** There is a significant asymmetry, with a lot more reads than writes. Approximately **100 reads for every 1 write** (100:1 read-to-write ratio).
*   **Peak Load Calculation (Rough Numbers):**
    *   Peak active users: 700,000.
    *   Posts consumed per user: 100.
    *   Total post reads at peak: 700,000 users * 100 posts/user = 70,000,000 reads.
    *   Assumed peak window: 2 hours (e.g., 8 PM to 10 PM).
    *   Seconds in 2 hours: 2 * 60 * 60 = 7,200 seconds.
    *   **Requests Per Second (RPS) at peak:** 70,000,000 reads / 7,200 seconds ≈ **10,000 RPS**.
    *   **Data Throughput Issue:** Downloading 100 1MB images per user over a 2-hour window will lead to significant data throughput.

---

### 2. Building the Minimum Viable System (MVS)

This step involves putting together the minimum number of parts to satisfy the initial requirements, without over-optimising for scale yet.

*   **Goal:** Draft a first version of the system.
*   **Core Components Identified:**
    *   **Web App:** This is the client-side application where users will interact with the feed and experience the scrolling.
    *   **Feed Service (Backend):** A backend service responsible for managing the feed data, including image URLs, titles, and descriptions.
    *   **Image Blob Storage:** A highly scalable cloud service (e.g., AWS S3, Azure Blob Storage) to store the actual image files. The Feed Service will persist images here, and the Web App will retrieve them via URLs provided by the Feed Service.
    *   **Database:** To store post metadata (e.g., creation time, description). A **NoSQL database** is initially preferred due to its scalability and the lack of complex relational data in this use case.

**Conceptual NoSQL Data Model Example (MongoDB):**

```json
// --- Start of external code example ---
// This is not from the source.

// Example Document for a Post in a NoSQL (e.g., MongoDB) database
{
  "_id": "post_id_12345", // Unique identifier for the post
  "userId": "user_id_ABCDE", // ID of the user who created the post
  "imageUrl": "https://example.com/images/post_image_123.jpg", // URL to the image in blob storage
  "description": "A beautiful sunset view from my balcony.",
  "createdAt": ISODate("2023-10-27T14:30:00.000Z"), // Timestamp of creation
  "tags": ["sunset", "nature", "travel"] // Optional: tags for searching/categorisation
}

// --- End of external code example ---
```

---

### 3. Scaling the System

Once the MVS is in place, the focus shifts to how to scale it to handle the calculated load and traffic patterns.

*   **Identified Peak Load:** Approximately **10,000 requests per second (RPS)**.
*   **Q: Do we have any data on geography (user distribution)?**
    *   **A: Assume users are primarily based in the US, especially in cities with higher population density.** For simplicity, assume a single timezone like the East Coast for peak calculations.

**Scaling Strategies:**

1.  **Client-Side Scaling with CDNs:**
    *   **Content Delivery Network (CDN) for the Web App:** Distributes static assets (JavaScript, CSS) closer to users globally. This significantly improves load times, enhances scalability, and increases availability by removing single points of failure.
    *   **CDN for Image Storage:** Similar to the web app CDN, this distributes image assets closer to users, reducing latency and offloading traffic from the main image storage.

    **Conceptual JS/TS Relevance (CDN):**
    While CDNs are infrastructure, frontend build tools (like Webpack with `output.publicPath`) are configured to point to CDN URLs for static assets. Images stored in blob storage are directly accessed via their CDN-served URLs.

2.  **Service Separation (Read/Write Separation):**
    *   Leveraging the **100:1 read-to-write ratio**, the **Feed Service is separated into a Read Feed Service and a Write Feed Service**.
    *   **Read Feed Service:** Handles the majority of the traffic. It will likely be a **fleet of instances behind a load balancer** to allow for **horizontal scaling** (adding more servers as needed).
    *   **Write Feed Service:** Handles post creation. It will experience much lower load compared to the read service, thus requiring fewer instances.

    **Conceptual JS/TS Relevance (Backend Service Separation):**
    This separation often involves distinct microservices or different endpoints/functions within a single service.

    ```typescript
    // --- Start of external code example ---
    // This is not from the source.

    // Example conceptual structure for a Node.js/Express backend
    // This demonstrates how a load balancer might route requests
    // to separate read and write services.

    // In a microservices architecture, these would be separate applications.
    // For a monolithic application, it could be separate routing/controllers.

    // Simplified Read Feed Service endpoint
    // Handles fetching posts for the feed.
    // This service would be behind a Load Balancer.
    app.get('/api/feed/posts', async (req: Request, res: Response) => {
      try {
        const { cursor, limit = 10 } = req.query;
        // Logic to fetch posts based on cursor
        const posts = await PostModel.find({ _id: { $gt: cursor } }).limit(Number(limit)).lean();
        res.status(200).json({ posts, nextCursor: posts[posts.length - 1]?._id });
      } catch (error) {
        console.error('Error fetching feed:', error);
        res.status(500).send('Internal Server Error');
      }
    });

    // Simplified Write Feed Service endpoint
    // Handles creating new posts. This service would have less traffic.
    app.post('/api/feed/posts', upload.single('image'), async (req: Request, res: Response) => {
      try {
        const { description } = req.body;
        // In a real app, 'upload' middleware would handle image upload to blob storage
        // and return the URL. For simplicity, assume imageUrl is available.
        const imageUrl = req.file?.location || 'default_image_url.jpg'; // From S3 upload
        const newPost = new PostModel({ userId: req.user.id, imageUrl, description });
        await newPost.save();
        res.status(201).json({ message: 'Post created successfully', post: newPost });
      } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).send('Internal Server Error');
      }
    });

    // --- End of external code example ---
    ```

3.  **Database Choice and Scalability:**
    *   The choice of a **NoSQL document database (e.g., MongoDB)** is re-affirmed.
    *   **Q: Why NoSQL for scalability?**
        *   **A:** NoSQL databases offer **scalability out-of-the-box** and are more flexible than traditional SQL databases. For this use case, where there are **not many complex relationships** (posts are primarily related to a user), a document database like MongoDB is highly suitable. If there were complex, interconnected data structures requiring strong relational integrity, an SQL database like MySQL or PostgreSQL would be preferred.

4.  **Asynchronous Image Processing:**
    *   For tasks like **creating thumbnails or optimising images**, asynchronous processing using **serverless functions (e.g., AWS Lambda)** is suggested. These jobs can scale very well independently of the main services.

5.  **Caching:**
    *   To further reduce pressure on the database and speed up reads, a **Redis-based cache** can be placed in front of the Read Feed Service.
    *   **Benefit:** Posts do not change often, making them ideal candidates for caching. Highly requested content, like **viral posts**, can be aggressively cached to deliver metadata quickly.

---

### 4. Scaling Individual Components (Web App)

The final step focuses on optimising specific parts of the system, particularly the client-side web application given the frontend focus.

*   **Focus:** Performance issues when rendering hundreds of posts simultaneously in the web app.
*   **Assumed Framework:** **React**.
*   **Identified Problem:**
    *   Rendering many posts simultaneously can lead to an **overly large Document Object Model (DOM) and Virtual DOM**, making the application heavy and potentially exceeding browser limits, especially on mobile devices.

**Solutions for Web App Performance (Rendering):**

1.  **DOM Optimisation / Virtualization:**
    *   **Unmount posts that are not visible (outside the viewport):** This reduces the number of elements in the DOM. While the references are kept, the elements are not rendered, improving performance. Some implementations might keep a hidden placeholder to maintain scroll behaviour.
    *   Use a **"virtualized list"** package or implement similar logic. This involves creating a "sliding window" where only the posts currently visible in the viewport (or slightly outside for pre-rendering) are actually mounted and rendered. As the user scrolls, elements are dynamically added and removed from the DOM.

    **Conceptual React Code Example (Virtualized List / Windowing):**

    ```typescript
    // --- Start of external code example ---
    // This is not from the source.
    // This is a conceptual example, a real implementation would use a library
    // like `react-virtualized` or `react-window`.

    import React, { useState, useEffect, useRef, useCallback } from 'react';

    interface Post {
      id: string;
      imageUrl: string;
      description: string;
    }

    interface FeedProps {
      posts: Post[];
      itemHeight: number; // Height of each post item
      overscan: number;   // Number of items to render above/below viewport
    }

    const VirtualizedFeed: React.FC<FeedProps> = ({ posts, itemHeight, overscan }) => {
      const containerRef = useRef<HTMLDivElement>(null);
      const [startIndex, setStartIndex] = useState(0);
      const [endIndex, setEndIndex] = useState(0);

      const updateVisibleItems = useCallback(() => {
        if (!containerRef.current) return;

        const scrollTop = containerRef.current.scrollTop;
        const containerHeight = containerRef.current.clientHeight;

        const newStartIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
        const newEndIndex = Math.min(
          posts.length - 1,
          Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
        );

        setStartIndex(newStartIndex);
        setEndIndex(newEndIndex);
      }, [posts.length, itemHeight, overscan]);

      useEffect(() => {
        const container = containerRef.current;
        if (container) {
          container.addEventListener('scroll', updateVisibleItems);
          updateVisibleItems(); // Initial calculation
        }
        return () => {
          if (container) {
            container.removeEventListener('scroll', updateVisibleItems);
          }
        };
      }, [updateVisibleItems]);

      const visiblePosts = posts.slice(startIndex, endIndex + 1);
      const paddingTop = startIndex * itemHeight;
      const paddingBottom = (posts.length - (endIndex + 1)) * itemHeight;

      return (
        <div
          ref={containerRef}
          style={{ height: '100vh', overflowY: 'auto', position: 'relative' }} // Scrollable container
        >
          <div style={{ height: posts.length * itemHeight, position: 'relative' }}>
            <div
              style={{
                paddingTop,
                paddingBottom,
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                // Make sure children are positioned relative to this element
                transform: `translateY(${paddingTop}px)` // Offset for scrolling
              }}
            >
              {visiblePosts.map((post) => (
                <div key={post.id} style={{ height: itemHeight }}>
                  {/* Render your Post component here */}
                  <img src={post.imageUrl} alt={post.description} style={{ width: '100%', height: '80%', objectFit: 'cover' }} />
                  <p>{post.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    };

    // --- End of external code example ---
    ```

2.  **Fetching Posts (Pagination):**
    *   **Q: How would you go about fetching posts (pagination)?**
        *   **Initial Idea:** **Offset-based pagination** (e.g., fetching `page=5`).
        *   **Problem with Offset Pagination:** If new posts are published, the content of subsequent pages (e.g., page 5 or 6) might shift. A user could see posts they've already seen, or miss new posts, leading to a "shaky" or inconsistent scroll experience.
        *   **Preferred Solution: Cursor-based pagination**.
            *   **Mechanism:** Instead of page numbers, a "cursor" (typically the ID of the last post fetched) is used. The client requests "the next N posts after this cursor ID".
            *   **Integration:** Can be effectively linked with the **Intersection Observer API**. When a specific element (e.g., a loading indicator at the bottom of the feed) enters the viewport, the Intersection Observer triggers a fetch for the next set of posts using the last seen post's ID as the cursor.
            *   **Advantage:** New posts being added to the feed **do not affect the scroll position or the integrity of previously fetched content**. The fetch is always relative to a specific point, ensuring a smooth and consistent user experience without complex client-side re-ordering logic.

    **Conceptual React Code Example (Cursor-Based Pagination with Intersection Observer):**

    ```typescript
    // --- Start of external code example ---
    // This is not from the source.

    import React, { useState, useEffect, useRef, useCallback } from 'react';

    interface Post {
      id: string;
      imageUrl: string;
      description: string;
    }

    const FeedWithCursorPagination: React.FC = () => {
      const [posts, setPosts] = useState<Post[]>([]);
      const [loading, setLoading] = useState(false);
      const [hasMore, setHasMore] = useState(true);
      const [lastPostId, setLastPostId] = useState<string | null>(null); // Our cursor
      const observerTargetRef = useRef<HTMLDivElement>(null); // Element to observe for infinite scroll

      const fetchPosts = useCallback(async (cursor: string | null) => {
        if (loading || !hasMore) return;

        setLoading(true);
        try {
          // Construct URL with cursor
          const url = cursor ? `/api/feed/posts?limit=10&cursor=${cursor}` : `/api/feed/posts?limit=10`;
          const response = await fetch(url);
          const data = await response.json();

          if (data.posts.length > 0) {
            setPosts((prevPosts) => [...prevPosts, ...data.posts]);
            setLastPostId(data.nextCursor); // Update cursor for next fetch
            setHasMore(data.posts.length === 10); // Assume 10 is the limit, if less, no more data
          } else {
            setHasMore(false); // No more posts to load
          }
        } catch (error) {
          console.error("Failed to fetch posts:", error);
          setHasMore(false); // Stop trying if there's an error
        } finally {
          setLoading(false);
        }
      }, [loading, hasMore]);

      useEffect(() => {
        // Initial fetch when component mounts
        fetchPosts(null);
      }, [fetchPosts]);

      // Intersection Observer for infinite scrolling
      useEffect(() => {
        const observer = new IntersectionObserver(
          (entries) => {
            if (entries.isIntersecting && !loading && hasMore) {
              fetchPosts(lastPostId); // Fetch more when the target is visible
            }
          },
          { threshold: 1.0 } // Trigger when 100% of the target is visible
        );

        const currentTarget = observerTargetRef.current;
        if (currentTarget) {
          observer.observe(currentTarget);
        }

        return () => {
          if (currentTarget) {
            observer.unobserve(currentTarget);
          }
        };
      }, [lastPostId, loading, hasMore, fetchPosts]);

      return (
        <div style={{ height: '100vh', overflowY: 'auto' }}>
          {posts.map((post) => (
            <div key={post.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
              <img src={post.imageUrl} alt={post.description} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              <p>{post.description}</p>
            </div>
          ))}
          <div ref={observerTargetRef} style={{ height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {loading && <p>Loading more posts...</p>}
            {!loading && !hasMore && <p>You've reached the end of the feed!</p>}
          </div>
        </div>
      );
    };

    // --- End of external code example ---
    ```

3.  **Server-Side Rendering (SSR):**
    *   **Q: Would Server-Side Rendering (SSR) be a good use case for this feed?**
        *   **A: No, not for the feed itself.**
        *   **Reasons:** The feed is a **highly interactive and state-heavy component** on the client-side. Users typically scroll immediately, which minimises the benefits of pre-rendering for the feed content (faster initial content paint). There's not enough static content to justify the complexity of SSR for the feed itself.
        *   **However:** **Everything *around* the feed feature (e.g., navigation, profile information, static page elements) could potentially benefit from SSR**.

***