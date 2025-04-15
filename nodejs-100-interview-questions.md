### 1. What is Node.js, and how does it differ from traditional server-side technologies like PHP or Java?

Node.js is a runtime environment that executes JavaScript outside the browser using the V8 engine. Unlike PHP (interpreted, often synchronous) or Java (compiled, multi-threaded), Node.js is event-driven, non-blocking, and single-threaded, ideal for I/O-heavy tasks.

**Example**:
```javascript
const http = require("http");
http.createServer((req, res) => {
  res.write("Hello from Node.js!");
  res.end();
}).listen(3000);
```
Node.js handles requests asynchronously, unlike PHP’s typical synchronous processing.

---

### 2. Explain the event-driven architecture of Node.js.

Node.js uses an event-driven model where events (e.g., HTTP requests) trigger callbacks. The Event Loop processes these events, enabling non-blocking I/O.

**Example**:
```javascript
const EventEmitter = require("events");
const emitter = new EventEmitter();
emitter.on("greet", () => console.log("Hello!"));
emitter.emit("greet"); // Outputs: Hello!
```
Events like `greet` trigger registered listeners.

---

### 3. What is the role of V8 in Node.js?

V8 is the JavaScript engine in Node.js, compiling JavaScript to machine code for fast execution. It handles memory management and JIT compilation.

**Example**:
```javascript
console.log(process.versions.v8); // Outputs V8 version, e.g., 12.4.254.14-node.8
```
V8 powers the execution of this code in Node.js.

---

### 4. How does Node.js achieve non-blocking I/O?

Node.js uses an event loop and asynchronous APIs to handle I/O operations (e.g., file reading, HTTP requests) without blocking the main thread.

**Example**:
```javascript
const fs = require("fs");
fs.readFile("file.txt", (err, data) => {
  if (err) throw err;
  console.log(data.toString());
});
console.log("Reading file..."); // Prints before file content
```
`readFile` runs asynchronously, allowing other code to execute.

---

### 5. What is the difference between synchronous and asynchronous code in Node.js?

- **Synchronous**: Blocks execution until complete.
- **Asynchronous**: Continues execution, handling results via callbacks, Promises, or async/await.

**Example**:
```javascript
const fs = require("fs");
// Synchronous
const dataSync = fs.readFileSync("file.txt");
console.log(dataSync.toString());

// Asynchronous
fs.readFile("file.txt", (err, data) => {
  console.log(data.toString());
});
```
Sync blocks; async doesn’t.

---

### 6. What is the process object in Node.js, and what are some of its key properties?

The `process` object provides information about the Node.js process. Key properties: `argv` (arguments), `env` (environment variables), `pid` (process ID).

**Example**:
```javascript
console.log(process.env.NODE_ENV); // e.g., "development"
console.log(process.argv); // Command-line arguments
console.log(process.pid); // Process ID
```

---

### 7. Explain the purpose of package.json in a Node.js project.

`package.json` defines a project’s metadata, dependencies, scripts, and configuration.

**Example**:
```json
{
  "name": "my-app",
  "version": "1.0.0",
  "dependencies": {
    "express": "^4.18.2"
  },
  "scripts": {
    "start": "node index.js"
  }
}
```
Running `npm install` installs `express`; `npm start` runs `index.js`.

---

### 8. What is npm, and how does it interact with Node.js?

npm is the package manager for Node.js, used to install, manage, and publish packages. It interacts via `package.json` and the npm CLI.

**Example**:
```bash
npm install express
```
```javascript
const express = require("express"); // Uses npm-installed module
```

---

### 9. What are the differences between Node.js versions (e.g., LTS vs. Current)?

- **LTS (Long-Term Support)**: Stable, supported for 30 months (e.g., 20.x).
- **Current**: Latest features, less stable (e.g., 21.x).

**Example**:
```javascript
// Check version
console.log(process.version); // e.g., v20.12.2 (LTS)
```
Use LTS for production, Current for experimenting.

---

### 10. How does Node.js handle single-threaded execution for concurrent requests?

Node.js uses a single thread with an event loop, offloading I/O to the OS and handling callbacks asynchronously.

**Example**:
```javascript
const http = require("http");
http.createServer((req, res) => {
  setTimeout(() => res.end("Done"), 1000); // Simulates async work
}).listen(3000);
```
Multiple requests are queued and processed concurrently.

---

### 11. What is the Event Loop in Node.js, and how does it work?

The Event Loop manages asynchronous operations by processing tasks in a queue, executing callbacks when I/O completes.

**Example**:
```javascript
setTimeout(() => console.log("Timeout"), 0);
console.log("Immediate");
```
Output: `Immediate`, `Timeout`. The event loop schedules `setTimeout`.

---

### 12. Explain the phases of the Event Loop in detail.

Phases:
- **Timers**: Executes `setTimeout`/`setInterval` callbacks.
- **Pending Callbacks**: Handles I/O callbacks.
- **Idle, Prepare**: Internal use.
- **Poll**: Retrieves new I/O events.
- **Check**: Runs `setImmediate` callbacks.
- **Close Callbacks**: Handles close events.

**Example**:
```javascript
setTimeout(() => console.log("Timer"), 0);
setImmediate(() => console.log("Immediate"));
```
`Timer` or `Immediate` may run first, depending on the poll phase.

---

### 13. What is a callback, and what are its drawbacks in Node.js?

A callback is a function passed to another function to handle async results. Drawbacks: callback hell, error handling complexity.

**Example**:
```javascript
fs.readFile("file.txt", (err, data) => {
  if (err) throw err;
  console.log(data.toString());
});
```
Nested callbacks can become unreadable.

---

### 14. How do Promises improve upon callbacks?

Promises provide a cleaner way to handle async operations with `.then()` and `.catch()`, avoiding nested callbacks.

**Example**:
```javascript
const fs = require("fs").promises;
fs.readFile("file.txt")
  .then(data => console.log(data.toString()))
  .catch(err => console.error(err));
```

---

### 15. What is async/await, and how does it simplify asynchronous code?

`async/await` is syntactic sugar for Promises, making async code look synchronous and easier to read.

**Example**:
```javascript
const fs = require("fs").promises;
async function readFile() {
  try {
    const data = await fs.readFile("file.txt");
    console.log(data.toString());
  } catch (err) {
    console.error(err);
  }
}
readFile();
```

---

### 16. What happens if an asynchronous operation is not handled properly in Node.js?

Uncaught errors in async operations (e.g., Promises) crash the process unless handled.

**Example**:
```javascript
Promise.reject("Error").catch(err => console.log(err)); // Handled
// Promise.reject("Error"); // Unhandled, crashes
```

---

### 17. Explain the difference between setTimeout, setInterval, and setImmediate.

- `setTimeout`: Runs code after a delay.
- `setInterval`: Repeats code at intervals.
- `setImmediate`: Runs code after the current poll phase.

**Example**:
```javascript
setTimeout(() => console.log("Timeout"), 0);
setInterval(() => console.log("Interval"), 1000);
setImmediate(() => console.log("Immediate"));
```

---

### 18. What is the purpose of process.nextTick()?

`process.nextTick()` schedules a callback before the next event loop iteration, ahead of I/O tasks.

**Example**:
```javascript
process.nextTick(() => console.log("Next Tick"));
console.log("Main");
```
Output: `Main`, `Next Tick`.

---

### 19. How can you avoid callback hell in Node.js?

Use Promises, async/await, or modularize code to reduce nesting.

**Example**:
```javascript
async function readFiles() {
  const fs = require("fs").promises;
  const file1 = await fs.readFile("file1.txt");
  const file2 = await fs.readFile("file2.txt");
  console.log(file1.toString(), file2.toString());
}
readFiles();
```

---

### 20. What are the performance implications of blocking the Event Loop?

Blocking the event loop (e.g., with heavy computation) delays async tasks, reducing throughput.

**Example**:
```javascript
while (Date.now() < Date.now() + 1000) {} // Blocks
setTimeout(() => console.log("Delayed"), 0); // Runs late
```

---

### 21. What is the CommonJS module system in Node.js?

CommonJS is Node.js’s default module system, using `require()` and `module.exports` for importing/exporting.

**Example**:
```javascript
// math.js
module.exports = { add: (a, b) => a + b };

// index.js
const { add } = require("./math");
console.log(add(2, 3)); // 5
```

---

### 22. How does module.exports differ from exports?

`module.exports` is the actual exported object; `exports` is a shorthand alias. Assigning to `exports` breaks the reference.

**Example**:
```javascript
// Works
module.exports = { name: "test" };

// Breaks
exports = { name: "test" }; // No effect
```

---

### 23. Explain the ES Modules (ESM) syntax and its use in Node.js.

ESM uses `import`/`export` syntax, supported in Node.js with `.mjs` or `"type": "module"` in `package.json`.

**Example**:
```javascript
// math.mjs
export const add = (a, b) => a + b;

// index.mjs
import { add } from "./math.mjs";
console.log(add(2, 3)); // 5
```

---

### 24. What is the difference between CommonJS and ES Modules?

- **CommonJS**: Synchronous `require()`, `module.exports`.
- **ES Modules**: Asynchronous `import`, `export`, supports tree-shaking.

**Example**:
```javascript
// CommonJS
const fs = require("fs");

// ESM
import fs from "fs";
```

---

### 25. How does Node.js resolve module paths when using require()?

Node.js searches:
1. Core modules (e.g., `fs`).
2. `node_modules` (local, then parent directories).
3. File paths (relative/absolute).

**Example**:
```javascript
const myModule = require("./myModule"); // Looks for ./myModule.js
```

---

### 26. What is the purpose of the node_modules folder?

`node_modules` stores installed dependencies for a project.

**Example**:
```bash
npm install express
```
Creates `node_modules/express`.

---

### 27. How can you create a custom module in Node.js?

Define a file with `module.exports` to expose functions or data.

**Example**:
```javascript
// utils.js
module.exports = { greet: () => "Hello" };

// index.js
const utils = require("./utils");
console.log(utils.greet()); // Hello
```

---

### 28. What is tree-shaking, and how does it relate to ES Modules in Node.js?

Tree-shaking eliminates unused code during bundling, supported by ESM’s static structure.

**Example**:
```javascript
// math.mjs
export const add = (a, b) => a + b;
export const sub = (a, b) => a - b;

// index.mjs
import { add } from "./math.mjs";
console.log(add(2, 3)); // sub is tree-shaken
```

---

### 29. How do you handle circular dependencies in Node.js?

Avoid tight coupling; use dependency injection or refactor. CommonJS partially supports them, ESM less so.

**Example**:
```javascript
// a.js
const b = require("./b");
module.exports = { name: "A" };

// b.js
const a = require("./a");
module.exports = { name: "B" };
```

---

### 30. What is the __dirname and __filename variable in a Node.js module?

- `__dirname`: Directory of the current module.
- `__filename`: Full path of the current file.

**Example**:
```javascript
console.log(__dirname); // /path/to/dir
console.log(__filename); // /path/to/dir/file.js
```

---

### 31. How do you read a file synchronously and asynchronously in Node.js?

- **Sync**: `fs.readFileSync`.
- **Async**: `fs.readFile`.

**Example**:
```javascript
const fs = require("fs");
console.log(fs.readFileSync("file.txt").toString());
fs.readFile("file.txt", (err, data) => console.log(data.toString()));
```

---

### 32. What is the difference between fs.readFile and fs.readFileSync?

- `fs.readFile`: Async, non-blocking, uses callback.
- `fs.readFileSync`: Sync, blocking, returns data directly.

**Example**:
```javascript
const fs = require("fs");
fs.readFileSync("file.txt"); // Blocks
fs.readFile("file.txt", () => {}); // Non-blocking
```

---

### 33. How can you write to a file using the fs module?

Use `fs.writeFile` (async) or `fs.writeFileSync` (sync).

**Example**:
```javascript
const fs = require("fs");
fs.writeFile("file.txt", "Hello", err => {
  if (err) throw err;
  console.log("Written");
});
```

---

### 34. What is a stream in Node.js, and how is it used with the fs module?

A stream processes data in chunks, useful for large files. `fs` provides `createReadStream` and `createWriteStream`.

**Example**:
```javascript
const fs = require("fs");
fs.createReadStream("file.txt").pipe(fs.createWriteStream("copy.txt"));
```

---

### 35. Explain the difference between fs.createReadStream and fs.readFile.

- `fs.createReadStream`: Reads in chunks, memory-efficient.
- `fs.readFile`: Reads entire file into memory.

**Example**:
```javascript
const fs = require("fs");
fs.createReadStream("large.txt").on("data", chunk => console.log(chunk));
fs.readFile("large.txt", (err, data) => console.log(data));
```

---

### 36. How do you handle file system errors in Node.js?

Use try-catch for sync or check `err` in async callbacks.

**Example**:
```javascript
const fs = require("fs");
fs.readFile("missing.txt", (err, data) => {
  if (err) console.error("Error:", err);
  else console.log(data);
});
```

---

### 37. What is the purpose of fs.promises in Node.js?

`fs.promises` provides Promise-based file system APIs.

**Example**:
```javascript
const fs = require("fs").promises;
async function read() {
  const data = await fs.readFile("file.txt");
  console.log(data.toString());
}
read();
```

---

### 38. How can you recursively delete a directory in Node.js?

Use `fs.rm` with `recursive: true`.

**Example**:
```javascript
const fs = require("fs").promises;
async function deleteDir() {
  await fs.rm("dir", { recursive: true });
  console.log("Deleted");
}
deleteDir();
```

---

### 39. How do you create a basic HTTP server in Node.js using the http module?

Use `http.createServer` to handle requests.

**Example**:
```javascript
const http = require("http");
http.createServer((req, res) => {
  res.write("Hello");
  res.end();
}).listen(3000);
```

---

### 40. What is the difference between http.get and http.request?

- `http.get`: Simplified GET request.
- `http.request`: Configurable for any HTTP method.

**Example**:
```javascript
const http = require("http");
http.get("http://example.com", res => res.on("data", console.log));
http.request({ method: "POST", host: "example.com" }, res => {});
```

---

### 41. How can you handle query parameters in a Node.js HTTP server?

Use `url.parse` to extract query parameters.

**Example**:
```javascript
const http = require("http");
const url = require("url");
http.createServer((req, res) => {
  const query = url.parse(req.url, true).query;
  res.end(`Hello, ${query.name}`);
}).listen(3000);
// GET /?name=Alice
```

---

### 42. What is the role of the res object in an HTTP response?

The `res` object sends data (status, headers, body) to the client.

**Example**:
```javascript
const http = require("http");
http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.write("Hello");
  res.end();
}).listen(3000);
```

---

### 43. How do you set HTTP headers in a Node.js server?

Use `res.setHeader` or `res.writeHead`.

**Example**:
```javascript
const http = require("http");
http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end('{"message":"Hello"}');
}).listen(3000);
```

---

### 44. What is the difference between http and https modules in Node.js?

- `http`: Handles unencrypted requests.
- `https`: Handles encrypted (TLS/SSL) requests.

**Example**:
```javascript
const https = require("https");
const fs = require("fs");
https.createServer({
  cert: fs.readFileSync("cert.pem"),
  key: fs.readFileSync("key.pem")
}, (req, res) => res.end("Secure")).listen(443);
```

---

### 45. How can you handle POST requests in a Node.js HTTP server?

Collect data from `req.on("data")` and process on `req.on("end")`.

**Example**:
```javascript
const http = require("http");
http.createServer((req, res) => {
  if (req.method === "POST") {
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", () => res.end(`Received: ${body}`));
  }
}).listen(3000);
```

---

### 46. What is a RESTful API, and how can you build one in Node.js?

A RESTful API uses HTTP methods (GET, POST, etc.) for CRUD operations. Build with `http` or frameworks like Express.

**Example**:
```javascript
const http = require("http");
http.createServer((req, res) => {
  if (req.url === "/users" && req.method === "GET") {
    res.end('[{"id":1,"name":"Alice"}]');
  }
}).listen(3000);
```

---

### 47. How do you implement CORS in a Node.js server?

Set CORS headers to allow cross-origin requests.

**Example**:
```javascript
const http = require("http");
http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.end("CORS enabled");
}).listen(3000);
```

---

### 48. What is the purpose of the net module in Node.js?

The `net` module creates TCP servers and clients for low-level networking.

**Example**:
```javascript
const net = require("net");
const server = net.createServer(socket => {
  socket.write("Hello");
  socket.end();
}).listen(3000);
```

---

### 49. What is Express, and why is it popular with Node.js?

Express is a minimal web framework for Node.js, simplifying routing, middleware, and API creation. It’s popular for its ease and flexibility.

**Example**:
```javascript
const express = require("express");
const app = express();
app.get("/", (req, res) => res.send("Hello"));
app.listen(3000);
```

---

### 50. How do you set up a basic Express server?

Install Express and create routes with `app.get`, etc.

**Example**:
```javascript
const express = require("express");
const app = express();
app.get("/", (req, res) => res.send("Hello"));
app.listen(3000, () => console.log("Server running"));
```

---

### 51. What are middleware functions in Express, and how do they work?

Middleware are functions that process requests, executed in sequence. They can modify `req`/`res` or pass control.

**Example**:
```javascript
const express = require("express");
const app = express();
app.use((req, res, next) => {
  console.log("Middleware");
  next();
});
app.get("/", (req, res) => res.send("Hello"));
app.listen(3000);
```

---

### 52. How can you handle errors in Express applications?

Use error-handling middleware with four arguments.

**Example**:
```javascript
const express = require("express");
const app = express();
app.get("/", (req, res) => {
  throw new Error("Oops");
});
app.use((err, req, res, next) => {
  res.status(500).send("Error: " + err.message);
});
app.listen(3000);
```

---

### 53. Explain the difference between app.use and app.get in Express.

- `app.use`: Applies middleware to all routes/methods.
- `app.get`: Handles GET requests for a specific route.

**Example**:
```javascript
const express = require("express");
const app = express();
app.use((req, res, next) => next());
app.get("/", (req, res) => res.send("GET"));
app.listen(3000);
```

---

### 54. How do you parse JSON request bodies in Express?

Use `express.json()` middleware.

**Example**:
```javascript
const express = require("express");
const app = express();
app.use(express.json());
app.post("/", (req, res) => res.send(req.body));
app.listen(3000);
```

---

### 55. What is the purpose of express.Router?

`express.Router` creates modular route handlers.

**Example**:
```javascript
const express = require("express");
const router = express.Router();
router.get("/", (req, res) => res.send("Router"));
const app = express();
app.use("/api", router);
app.listen(3000);
```

---

### 56. How can you implement authentication middleware in Express?

Check credentials in middleware, calling `next()` if valid.

**Example**:
```javascript
const express = require("express");
const app = express();
const auth = (req, res, next) => {
  if (req.headers.authorization === "secret") next();
  else res.status(401).send("Unauthorized");
};
app.get("/protected", auth, (req, res) => res.send("Access granted"));
app.listen(3000);
```

---

### 57. How do you serve static files using Express?

Use `express.static` middleware.

**Example**:
```javascript
const express = require("express");
const app = express();
app.use(express.static("public"));
app.listen(3000); // Serves files from ./public
```

---

### 58. What are template engines, and how can you use one (e.g., Pug) with Express?

Template engines render dynamic HTML. Pug simplifies HTML with indentation.

**Example**:
```javascript
const express = require("express");
const app = express();
app.set("view engine", "pug");
app.get("/", (req, res) => res.render("index", { title: "Home" }));
app.listen(3000);
```
// index.pug
```
html
  head
    title= title
  body
    h1 Hello
```

---

### 59. How do you connect Node.js to a MongoDB database using Mongoose?

Use Mongoose to define schemas and connect to MongoDB.

**Example**:
```javascript
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test");
const User = mongoose.model("User", { name: String });
const user = new User({ name: "Alice" });
user.save().then(() => console.log("Saved"));
```

---

### 60. What is the difference between SQL and NoSQL databases in the context of Node.js?

- **SQL**: Structured, relational (e.g., MySQL).
- **NoSQL**: Flexible, non-relational (e.g., MongoDB).

**Example**:
```javascript
// SQL (mysql2)
const mysql = require("mysql2/promise");
const pool = mysql.createPool({ database: "test" });
pool.query("SELECT * FROM users");

// NoSQL (mongoose)
const User = mongoose.model("User", { name: String });
User.find();
```

---

### 61. How can you perform CRUD operations with Node.js and MySQL?

Use `mysql2` for create, read, update, delete.

**Example**:
```javascript
const mysql = require("mysql2/promise");
const pool = mysql.createPool({ database: "test" });
async function crud() {
  await pool.query("INSERT INTO users (name) VALUES (?)", ["Alice"]); // Create
  const [rows] = await pool.query("SELECT * FROM users"); // Read
  await pool.query("UPDATE users SET name = ? WHERE id = ?", ["Bob", 1]); // Update
  await pool.query("DELETE FROM users WHERE id = ?", [1]); // Delete
}
crud();
```

---

### 62. What is an ORM, and how does Sequelize work with Node.js?

An ORM maps database tables to objects. Sequelize simplifies SQL queries.

**Example**:
```javascript
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");
const User = sequelize.define("User", { name: DataTypes.STRING });
(async () => {
  await sequelize.sync();
  await User.create({ name: "Alice" });
  console.log(await User.findAll());
})();
```

---

### 63. How do you handle database connection errors in Node.js?

Use try-catch or error events.

**Example**:
```javascript
const mongoose = require("mongoose");
mongoose.connect("mongodb://wrong").catch(err => console.error("Connection error:", err));
```

---

### 64. What are the benefits of using connection pooling in Node.js?

Connection pooling reuses database connections, improving performance.

**Example**:
```javascript
const mysql = require("mysql2/promise");
const pool = mysql.createPool({ database: "test", connectionLimit: 10 });
pool.query("SELECT 1"); // Reuses connections
```

---

### 65. How can you prevent SQL injection in Node.js applications?

Use parameterized queries or ORMs.

**Example**:
```javascript
const mysql = require("mysql2/promise");
const pool = mysql.createPool({ database: "test" });
pool.query("SELECT * FROM users WHERE name = ?", ["Alice"]); // Safe
```

---

### 66. What is the role of schema validation in Mongoose?

Schema validation ensures data conforms to defined rules before saving.

**Example**:
```javascript
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({ name: { type: String, required: true } });
const User = mongoose.model("User", userSchema);
new User({}).save().catch(err => console.log(err)); // Validation error
```

---

### 67. How do you implement pagination in a Node.js API with a database?

Use `skip` and `limit` in queries.

**Example**:
```javascript
const mongoose = require("mongoose");
const User = mongoose.model("User", { name: String });
async function getUsers(page = 1, limit = 10) {
  return await User.find().skip((page - 1) * limit).limit(limit);
}
```

---

### 68. What is the difference between findOne and find in Mongoose?

- `findOne`: Returns one document or null.
- `find`: Returns an array of documents.

**Example**:
```javascript
const User = mongoose.model("User", { name: String });
User.findOne({ name: "Alice" }); // { name: "Alice" } or null
User.find({ name: "Alice" }); // [{ name: "Alice" }]
```

---

### 69. What is XSS, and how can you prevent it in a Node.js application?

XSS (Cross-Site Scripting) injects malicious scripts. Prevent by sanitizing inputs and escaping outputs.

**Example**:
```javascript
const express = require("express");
const app = express();
app.get("/", (req, res) => {
  const input = req.query.input || "";
  res.send(`<p>${input.replace(/</g, "&lt;")}</p>`); // Escapes <script>
});
app.listen(3000);
```

---

### 70. How do you implement JWT authentication in Node.js?

Use `jsonwebtoken` to create and verify tokens.

**Example**:
```javascript
const jwt = require("jsonwebtoken");
const secret = "secret";
const token = jwt.sign({ userId: 1 }, secret);
jwt.verify(token, secret, (err, decoded) => console.log(decoded)); // { userId: 1 }
```

---

### 71. What is bcrypt, and how is it used for password hashing?

`bcrypt` securely hashes passwords with salts.

**Example**:
```javascript
const bcrypt = require("bcrypt");
bcrypt.hash("password", 10, (err, hash) => {
  bcrypt.compare("password", hash, (err, match) => console.log(match)); // true
});
```

---

### 72. How can you secure HTTP headers in a Node.js application?

Use `helmet` to set secure headers.

**Example**:
```javascript
const express = require("express");
const helmet = require("helmet");
const app = express();
app.use(helmet());
app.get("/", (req, res) => res.send("Secure"));
app.listen(3000);
```

---

### 73. What is CSRF, and how do you protect against it in Express?

CSRF tricks users into unwanted actions. Protect with `csurf` middleware.

**Example**:
```javascript
const express = require("express");
const csurf = require("csurf");
const app = express();
app.use(csurf());
app.get("/form", (req, res) => res.send(`<form><input name="_csrf" value="${req.csrfToken()}"></form>`));
app.listen(3000);
```

---

### 74. How do you sanitize user input in Node.js?

Use libraries like `sanitize-html` or `validator`.

**Example**:
```javascript
const sanitizeHtml = require("sanitize-html");
const input = "<script>alert('xss')</script>";
console.log(sanitizeHtml(input)); // Sanitized output
```

---

### 75. What are environment variables, and how do you use them securely in Node.js?

Environment variables store sensitive data (e.g., API keys). Use `dotenv` to load them.

**Example**:
```javascript
require("dotenv").config();
console.log(process.env.API_KEY); // From .env file
```

---

### 76. How can you rate-limit API requests in a Node.js application?

Use `express-rate-limit`.

**Example**:
```javascript
const rateLimit = require("express-rate-limit");
const express = require("express");
const app = express();
app.use(rateLimit({ windowMs: 60000, max: 100 }));
app.get("/", (req, res) => res.send("OK"));
app.listen(3000);
```

---

### 77. What is the difference between unit testing and integration testing in Node.js?

- **Unit**: Tests isolated functions.
- **Integration**: Tests interactions between components.

**Example**:
```javascript
// Unit test
function add(a, b) { return a + b; }

// Integration test: API endpoint calling database
```

---

### 78. How do you write a unit test for a Node.js function using Mocha?

Use Mocha and `assert`.

**Example**:
```javascript
const assert = require("assert");
describe("Math", () => {
  it("should add numbers", () => {
    assert.strictEqual(2 + 3, 5);
  });
});
```

---

### 79. What is the role of Chai in Node.js testing?

Chai provides assertion styles (e.g., expect, should).

**Example**:
```javascript
const chai = require("chai");
const expect = chai.expect;
describe("Test", () => {
  it("checks equality", () => {
    expect(2 + 3).to.equal(5);
  });
});
```

---

### 80. How can you mock dependencies in Node.js tests?

Use `sinon` to stub functions.

**Example**:
```javascript
const sinon = require("sinon");
const fs = require("fs");
sinon.stub(fs, "readFileSync").returns("mocked");
console.log(fs.readFileSync("file.txt")); // mocked
fs.readFileSync.restore();
```

---

### 81. What is Supertest, and how is it used for testing Express APIs?

Supertest makes HTTP requests to test Express routes.

**Example**:
```javascript
const request = require("supertest");
const express = require("express");
const app = express();
app.get("/", (req, res) => res.send("OK"));
describe("GET /", () => {
  it("responds with OK", done => {
    request(app).get("/").expect("OK", done);
  });
});
```

---

### 82. How do you measure test coverage in a Node.js project?

Use `nyc` with Mocha.

**Example**:
```bash
npx nyc mocha
```
Reports percentage of code covered by tests.

---

### 83. How can you optimize the performance of a Node.js application?

Profile, use async, cache, and cluster for multi-core.

**Example**:
```javascript
const cache = new Map();
function getData(key) {
  if (cache.has(key)) return cache.get(key);
  const result = /* compute */;
  cache.set(key, result);
  return result;
}
```

---

### 84. What is clustering in Node.js, and how does it improve scalability?

Clustering forks multiple processes to utilize CPU cores.

**Example**:
```javascript
const cluster = require("cluster");
const http = require("http");
if (cluster.isMaster) {
  cluster.fork();
} else {
  http.createServer((req, res) => res.end("Hello")).listen(3000);
}
```

---

### 85. How do you use the pm2 process manager with Node.js?

`pm2` manages processes, restarts, and monitors apps.

**Example**:
```bash
pm2 start app.js
pm2 list
```

---

### 86. What is the difference between horizontal and vertical scaling in Node.js?

- **Horizontal**: Add more servers.
- **Vertical**: Upgrade server resources.

**Example**:
```javascript
// Horizontal: Deploy to multiple nodes
// Vertical: Increase CPU/memory for Node.js process
```

---

### 87. How can you profile a Node.js application for performance bottlenecks?

Use `--prof` or Chrome DevTools.

**Example**:
```bash
node --prof app.js
node --prof-process isolate-*.log
```

---

### 88. What is the role of the worker_threads module in Node.js?

`worker_threads` runs JavaScript in parallel threads.

**Example**:
```javascript
const { Worker, isMainThread } = require("worker_threads");
if (isMainThread) {
  new Worker(__filename);
} else {
  console.log("Worker running");
}
```

---

### 89. How do you implement load balancing for a Node.js server?

Use a reverse proxy (e.g., Nginx) or `cluster`.

**Example**:
```javascript
// Nginx config
// server { listen 80; location / { proxy_pass http://node_app; } }
```

---

### 90. What are the benefits of using a reverse proxy like Nginx with Node.js?

Handles static files, load balancing, and SSL termination.

**Example**:
```javascript
// Node.js serves API, Nginx serves static files
```

---

### 91. What is GraphQL, and how can you implement it in Node.js?

GraphQL is a query language for APIs. Use `apollo-server`.

**Example**:
```javascript
const { ApolloServer, gql } = require("apollo-server");
const typeDefs = gql`type Query { hello: String }`;
const resolvers = { Query: { hello: () => "World" } };
const server = new ApolloServer({ typeDefs, resolvers });
server.listen();
```

---

### 92. How do you set up WebSocket communication in Node.js using ws?

Use the `ws` module for real-time communication.

**Example**:
```javascript
const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 3000 });
wss.on("connection", ws => {
  ws.send("Hello");
});
```

---

### 93. What is the role of the child_process module in Node.js?

`child_process` spawns subprocesses.

**Example**:
```javascript
const { exec } = require("child_process");
exec("ls", (err, stdout) => console.log(stdout));
```

---

### 94. How can you deploy a Node.js application to AWS?

Use EC2, Elastic Beanstalk, or Lambda.

**Example**:
```bash
# Deploy to Elastic Beanstalk
eb init
eb deploy
```

---

### 95. What is serverless architecture, and how does Node.js fit into it?

Serverless runs functions on-demand (e.g., AWS Lambda). Node.js is lightweight, ideal for serverless.

**Example**:
```javascript
exports.handler = async event => {
  return { statusCode: 200, body: "Hello" };
};
```

---

### 96. How do you handle memory leaks in Node.js?

Profile with heap snapshots, avoid global variables, clear timers.

**Example**:
```javascript
const heapdump = require("heapdump");
heapdump.writeSnapshot(); // Analyze in Chrome DevTools
```

---

### 97. What is the purpose of the vm module in Node.js?

The `vm` module executes JavaScript in a sandboxed context.

**Example**:
```javascript
const vm = require("vm");
vm.runInNewContext('console.log("Isolated")');
```

---

### 98. How can you implement microservices with Node.js?

Use Express for APIs, communicate via HTTP or message queues.

**Example**:
```javascript
const express = require("express");
const app = express();
app.get("/service1", (req, res) => res.send("Microservice 1"));
app.listen(3001);
```

---

### 99. What are some common debugging techniques for Node.js applications?

Use `console.log`, `--inspect`, or VS Code debugger.

**Example**:
```bash
node --inspect app.js
```

---

### 100. How do you stay updated with the latest Node.js features and best practices?

Follow Node.js blog, GitHub, conferences, and communities (e.g., X).

**Example**:
```javascript
// Check Node.js version for new features
console.log(process.version);
```
