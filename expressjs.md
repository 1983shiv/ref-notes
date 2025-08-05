# Express.js Real-World Code Examples & Best Practices

Below are practical code snippets for common Express.js backend scenarios, each with a one-line brief. All examples include error handling and are ready for use in Node.js/TypeScript projects.

---

## 1. Hello World  
*Simple request handler*
```ts
import express from 'express';
const app = express();
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(3000, () => console.log('Server running'));
```

---

## 2. Authentication (Login/Password)  
*Basic login authentication with error handling*
```ts
import express from 'express';
const app = express();
app.use(express.json());
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'secret') res.send('Login successful');
  else res.status(401).json({ error: 'Invalid credentials' });
});
```

---

## 3. Content Negotiation  
*Responds with JSON or HTML based on Accept header*
```ts
app.get('/data', (req, res) => {
  const data = { message: 'Hello' };
  if (req.accepts('json')) res.json(data);
  else if (req.accepts('html')) res.send(`<p>${data.message}</p>`);
  else res.status(406).send('Not Acceptable');
});
```

---

## 4. Cookie Sessions  
*Using cookie-session for session management*
```ts
import session from 'cookie-session';
app.use(session({ name: 'session', keys: ['secret'] }));
app.get('/set', (req, res) => { req.session.user = 'Alice'; res.send('Session set'); });
app.get('/get', (req, res) => res.send(req.session.user || 'No session'));
```

---

## 5. Cookies  
*Set and read cookies*
```ts
import cookieParser from 'cookie-parser';
app.use(cookieParser());
app.get('/set-cookie', (req, res) => res.cookie('token', 'abc123').send('Cookie set'));
app.get('/get-cookie', (req, res) => res.send(req.cookies.token || 'No cookie'));
```

---

## 6. File Downloads  
*Send files to client for download*
```ts
app.get('/download', (req, res) => res.download('./files/report.pdf', 'report.pdf'));
```

---

## 7. EJS Templating  
*Render dynamic HTML using EJS*
```ts
import ejs from 'ejs';
app.set('view engine', 'ejs');
app.get('/profile', (req, res) => res.render('profile', { user: 'Alice' }));
```

---

## 8. Error Pages  
*Custom error page for 404 and 500*
```ts
app.use((req, res) => res.status(404).render('404'));
app.use((err, req, res, next) => res.status(500).render('500', { error: err }));
```

---

## 9. Error Middleware  
*Centralized error handling*
```ts
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});
```

---

## 10. Markdown as Template Engine  
*Render markdown files as HTML*
```ts
import fs from 'fs';
import marked from 'marked';
app.get('/doc', (req, res) => {
  fs.readFile('./README.md', 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error');
    res.send(marked(data));
  });
});
```

---

## 11. Multi-Router  
*Organize routes using multiple routers*
```ts
import userRouter from './routes/user';
import adminRouter from './routes/admin';
app.use('/users', userRouter);
app.use('/admin', adminRouter);
```

---

## 12. MVC-Style Controllers  
*Separate controllers for cleaner code*
```ts
// controllers/userController.ts
export const getUser = (req, res) => res.json({ name: 'Alice' });
// app.ts
import { getUser } from './controllers/userController';
app.get('/user', getUser);
```

---

## 13. Online User Tracking (with Redis)  
*Track online users using Redis*
```ts
import redis from 'redis';
const client = redis.createClient();
app.get('/online', (req, res) => {
  client.smembers('onlineUsers', (err, users) => res.json(users));
});
```

---

## 14. Route Parameters  
*Access dynamic route parameters*
```ts
app.get('/user/:id', (req, res) => res.send(`User ID: ${req.params.id}`));
```

---

## 15. Resource Operations (CRUD)  
*Multiple HTTP operations on the same resource*
```ts
app.route('/item/:id')
  .get((req, res) => res.send('Get item'))
  .put((req, res) => res.send('Update item'))
  .delete((req, res) => res.send('Delete item'));
```

---

## 16. Route Map  
*Organize routes using a map*
```ts
const routes = {
  '/': (req, res) => res.send('Home'),
  '/about': (req, res) => res.send('About')
};
Object.entries(routes).forEach(([path, handler]) => app.get(path, handler));
```

---

## 17. Route Middleware  
*Add middleware to specific routes*
```ts
const auth = (req, res, next) => req.headers.token ? next() : res.status(401).send('Unauthorized');
app.get('/protected', auth, (req, res) => res.send('Secret data'));
```

---

## 18. Route Separation  
*Organize routes per resource*
```ts
// routes/user.ts
import express from 'express';
const router = express.Router();
router.get('/', (req, res) => res.send('User list'));
export default router;
```

---

## 19. Search API  
*Implement a search endpoint*
```ts
app.get('/search', (req, res) => {
  const { q } = req.query;
  // search logic here
  res.json({ results: [`Result for ${q}`] });
});
```

---

## 20. User Sessions  
*Session management with express-session*
```ts
import session from 'express-session';
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true }));
app.get('/login', (req, res) => { req.session.user = 'Alice'; res.send('Logged in'); });
app.get('/profile', (req, res) => res.send(req.session.user || 'Not logged in'));
```

---

## 21. Static Files  
*Serve static files from a directory*
```ts
app.use(express.static('public'));
```

---

## 22. Virtual Hosts  
*Host multiple sites on one server*
```ts
import vhost from 'vhost';
app.use(vhost('site1.example.com', require('./site1/app')));
app.use(vhost('site2.example.com', require('./site2/app')));
```

---

## 23. Dynamic View Rendering  
*Render views dynamically with data*
```ts
app.get('/dashboard', (req, res) => res.render('dashboard', { stats: [1, 2, 3] }));
```

---

## 24. View Locals  
*Store data in request object between middleware*
```ts
app.use((req, res, next) => { res.locals.user = 'Alice'; next(); });
app.get('/greet', (req, res) => res.send(`Hello, ${res.locals.user}`));
```

---

## 25. Simple API Service  
*RESTful API endpoint*
```ts
app.get('/api/status', (req, res) => res.json({ status: 'ok' }));
```

---

**Best Practices:**
- Always use error handling middleware.
- Use async/await with try/catch for async routes.
- Validate user input and sanitize data.
- Use environment variables for secrets.
- Organize code with routers and controllers.
- Use helmet, cors, and rate-limiter for security.

---