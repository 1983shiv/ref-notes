## Design Pattern
---

### 🧩 What is a **Design Pattern** in Software Development?

In simple words:

> **A design pattern is a general, reusable solution to a common problem in software design.**

It’s like a **recipe or guideline** that developers use to solve problems that come up often when writing code.

---

### 🛠 Why do we need them?

* To **write better code** (cleaner, reusable, easier to maintain)
* To **avoid reinventing the wheel**
* To **communicate ideas easily** between developers (everyone understands the same pattern)

---

### 🏠 Real-life analogy:

Imagine you're an architect building houses.

* You don’t design a completely new door every time.
* You use a **standard door design** that works well and is easy to install.

Similarly, in programming, design patterns are **tried-and-tested solutions** for building software components.

---

### 🧠 Categories of Design Patterns:

1. **Creational Patterns** – how objects are created
   Example: **Singleton**, **Factory**

2. **Structural Patterns** – how objects are organized/connected
   Example: **Adapter**, **Decorator**

3. **Behavioral Patterns** – how objects communicate and behave
   Example: **Observer**, **Strategy**

---

### 🔧 Example: Singleton Pattern

**Problem:** You want only **one instance** of a class (e.g., a settings manager).

```ts
class Singleton {
  private static instance: Singleton;

  private constructor() {}  // Prevent direct construction

  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }

  public log(): void {
    console.log("Logging from Singleton instance");
  }
}

// Usage
const a = Singleton.getInstance();
const b = Singleton.getInstance();

console.log(a === b);  // true
a.log();               // Logging from Singleton instance

```

---

### 🧠 Summary:

* **Design patterns are not code** – they are **ideas or templates**.
* They **save time**, **make code cleaner**, and **help teams work together better**.
* Knowing patterns helps you write **professional-quality software**.

---



### Classes

A **class** is a blueprint for creating objects in object-oriented programming. It defines the properties (fields) and behaviors (methods) that the objects created from the class will have.

**How it works:**
- A class defines the structure and behavior of objects.
- You can create multiple objects (instances) from a single class.
- Each object has its own data but shares the same methods defined in the class.

**Example:**
```ts
class User {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  sayHello(): void {
    console.log(`Hello, my name is ${this.name}`);
  }
}

// Creating objects from the class
const user1 = new User("Alice");
const user2 = new User("Bob");

user1.sayHello(); // Output: Hello, my name is Alice
user2.sayHello(); // Output: Hello, my name is Bob
```
Key Points:

- Classes help organize code by grouping related data and functions together.
- They support code reuse and make it easier to manage complex programs.
- Classes are the foundation of object-oriented design.

### Coupling 
### Abstraction

### Interface

### Inheritance

## Polymorphism
In programming, polymorphism allows the same action or function to behave differently based on the object it’s acting on.

Polymorphism allows you to treat objects of different classes that share a common parent (interface or abstract class) as if they are the same type.
You can call the same method (draw) on different objects (TextBox, CheckBox), and each will execute its own version.

**How it works:**
- drawUIControl accepts any UIControl (parent type).
- At runtime, the correct draw() method is called based on the actual object type (CheckBox or TextBox).

```js
abstract class UIControl {
  enable(): void {
    console.log("Enabled");
  }
  abstract draw(): void;
}

class TextBox extends UIControl {
  draw(): void {
    console.log("Drawing a textbox");
  }
}

class CheckBox extends UIControl {
  draw(): void {
    console.log("Drawing a checkbox");
  }
}

function drawUIControl(control: UIControl): void {
  control.draw();
}

// Example usage:
drawUIControl(new CheckBox()); // Output: Drawing a checkbox
drawUIControl(new TextBox());  // Output: Drawing a textbox

```

**Key Points:**
- abstract class UIControl defines a contract for all UI controls.
- TextBox and CheckBox implement their own draw() method.
- drawUIControl accepts any UIControl and calls draw()—demonstrating polymorphism.
- At runtime, the correct draw() is called based on the actual object passed.

***This is classic polymorphism: one interface, many implementations, and the correct method is chosen at runtime.***

## SOLID
Great question!
**SOLID** is an acronym for **five key principles** of object-oriented programming and software design. These principles help you write **clean, maintainable, and scalable** code.

---

### 🧱 What does **SOLID** stand for?

| Letter | Principle                           | Simple Meaning                                                                         |
| ------ | ----------------------------------- | -------------------------------------------------------------------------------------- |
| **S**  | **Single Responsibility Principle** | A class should have **only one reason to change**. Keep it focused.                    |
| **O**  | **Open/Closed Principle**           | Code should be **open for extension**, but **closed for modification**.                |
| **L**  | **Liskov Substitution Principle**   | Subclasses should be usable **without breaking** the parent class’s behavior.          |
| **I**  | **Interface Segregation Principle** | Don’t force classes to implement **unused methods**. Prefer small, focused interfaces. |
| **D**  | **Dependency Inversion Principle**  | Depend on **abstractions**, not on concrete implementations.                           |

---

### 🔍 Simple Breakdown with Examples:

---

#### **S – Single Responsibility Principle (SRP)**

> ✅ One class = One job.

```ts
class InvoicePrinter {
  print(invoice: string): void {
    console.log(invoice);
  }
}
```

---

#### **O – Open/Closed Principle (OCP)**

> ✅ You can add new features without changing existing code.

```ts
interface Shape {
  getArea(): number;
}

class Circle implements Shape {
  constructor(private radius: number) {}
  getArea(): number {
    return Math.PI * this.radius * this.radius;
  }
}

class Square implements Shape {
  constructor(private side: number) {}
  getArea(): number {
    return this.side * this.side;
  }
}

function printArea(shape: Shape) {
  console.log(shape.getArea());
}
```

---

#### **L – Liskov Substitution Principle (LSP)**

> ✅ Subclasses must be usable as their parent types.

```ts
class Bird {
  fly(): void {
    console.log("Flying");
  }
}

class Eagle extends Bird {}

function letBirdFly(bird: Bird) {
  bird.fly();
}
letBirdFly(new Eagle());  // ✅ OK
```

---

#### **I – Interface Segregation Principle (ISP)**

> ✅ Don’t force classes to implement things they don’t need.

```ts
interface Printer {
  print(): void;
}

interface Scanner {
  scan(): void;
}

class SimplePrinter implements Printer {
  print(): void {
    console.log("Printing...");
  }
}
```

---

#### **D – Dependency Inversion Principle (DIP)**

> ✅ High-level modules shouldn't depend on low-level ones directly.

```ts
interface MessageSender {
  send(message: string): void;
}

class EmailSender implements MessageSender {
  send(message: string): void {
    console.log("Email sent: " + message);
  }
}

class Notification {
  constructor(private sender: MessageSender) {}

  notifyUser(message: string): void {
    this.sender.send(message);
  }
}

const sender = new EmailSender();
const notification = new Notification(sender);
notification.notifyUser("Hello");
```

---

### ✅ Summary:

| Principle | Meaning in 1 Line                                 |
| --------- | ------------------------------------------------- |
| **S**     | One class = one job                               |
| **O**     | Extend code, don’t modify existing                |
| **L**     | Subtypes should fit anywhere their parent is used |
| **I**     | Small, focused interfaces                         |
| **D**     | Depend on abstractions, not concrete code         |

---

Let me know if you want a visual chart or a mini project example using all 5 principles!


### Single Responsibility Principle (SRP)

The Single Responsibility Principle states that a class should have only one reason to change, meaning it should have only one job or responsibility.

**Why is it important?**
- Makes code easier to understand and maintain.
- Reduces the risk of bugs when making changes.
- Encourages separation of concerns.

**Example:**
```ts
// Bad: User class handles both user data and saving to database
class User {
  constructor(public name: string) {}
  saveToDatabase() {
    // database logic here
  }
}
// or
class Report {
  getData(): string {
    return "Data";
  }

  formatReport(data: string): string {
    return `Formatted: ${data}`;
  }

  sendEmail(report: string): void {
    console.log(`Email sent with report: ${report}`);
  }
}



// Good: Separate responsibilities into different classes
class User {
  constructor(public name: string) {}
}

class UserRepository {
  save(user: User) {
    // database logic here
  }
}

// or

class DataFetcher {
  getData(): string {
    return "Data";
  }
}

class ReportFormatter {
  format(data: string): string {
    return `Formatted: ${data}`;
  }
}

class EmailSender {
  send(report: string): void {
    console.log(`Email sent with report: ${report}`);
  }
}

// Usage
const fetcher = new DataFetcher();
const formatter = new ReportFormatter();
const sender = new EmailSender();

const data = fetcher.getData();
const report = formatter.format(data);
sender.send(report);


```

**Key Point:**
Each class should do one thing only. If a class has more than one responsibility, split it into smaller classes.


