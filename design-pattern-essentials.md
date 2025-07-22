## Table of Contents

1. [Design Pattern](#design-pattern)
    - What is a Design Pattern?
    - Why do we need them?
    - Real-life analogy
    - Categories of Design Patterns
    - Example: Singleton Pattern
    - Summary

2. [Classes](#classes)

3. [Coupling](#coupling)
    - Types of Coupling
    - Example

4. [Encapsulation](#encapsulation)
    - Why use encapsulation?
    - How it works
    - Example
    - Key Points

5. [Abstraction](#abstraction)
    - Why use abstraction?
    - How it works
    - Example
    - Key Points

6. [Difference between Encapsulation and Abstraction](#difference-between-encapsulation-and-abstraction)
    - Abstraction
    - Encapsulation
    - In Short
    - Summary Table

7. [Interface](#interface)
    - Why use interfaces?
    - How it works
    - Example
    - Key Points

8. [Inheritance](#inheritance)
    - Why use inheritance?
    - How it works
    - Example
    - Key Points

9. [Polymorphism](#polymorphism)
    - How it works
    - Example
    - Key Points

10. [SOLID Principles](#solid)
    - What does SOLID stand for?
    - Simple Breakdown with Examples
    - Summary

11. [Single Responsibility Principle (SRP) in detail](#single-responsibility-principle-srp)
    - Why is it important?
    - Example
    - Key Point


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

**Coupling** refers to the degree of direct dependency between different modules, classes, or components in a software system.

**Types of Coupling:**
- **Tight Coupling:**  
  When one class or module is highly dependent on the details of another. Changes in one often require changes in the other. This makes code harder to maintain and test.
- **Loose Coupling:**  
  When classes or modules interact through simple interfaces or abstractions, minimizing dependencies. This makes code more flexible, reusable, and easier to maintain.

**Why is loose coupling important?**
- Makes code easier to change and extend.
- Improves testability (you can swap out dependencies).
- Encourages separation of concerns.

**Example:**
```ts
// Tight coupling (bad)
class Engine {
  start() { console.log("Engine started"); }
}
class Car {
  engine: Engine;
  constructor() { this.engine = new Engine(); }
  drive() { this.engine.start(); }
}

// Loose coupling (good)

// index.js
import TaxCalculator2024 from "./classes/TaxCalculator2024.js";
import TaxCalculator2025 from "./classes/TaxCalculator2025.js";

let calculateTaxin2024 = new TaxCalculator2024()
console.log(calculateTaxin2024.calculateTax(12_00_000))
console.log(calculateTaxin2024.calculateInsurance(12_00_000))

let calculateTaxin2025 = new TaxCalculator2025()
console.log(calculateTaxin2025.calculateTax(12_00_000))

export default interface TaxCalculator{
    calculateTax(totalIncome: number): number;
}

import TaxCalculator from "../interface/TaxCalculator"
export default class TaxCalculator2025 implements TaxCalculator {
    calculateTax(totalIncome: number): number {
        return totalIncome*0.4;
    }
     
}

import TaxCalculator from "../interface/TaxCalculator"
export default class TaxCalculator2024 implements TaxCalculator {
    calculateTax(totalIncome: number): number {
        return totalIncome*0.3;
    }
    calculateInsurance(InsuredAmt: number): number{
        return InsuredAmt*.121;
    }
}

// Or

interface IEngine {
  start(): void;
}
class PetrolEngine implements IEngine {
  start() { console.log("Petrol engine started"); }
}
class Car2 {
  engine: IEngine;
  constructor(engine: IEngine) { this.engine = engine; }
  drive() { this.engine.start(); }
}
const myCar = new Car2(new PetrolEngine());
myCar.drive(); // Output: Petrol engine started

// or


```

**Key Points:**

- Aim for loose coupling by using interfaces, dependency injection, and abstraction.
- Loose coupling leads to more maintainable, scalable, and robust code.


### Encapsulation

**Encapsulation** is an object-oriented programming concept that involves bundling data (properties) and methods (functions) that operate on that data into a single unit (class), and restricting direct access to some of the object's components.

**Why use encapsulation?**
- Protects the internal state of an object from unintended or harmful changes.
- Only allows data to be changed in controlled ways, through methods.
- Makes code easier to maintain and debug.

**How it works:**
- Use access modifiers like `private`, `protected`, and `public` to control access to class members.
- Provide public methods (getters/setters) to read or modify private data safely.

**Example (TypeScript):**
```ts
class BankAccount {
  private balance: number;

  constructor(initialBalance: number) {
    this.balance = initialBalance;
  }

  deposit(amount: number): void {
    if (amount > 0) {
      this.balance += amount;
    }
  }

  withdraw(amount: number): void {
    if (amount > 0 && amount <= this.balance) {
      this.balance -= amount;
    }
  }

  getBalance(): number {
    return this.balance;
  }
}

const account = new BankAccount(1000);
account.deposit(500);
account.withdraw(200);
console.log(account.getBalance()); // Output: 1300
// account.balance = 0; // ❌ Error: Property 'balance' is private
```

**Key Points:**

- Encapsulation hides the internal state and requires all  interaction to be performed through an object's methods.
- Prevents external code from directly changing important data.
- Makes your code more robust, secure, and easier to understand.


### Abstraction

**Abstraction** is an object-oriented programming concept that focuses on exposing only the essential features of an object while hiding the complex implementation details.

**Why use abstraction?**
- Simplifies complex systems by modeling classes based on real-world objects.
- Helps you focus on what an object does instead of how it does it.
- Makes code easier to use, maintain, and extend.

**How it works:**
- You define abstract classes or interfaces that specify what methods or properties a class should have, but not how they are implemented.
- Concrete classes then implement these methods, providing the actual behavior.

**Example (TypeScript):**
```ts
abstract class Animal {
  abstract makeSound(): void; // Abstract method (no implementation)
  move(): void {
    console.log("Moving...");
  }
}

class Dog extends Animal {
  makeSound(): void {
    console.log("Woof!");
  }
}

const myDog = new Dog();
myDog.makeSound(); // Output: Woof!
myDog.move();      // Output: Moving...
```
**Key Points:**

- Abstraction lets you define a blueprint (what to do), not the details (how to do it).
- Abstract classes and interfaces are tools for abstraction.
- Users of a class interact with its public interface, not its internal workings.
- Abstraction reduces complexity and increases reusability.


### Difference between Encapsulation and Abstraction

**Abstraction** and **Encapsulation** are both fundamental concepts in object-oriented programming, but they serve different purposes:

---

#### Abstraction

- **What it is:**  
  Abstraction is about hiding complex implementation details and showing only the essential features of an object.
- **Purpose:**  
  To reduce complexity and allow the programmer to focus on what an object does instead of how it does it.
- **How:**  
  Achieved using abstract classes and interfaces.
- **Example:**  
  A `Car` class exposes methods like `drive()` and `brake()`, but hides the internal engine logic.

---

#### Encapsulation

- **What it is:**  
  Encapsulation is about bundling data (properties) and methods (functions) that operate on the data into a single unit (class), and restricting direct access to some of the object's components.
- **Purpose:**  
  To protect the internal state of an object and only allow it to be changed in controlled ways.
- **How:**  
  Achieved using access modifiers like `private`, `protected`, and `public`.
- **Example:**  
  A `BankAccount` class has a private `balance` property and public methods `deposit()` and `withdraw()` to modify it safely.

---

#### In Short

- **Abstraction** = Hides unnecessary details, shows only what’s relevant.
- **Encapsulation** = Hides the internal state, protects data, and exposes only safe operations.

---

**Summary Table:**

| Concept         | Focuses On                        | Achieved By                | Example                        |
|-----------------|-----------------------------------|----------------------------|--------------------------------|
| Abstraction     | Hiding complexity, showing intent | Interfaces, abstract class | `Car.drive()`                  |
| Encapsulation   | Hiding data, protecting state     | Access modifiers,

### Interface

An **interface** is a programming construct that defines a contract or a set of rules for classes to follow. It specifies what methods or properties a class must have, but not how they are implemented.

**Why use interfaces?**
- Ensures consistency: Different classes can implement the same interface, guaranteeing they provide the required methods.
- Supports polymorphism: Code can work with any object that implements the interface, regardless of its class.
- Encourages loose coupling: Classes depend on abstractions (interfaces), not concrete implementations.

**How it works:**
- You define an interface with method signatures (no method bodies).
- Any class that implements the interface must provide concrete implementations for all its methods.

**Example (TypeScript):**
```ts
interface Drawable {
  draw(): void;
}

class Circle implements Drawable {
  draw(): void {
    console.log("Drawing a circle");
  }
}

class Square implements Drawable {
  draw(): void {
    console.log("Drawing a square");
  }
}

function renderShape(shape: Drawable) {
  shape.draw();
}

renderShape(new Circle()); // Output: Drawing a circle
renderShape(new Square()); // Output: Drawing a square
```
**Key Points:**

- Interfaces define "what" a class should do, not "how" it should do it.
- Multiple classes can implement the same interface in their own way.
- Interfaces help make code more flexible, reusable, and maintainable.


### Inheritance

**Inheritance** is a core concept in object-oriented programming that allows one class (called a child or subclass) to inherit properties and methods from another class (called a parent or superclass).

**Why use inheritance?**
- Promotes code reuse: common logic is written once in the parent class and shared by all subclasses.
- Helps organize code in a hierarchical way (general → specific).

**How it works:**
- The child class automatically gets all the methods and properties of the parent class.
- The child class can also add its own methods or override (replace) methods from the parent.

**Example:**
```ts
// Parent class
class Animal {
  move(): void {
    console.log("Moving...");
  }
}

// Child class inherits from Animal
class Dog extends Animal {
  bark(): void {
    console.log("Woof!");
  }
}

const dog = new Dog();
dog.move(); // Output: Moving...   (inherited from Animal)
dog.bark(); // Output: Woof!      (defined in Dog)

```
**Key Points:**

- Use extends keyword in TypeScript/JavaScript to create inheritance.
- Subclasses can use or override parent methods.
- Inheritance helps avoid code duplication and makes code easier to maintain.



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


