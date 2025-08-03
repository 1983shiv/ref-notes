## Node.js/Express TypeScript Testing Cheat Sheet
Here’s a comprehensive Markdown cheat sheet for backend testing in Node.js/Express with TypeScript, using Jest, Supertest, ts-jest, ts-node, Vitest, and mongodb-memory-server. This covers all common combinations for unit, integration, mocking/stubbing, HTTP request simulation, and assertions

### Installation Example (with Jest + Supertest + TypeScript)
```bash
npm install --save-dev jest supertest ts-jest @types/jest @types/supertest
```
### Set up Jest config:

```bash
npx ts-jest config:init

```

### Suggested Project Structure
```bash
/src
  /routes
  /controllers
  /services
  /models
  app.ts
/tests
  app.test.ts
  routes/
  services/
```


1. Setup Imports
```js
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import app from '../src/app'; // Your Express app
import { jest } from '@jest/globals'; // For Jest mocking
```

2. Jest Setup (with ts-jest/ts-node)
```js
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
};
```

3. MongoDB Memory Server Setup
```js
let mongo: MongoMemoryServer;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

beforeEach(async () => {
  // Clean DB before each test
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});
```

4. Unit Test Example (Jest/Vitest)
```js
import { sum } from '../src/utils/sum';

test('adds numbers', () => {
  expect(sum(1, 2)).toBe(3);
});
```

5. Integration Test Example (Supertest + Express)
```js
describe('POST /api/users', () => {
  it('creates a user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ name: 'Alice', email: 'alice@example.com' })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Alice');
  });
});
```

6. Mocking & Stubbing (Jest)
```js
import * as emailService from '../src/services/emailService';

jest.mock('../src/services/emailService');

test('calls sendEmail', async () => {
  (emailService.sendEmail as jest.Mock).mockResolvedValue(true);
  // ... call function that triggers sendEmail
  expect(emailService.sendEmail).toHaveBeenCalledWith('test@example.com', expect.any(String));
});
```

7. HTTP Request Simulation (Supertest)
```js
await request(app).get('/api/items').expect(200);
await request(app).post('/api/items').send({ name: 'Item' }).expect(201);
await request(app).put('/api/items/123').send({ name: 'Updated' }).expect(200);
await request(app).delete('/api/items/123').expect(204);
```

8. Assertions (Jest/Vitest)
```js
expect(value).toBe(42);
expect(value).not.toBeNull();
expect(array).toContain('item');
expect(object).toHaveProperty('key');
expect(fn).toHaveBeenCalled();
await expect(Promise.reject('err')).rejects.toBe('err');
```

9. Vitest Syntax
```js
import { describe, it, expect, beforeEach } from 'vitest';

describe('sum', () => {
  it('adds numbers', () => {
    expect(1 + 2).toBe(3);
  });
});
```

10. All-in-One Example
```js
describe('User API', () => {
  beforeAll(async () => {
    mongo = await MongoMemoryServer.create();
    await mongoose.connect(mongo.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongo.stop();
  });

  beforeEach(async () => {
    await mongoose.connection.db.dropDatabase();
  });

  it('registers a user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ name: 'Bob', email: 'bob@example.com' })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Bob');
  });

  it('returns 400 for invalid input', async () => {
    await request(app)
      .post('/api/users')
      .send({ email: 'no-name@example.com' })
      .expect(400);
  });
});
```

11. Mocking Date/Time
```js
jest.useFakeTimers().setSystemTime(new Date('2023-01-01'));
```

12. Spying on Functions
```js
const spy = jest.spyOn(service, 'method');
expect(spy).toHaveBeenCalled();
```

13. Testing Error Handling
```js
it('handles errors', async () => {
  await request(app)
    .get('/api/error')
    .expect(500);
});
```

14. Testing Middleware
```js
it('requires auth', async () => {
  await request(app)
    .get('/api/protected')
    .expect(401);
});
```

15. Snapshot Testing
```js
test('matches snapshot', () => {
  expect({ foo: 'bar' }).toMatchSnapshot();
});
```

16. Table of Common Combinations
## Test Setup Matrix

| Setup       | DB (Memory)           | HTTP (Supertest)   | Mock/Stub (Jest)     | Assertion (Jest/Vitest)    |
|-------------|------------------------|---------------------|------------------------|------------------------------|
| `beforeAll` | connect                | -                   | `jest.mock`           | `expect().toBe`             |
| `beforeEach`| clean DB              | -                   | `jest.spyOn`          | `expect().toHaveProperty`   |
| `test/it`   | -                      | `request(app)`      | `jest.fn`             | `expect().toContain`        |
| `afterAll`  | disconnect             | -                   | `jest.clearAll`       | `expect().rejects`          |

---

## Tips

- Use [`mongodb-memory-server`](https://github.com/nodkz/mongodb-memory-server) for isolated DB tests.
- Use [Supertest](https://github.com/visionmedia/supertest) for HTTP simulation.
- Use `jest.mock` / `jest.spyOn` for mocking and stubbing.
- Use `expect` for all assertions (`toBe`, `toContain`, `toHaveProperty`, etc).
- Use `beforeAll`, `beforeEach`, and `afterAll` for setup and teardown.
