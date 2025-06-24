## What is System Design?
System design is the process of designing the elements of a system such as the architecture, modules and components, the different interfaces of those components and the data that goes through that system

**Type of System design**
- High Level Design
- Low Level Design

**High Level Design(HLD)**
- It describe the main components that would be developed for the resulting product.
- The system architecture details, database design, services adn processes, the relationship between various modules, and features

**Low level Design(LLD)**
- It describe the design of each element mentioned in the High level design of the system.
- Classes, interfaces, relationships between different classes and actual logic of the various components.

## Architecture
Internal design details for building the applications

### Monolithic Architecture

Monolithic Architecture is a software design approach where an entire application is built as a single, unified unit. All components, features, and functionalities are tightly coupled and deployed together as one large codebase.

**Key Characteristics:**
- Single Deployable Unit: Entire application packaged and deployed as one unit
- Shared Database: All components use the same database
- Centralized Business Logic: All features in one codebase
- Tight Coupling: Components are interdependent
- Web Application Example: E-commerce Platform

```js
// Monolithic E-commerce Application Structure

// Single Application Entry Point
const express = require('express');
const app = express();

// All modules in one application
const userController = require('./controllers/userController');
const productController = require('./controllers/productController');
const orderController = require('./controllers/orderController');
const paymentController = require('./controllers/paymentController');
const inventoryController = require('./controllers/inventoryController');

// Shared Database Connection
const database = require('./config/database');

// All Routes in One Place
app.use('/api/users', userController);
app.use('/api/products', productController);
app.use('/api/orders', orderController);
app.use('/api/payments', paymentController);
app.use('/api/inventory', inventoryController);

// Single Port for Entire Application
app.listen(3000, () => {
    console.log('E-commerce Monolith running on port 3000');
});

```
**Monolithic File Structure**
ecommerce-monolith/
├── controllers/
│   ├── userController.js      // User management
│   ├── productController.js   // Product catalog
│   ├── orderController.js     // Order processing
│   ├── paymentController.js   // Payment handling
│   └── inventoryController.js // Inventory management
├── models/
│   ├── User.js
│   ├── Product.js
│   ├── Order.js
│   └── Payment.js
├── services/
│   ├── authService.js
│   ├── emailService.js
│   └── notificationService.js
├── config/
│   └── database.js           // Single database config
├── utils/
└── app.js                    // Main application file

**Example Implementation**
```js
// controllers/orderController.js
const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');
const Payment = require('../models/Payment');
const emailService = require('../services/emailService');

class OrderController {
    async createOrder(req, res) {
        try {
            // All business logic in one place
            const { userId, products, paymentInfo } = req.body;
            
            // User validation
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            
            // Product validation and inventory check
            for (let item of products) {
                const product = await Product.findById(item.productId);
                if (!product || product.stock < item.quantity) {
                    return res.status(400).json({ error: 'Insufficient stock' });
                }
            }
            
            // Create order
            const order = new Order({
                userId,
                products,
                total: calculateTotal(products),
                status: 'pending'
            });
            
            // Process payment
            const payment = await Payment.create({
                orderId: order._id,
                amount: order.total,
                paymentMethod: paymentInfo.method
            });
            
            // Update inventory
            for (let item of products) {
                await Product.findByIdAndUpdate(
                    item.productId,
                    { $inc: { stock: -item.quantity } }
                );
            }
            
            // Send confirmation email
            await emailService.sendOrderConfirmation(user.email, order);
            
            await order.save();
            res.status(201).json(order);
            
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new OrderController();
```

**Advantages of Monolithic Architecture:**
- ✅ Simplicity
    - Single codebase to manage
    - Easy to understand and develop initially
    - Straightforward testing and debugging
- ✅ Development Speed
    - Faster initial development
    - No network calls between components
    - Shared libraries and utilities
- ✅ Deployment
    - Simple deployment process
    - Single deployable unit
    - Easy rollback strategies
- ✅ Performance
    - No network latency between components
    - Efficient in-process communication
    - Better performance for small to medium applications
**Disadvantages of Monolithic Architecture:**
- ❌ Scalability Issues
    - Must scale entire application even if only one component needs scaling
    - Resource waste on unused components
- ❌ Technology Lock-in
    - Entire application uses same technology stack
    - Difficult to adopt new technologies for specific features
- ❌ Development Challenges
    - Large codebase becomes difficult to maintain
    - Team coordination issues
    - Longer build and deployment times
- ❌ Single Point of Failure
    - If one component fails, entire application goes down
    - No fault isolation
    
Real-World Example: Traditional Web Application
```js
// Traditional Blog Application (Monolithic)
const express = require('express');
const app = express();

// All functionality in one application
app.get('/posts', (req, res) => {
    // Fetch all blog posts
    const posts = database.getAllPosts();
    res.render('posts', { posts });
});

app.post('/posts', (req, res) => {
    // Create new post
    const post = database.createPost(req.body);
    emailService.notifySubscribers(post);
    res.redirect('/posts');
});

app.get('/users', (req, res) => {
    // User management
    const users = database.getAllUsers();
    res.render('users', { users });
});

app.post('/comments', (req, res) => {
    // Comment system
    const comment = database.createComment(req.body);
    notificationService.notifyAuthor(comment);
    res.redirect(`/posts/${comment.postId}`);
});

// Single deployment
app.listen(3000);

```
**When to Use Monolithic Architecture:**

- Small to medium-sized applications
- Simple applications with limited complexity
- Startups or proof-of-concept projects
- Teams with limited distributed systems experience
- Applications with predictable load patterns
**Example Scenarios:**
- Corporate website with CMS
- Small e-commerce store
- Internal business applications
- MVPs (Minimum Viable Products)

Monolithic architecture is often the right choice for many applications, especially when starting out. The key is knowing when to transition to microservices as your application grows in complexity and scale.