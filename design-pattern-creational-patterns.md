## Creation Design Pattern

### Singleton Design Pattern

The **Singleton Pattern** is a creational design pattern that ensures a class has only one instance and provides a global point of access to that instance.

---

#### TypeScript Implementation

```ts
class MySingleton {
  private static instance: MySingleton | null = null;
  private static readonly locker = {}; // Simple lock mechanism

  // Private constructor prevents direct instantiation
  private constructor() {}

  public static getInstance(): MySingleton {
    if (MySingleton.instance === null) {
      // Thread-safe implementation (simplified for TypeScript)
      if (MySingleton.instance === null) {
        MySingleton.instance = new MySingleton();
      }
    }
    return MySingleton.instance;
  }

  // Example method
  public doSomething(): void {
    console.log("Singleton instance is working!");
  }
}

// Usage
const instance1 = MySingleton.getInstance();
const instance2 = MySingleton.getInstance();

console.log(instance1 === instance2); // Output: true (same instance)
instance1.doSomething(); // Output: Singleton instance is working!

--- 
**How it Works**
- **Private Constructor**: Prevents direct instantiation with new MySingleton().
- **Static Instance**: Holds the single instance of the class.
- **Static Method**: getInstance() provides controlled access to the instance.
- **Lazy Initialization**: Instance is created only when first requested.
- **Thread Safety**: The double-check locking pattern prevents multiple instances in concurrent environments.

**Real-World Scenarios**
1. Database Connection Manager

```js

class DatabaseManager {
  private static instance: DatabaseManager;
  private connection: string;

  private constructor() {
    this.connection = "Connected to Database";
  }

  public static getInstance(): DatabaseManager {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager();
    }
    return DatabaseManager.instance;
  }

  public query(sql: string): void {
    console.log(`Executing: ${sql}`);
  }
}

// All parts of application use same database connection
const db1 = DatabaseManager.getInstance();
const db2 = DatabaseManager.getInstance();
console.log(db1 === db2); // true - same instance
```
2. Logger System
```js
class Logger {
  private static instance: Logger;

  private constructor() {}

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public log(message: string): void {
    console.log(`[${new Date().toISOString()}] ${message}`);
  }
}

// Same logger instance used throughout application
const logger1 = Logger.getInstance();
const logger2 = Logger.getInstance();
logger1.log("Application started"); // Both reference same logger

```

3. Configuration Manager

```js
class ConfigManager {
  private static instance: ConfigManager;
  private config: { [key: string]: string } = {};

  private constructor() {
    // Load configuration from file/environment
    this.config = {
      apiUrl: "https://api.example.com",
      timeout: "5000"
    };
  }

  public static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  public get(key: string): string {
    return this.config[key];
  }
}

// Same configuration accessed everywhere
const config1 = ConfigManager.getInstance();
const config2 = ConfigManager.getInstance();
console.log(config1.get("apiUrl")); // Same config data

```
4. Print Spooler
```js
class PrintSpooler {
  private static instance: PrintSpooler;
  private queue: string[] = [];

  private constructor() {}

  public static getInstance(): PrintSpooler {
    if (!PrintSpooler.instance) {
      PrintSpooler.instance = new PrintSpooler();
    }
    return PrintSpooler.instance;
  }

  public addJob(document: string): void {
    this.queue.push(document);
    console.log(`Added to print queue: ${document}`);
  }

  public printNext(): void {
    const job = this.queue.shift();
    if (job) {
      console.log(`Printing: ${job}`);
    }
  }
}

// All print requests go through same spooler
const spooler1 = PrintSpooler.getInstance();
const spooler2 = PrintSpooler.getInstance();
spooler1.addJob("Document1.pdf");
spooler2.printNext(); // Same queue, same instance
```

# When to Use Singleton

## ✅ Good for:
- Database connections  
- Logging systems  
- Configuration settings  
- Cache managers  
- Print spoolers  

## ❌ Avoid when:
- You need multiple instances  
- Testing becomes difficult  
- It introduces global state (can make code harder to test)  

> **Key Point:**  
> Singleton ensures one instance exists globally, but use it carefully as it can make code tightly coupled and harder to test.
