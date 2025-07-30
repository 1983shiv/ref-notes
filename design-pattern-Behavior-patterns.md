# Behavioral Design Patterns

Behavioral design patterns are concerned with the assignment of responsibilities between objects and how they communicate.

## List of Behavioral Design Patterns

1. **Chain of Responsibility**
   - Passes a request along a chain of handlers.
   - Each handler decides either to process the request or pass it to the next handler.

2. **Command**
   - Encapsulates a request as an object, thereby allowing for parameterization and queuing of requests.

3. **Interpreter**
   - Provides a way to evaluate language grammar or expression.
   - Used to interpret sentences in a language.

4. **Iterator**
   - Provides a way to access elements of a collection sequentially without exposing the underlying representation.

5. **Mediator**
   - Defines an object that centralizes communication between a set of objects to promote loose coupling.

6. **Memento** (#memento-desing-pattern)
   - Captures and restores an object’s internal state without violating encapsulation.

7. **Observer**
   - Defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified.

8. **State**
   - Allows an object to change its behavior when its internal state changes.

9. **Strategy** (#strategy-design-pattern)
   - Defines a family of algorithms, encapsulates each one, and makes them interchangeable.

10. **Template Method**
    - Defines the skeleton of an algorithm in a method, deferring some steps to subclasses.

11. **Visitor**
    - Lets you define a new operation without changing the classes of the elements on which it operates.

---

### Memento Design Pattern

The **Memento Pattern** is a behavioral design pattern that lets you capture and externalize an object's internal state so that the object can be restored to this state later, without violating encapsulation.  


It's commonly used for undo/redo functionality.

---

#### TypeScript Example

```ts
// EditorState (Memento)
class EditorState {
  constructor(private readonly content: string) {}
  getContent(): string {
    return this.content;
  }
}

// Editor (Originator)
class Editor {
  private content: string = "";

  createState(): EditorState {
    return new EditorState(this.content);
  }

  restore(state: EditorState): void {
    this.content = state.getContent();
  }

  getContent(): string {
    return this.content;
  }

  setContent(content: string): void {
    this.content = content;
  }
}

// History (Caretaker)
class History {
  private states: EditorState[] = [];

  push(state: EditorState): void {
    this.states.push(state);
  }

  pop(): EditorState | undefined {
    return this.states.pop();
  }
}

// Usage (Main)
const editor = new Editor();
const history = new History();

editor.setContent("a");
history.push(editor.createState());

editor.setContent("b");
history.push(editor.createState());

editor.setContent("c");
editor.restore(history.pop()!);

console.log(editor.getContent()); // Output: b

```

**How the Memento Pattern Works**
- Originator (Editor): The object whose state needs to be saved and restored.
- Memento (EditorState): Stores the internal state of the originator.
- Caretaker (History): Keeps track of the memento objects but never modifies them.

***In this example:***
- The editor's content is changed several times.
- Each time, the state is saved to history.
- When needed, the editor can restore its previous state from history (undo).

**Key Point:**
The memento pattern allows undo/redo functionality without exposing the internal details of the object.



### Strategy Design Pattern
Defines a family of algorithm, put them into a seperate classes so that they can be change at run time.

# Strategy Pattern Summary

## When to Use

The **Strategy Pattern** is essential when you need to:

- Choose algorithms at runtime
- Avoid complex conditional statements
- Make algorithms interchangeable
- Add new algorithms without modifying existing code

---

## ✅ Key Benefits

- Eliminates conditional statements
- Follows the **Open/Closed Principle**
- Promotes **composition over inheritance**
- Makes algorithms interchangeable
- Easy to test individual strategies

---

## 🔑 Key Principles

- **Encapsulate what varies**
- **Favor composition over inheritance**
- **Code to interfaces, not implementations**
- **Follow the Single Responsibility Principle**

# When to Identify Strategy Pattern

## ✅ Look for These Characteristics:

- Multiple ways to perform the same task  
- Long `if/else` or `switch` statements for algorithm selection  
- Similar classes that differ only in behavior  
- Need to change algorithms at runtime  
- Want to isolate algorithm implementation details  

---

## 💡 Common Naming Patterns:

- `Strategy` (e.g., `PaymentStrategy`, `SortingStrategy`)  
- `Behavior` (e.g., `MovementBehavior`, `RenderBehavior`)  
- `Algorithm` (e.g., `CompressionAlgorithm`, `EncryptionAlgori

---

# Strategy Pattern is Good For

Use the **Strategy Pattern** in scenarios such as:

- ✅ Payment processing systems  
- ✅ Sorting/searching algorithms  
- ✅ Validation logic  
- ✅ Rendering engines  
- ✅ Compression algorithms  
- ✅ Pricing strategies  
- ✅ Authentication methods  


### TypeScript Implementation
```ts
// --- Strategy Interface for Walk ---
interface WalkableRobot {
  walk(): void;
}

// --- Concrete Strategies for Walk ---
class NormalWalk implements WalkableRobot {
  walk(): void {
    console.log("Walking normally...");
  }
}

class NoWalk implements WalkableRobot {
  walk(): void {
    console.log("Cannot walk.");
  }
}

// --- Strategy Interface for Talk ---
interface TalkableRobot {
  talk(): void;
}

// --- Concrete Strategies for Talk ---
class NormalTalk implements TalkableRobot {
  talk(): void {
    console.log("Talking normally...");
  }
}

class NoTalk implements TalkableRobot {
  talk(): void {
    console.log("Cannot talk.");
  }
}

// --- Strategy Interface for Fly ---
interface FlyableRobot {
  fly(): void;
}

class NormalFly implements FlyableRobot {
  fly(): void {
    console.log("Flying normally...");
  }
}

class NoFly implements FlyableRobot {
  fly(): void {
    console.log("Cannot fly.");
  }
}

// --- Robot Base Class ---
abstract class Robot {
  protected walkBehavior: WalkableRobot;
  protected talkBehavior: TalkableRobot;
  protected flyBehavior: FlyableRobot;

  constructor(w: WalkableRobot, t: TalkableRobot, f: FlyableRobot) {
    this.walkBehavior = w;
    this.talkBehavior = t;
    this.flyBehavior = f;
  }

  walk(): void {
    this.walkBehavior.walk();
  }

  talk(): void {
    this.talkBehavior.talk();
  }

  fly(): void {
    this.flyBehavior.fly();
  }

  // Allow changing strategies at runtime
  setWalkBehavior(walkBehavior: WalkableRobot): void {
    this.walkBehavior = walkBehavior;
  }

  setTalkBehavior(talkBehavior: TalkableRobot): void {
    this.talkBehavior = talkBehavior;
  }

  setFlyBehavior(flyBehavior: FlyableRobot): void {
    this.flyBehavior = flyBehavior;
  }

  abstract projection(): void; // Abstract method for subclasses
}

// --- Concrete Robot Types ---
class CompanionRobot extends Robot {
  constructor(w: WalkableRobot, t: TalkableRobot, f: FlyableRobot) {
    super(w, t, f);
  }

  projection(): void {
    console.log("Displaying friendly companion features...");
  }
}

class WorkerRobot extends Robot {
  constructor(w: WalkableRobot, t: TalkableRobot, f: FlyableRobot) {
    super(w, t, f);
  }

  projection(): void {
    console.log("Displaying worker efficiency stats...");
  }
}

// --- Usage Example ---
const robot1 = new CompanionRobot(new NormalWalk(), new NormalTalk(), new NoFly());
robot1.walk();        // Output: Walking normally...
robot1.talk();        // Output: Talking normally...
robot1.fly();         // Output: Cannot fly.
robot1.projection();  // Output: Displaying friendly companion features...

console.log("--------------------");

const robot2 = new WorkerRobot(new NoWalk(), new NoTalk(), new NormalFly());
robot2.walk();        // Output: Cannot walk.
robot2.talk();        // Output: Cannot talk.
robot2.fly();         // Output: Flying normally...
robot2.projection();  // Output: Displaying worker efficiency stats...

// Changing behavior at runtime
robot1.setFlyBehavior(new NormalFly());
robot1.fly();         // Output: Flying normally...

```

**10 Real-World Scenarios**
# Table of Contents

1. [Payment Processing System](#payment-processing-system)  
2. [Sorting Algorithm Strategy](#sorting-algorithm-strategy)  
3. [Validation Strategy](#validation-strategy)  
4. [Compression Strategy](#compression-strategy)  
5. [Pricing Strategy](#pricing-strategy)  
6. [Authentication Strategy](#authentication-strategy)  
7. [Shipping Cost Strategy](#shipping-cost-strategy)  
8. [Image Processing Strategy](#image-processing-strategy)  
9. [Search Algorithm Strategy](#search-algorithm-strategy)  
10. [Tax Calculation Strategy](#tax-calculation-strategy)  

### Payment Processing System
```ts
interface PaymentStrategy {
  pay(amount: number): string;
}

class CreditCardPayment implements PaymentStrategy {
  private cardNumber: string;
  
  constructor(cardNumber: string) {
    this.cardNumber = cardNumber;
  }
  
  pay(amount: number): string {
    return `Paid $${amount} using Credit Card ending in ${this.cardNumber.slice(-4)}`;
  }
}

class PayPalPayment implements PaymentStrategy {
  private email: string;
  
  constructor(email: string) {
    this.email = email;
  }
  
  pay(amount: number): string {
    return `Paid $${amount} using PayPal account ${this.email}`;
  }
}

class BitcoinPayment implements PaymentStrategy {
  private walletAddress: string;
  
  constructor(walletAddress: string) {
    this.walletAddress = walletAddress;
  }
  
  pay(amount: number): string {
    return `Paid $${amount} using Bitcoin wallet ${this.walletAddress}`;
  }
}

class PaymentProcessor {
  private strategy: PaymentStrategy;
  
  constructor(strategy: PaymentStrategy) {
    this.strategy = strategy;
  }
  
  setPaymentStrategy(strategy: PaymentStrategy): void {
    this.strategy = strategy;
  }
  
  processPayment(amount: number): string {
    return this.strategy.pay(amount);
  }
}

// Usage
const processor = new PaymentProcessor(new CreditCardPayment("1234-5678-9012-3456"));
console.log(processor.processPayment(100)); // Credit card payment

processor.setPaymentStrategy(new PayPalPayment("user@example.com"));
console.log(processor.processPayment(50)); // PayPal payment

```

### Sorting Algorithm Strategy
```ts
interface SortStrategy<T> {
  sort(data: T[]): T[];
}

class BubbleSort<T> implements SortStrategy<T> {
  sort(data: T[]): T[] {
    const arr = [...data];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }
    return arr;
  }
}

class QuickSort<T> implements SortStrategy<T> {
  sort(data: T[]): T[] {
    if (data.length <= 1) return [...data];
    
    const pivot = data[Math.floor(data.length / 2)];
    const left = data.filter(x => x < pivot);
    const middle = data.filter(x => x === pivot);
    const right = data.filter(x => x > pivot);
    
    return [...this.sort(left), ...middle, ...this.sort(right)];
  }
}

class MergeSort<T> implements SortStrategy<T> {
  sort(data: T[]): T[] {
    if (data.length <= 1) return [...data];
    
    const mid = Math.floor(data.length / 2);
    const left = this.sort(data.slice(0, mid));
    const right = this.sort(data.slice(mid));
    
    return this.merge(left, right);
  }
  
  private merge(left: T[], right: T[]): T[] {
    const result: T[] = [];
    let leftIndex = 0, rightIndex = 0;
    
    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] <= right[rightIndex]) {
        result.push(left[leftIndex++]);
      } else {
        result.push(right[rightIndex++]);
      }
    }
    
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  }
}

class DataSorter<T> {
  private strategy: SortStrategy<T>;
  
  constructor(strategy: SortStrategy<T>) {
    this.strategy = strategy;
  }
  
  setSortStrategy(strategy: SortStrategy<T>): void {
    this.strategy = strategy;
  }
  
  sortData(data: T[]): T[] {
    console.log(`Sorting using ${this.strategy.constructor.name}`);
    return this.strategy.sort(data);
  }
}

// Usage
const sorter = new DataSorter(new QuickSort<number>());
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log(sorter.sortData(numbers)); // QuickSort result

sorter.setSortStrategy(new MergeSort<number>());
console.log(sorter.sortData(numbers)); // MergeSort result
```

### Validation Strategy
```ts
interface ValidationStrategy {
  validate(value: string): { isValid: boolean; message: string };
}

class EmailValidation implements ValidationStrategy {
  validate(value: string): { isValid: boolean; message: string } {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(value);
    return {
      isValid,
      message: isValid ? "Valid email" : "Invalid email format"
    };
  }
}

class PasswordValidation implements ValidationStrategy {
  validate(value: string): { isValid: boolean; message: string } {
    const hasMinLength = value.length >= 8;
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumbers = /\d/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    
    const isValid = hasMinLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
    
    return {
      isValid,
      message: isValid ? "Strong password" : "Password must contain at least 8 characters, uppercase, lowercase, numbers, and special characters"
    };
  }
}

class PhoneValidation implements ValidationStrategy {
  validate(value: string): { isValid: boolean; message: string } {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    const isValid = phoneRegex.test(value);
    return {
      isValid,
      message: isValid ? "Valid phone number" : "Invalid phone number format"
    };
  }
}

class Validator {
  private strategy: ValidationStrategy;
  
  constructor(strategy: ValidationStrategy) {
    this.strategy = strategy;
  }
  
  setValidationStrategy(strategy: ValidationStrategy): void {
    this.strategy = strategy;
  }
  
  validate(value: string): { isValid: boolean; message: string } {
    return this.strategy.validate(value);
  }
}

// Usage
const validator = new Validator(new EmailValidation());
console.log(validator.validate("user@example.com")); // Email validation

validator.setValidationStrategy(new PasswordValidation());
console.log(validator.validate("MyPassword123!")); // Password validation
```

### Compression Strategy
```ts
interface CompressionStrategy {
  compress(data: string): string;
  decompress(data: string): string;
}

class ZipCompression implements CompressionStrategy {
  compress(data: string): string {
    return `ZIP_COMPRESSED(${data.length} bytes -> ${Math.floor(data.length * 0.6)} bytes)`;
  }
  
  decompress(data: string): string {
    return `ZIP_DECOMPRESSED: ${data}`;
  }
}

class GzipCompression implements CompressionStrategy {
  compress(data: string): string {
    return `GZIP_COMPRESSED(${data.length} bytes -> ${Math.floor(data.length * 0.7)} bytes)`;
  }
  
  decompress(data: string): string {
    return `GZIP_DECOMPRESSED: ${data}`;
  }
}

class RarCompression implements CompressionStrategy {
  compress(data: string): string {
    return `RAR_COMPRESSED(${data.length} bytes -> ${Math.floor(data.length * 0.5)} bytes)`;
  }
  
  decompress(data: string): string {
    return `RAR_DECOMPRESSED: ${data}`;
  }
}

class FileCompressor {
  private strategy: CompressionStrategy;
  
  constructor(strategy: CompressionStrategy) {
    this.strategy = strategy;
  }
  
  setCompressionStrategy(strategy: CompressionStrategy): void {
    this.strategy = strategy;
  }
  
  compressFile(data: string): string {
    return this.strategy.compress(data);
  }
  
  decompressFile(data: string): string {
    return this.strategy.decompress(data);
  }
}

// Usage
const compressor = new FileCompressor(new ZipCompression());
const fileData = "This is a large file with lots of content...";
console.log(compressor.compressFile(fileData)); // ZIP compression

compressor.setCompressionStrategy(new RarCompression());
console.log(compressor.compressFile(fileData)); // RAR compression
```


### Pricing Strategy
```ts
interface PricingStrategy {
  calculatePrice(basePrice: number, quantity: number): number;
}

class RegularPricing implements PricingStrategy {
  calculatePrice(basePrice: number, quantity: number): number {
    return basePrice * quantity;
  }
}

class BulkDiscountPricing implements PricingStrategy {
  calculatePrice(basePrice: number, quantity: number): number {
    let total = basePrice * quantity;
    if (quantity >= 100) {
      total *= 0.8; // 20% discount
    } else if (quantity >= 50) {
      total *= 0.9; // 10% discount
    }
    return total;
  }
}

class MemberPricing implements PricingStrategy {
  private memberDiscount: number;
  
  constructor(memberDiscount: number) {
    this.memberDiscount = memberDiscount;
  }
  
  calculatePrice(basePrice: number, quantity: number): number {
    const total = basePrice * quantity;
    return total * (1 - this.memberDiscount);
  }
}

class SeasonalPricing implements PricingStrategy {
  private seasonMultiplier: number;
  
  constructor(seasonMultiplier: number) {
    this.seasonMultiplier = seasonMultiplier;
  }
  
  calculatePrice(basePrice: number, quantity: number): number {
    return basePrice * quantity * this.seasonMultiplier;
  }
}

class PriceCalculator {
  private strategy: PricingStrategy;
  
  constructor(strategy: PricingStrategy) {
    this.strategy = strategy;
  }
  
  setPricingStrategy(strategy: PricingStrategy): void {
    this.strategy = strategy;
  }
  
  calculateFinalPrice(basePrice: number, quantity: number): number {
    return this.strategy.calculatePrice(basePrice, quantity);
  }
}

// Usage
const calculator = new PriceCalculator(new RegularPricing());
console.log(`Regular: $${calculator.calculateFinalPrice(10, 5)}`); // $50

calculator.setPricingStrategy(new BulkDiscountPricing());
console.log(`Bulk: $${calculator.calculateFinalPrice(10, 100)}`); // $800 (20% discount)

calculator.setPricingStrategy(new MemberPricing(0.15));
console.log(`Member: $${calculator.calculateFinalPrice(10, 5)}`); // $42.50 (15% discount)
```

### Authentication Strategy
```ts
interface AuthenticationStrategy {
  authenticate(credentials: any): { success: boolean; message: string; token?: string };
}

class UsernamePasswordAuth implements AuthenticationStrategy {
  private users = new Map([
    ["admin", "password123"],
    ["user", "userpass"]
  ]);
  
  authenticate(credentials: { username: string; password: string }): { success: boolean; message: string; token?: string } {
    const { username, password } = credentials;
    const storedPassword = this.users.get(username);
    
    if (storedPassword && storedPassword === password) {
      return {
        success: true,
        message: "Authentication successful",
        token: `token_${username}_${Date.now()}`
      };
    }
    
    return { success: false, message: "Invalid credentials" };
  }
}

class OAuthAuth implements AuthenticationStrategy {
  authenticate(credentials: { accessToken: string }): { success: boolean; message: string; token?: string } {
    const { accessToken } = credentials;
    
    // Simulate OAuth token validation
    if (accessToken && accessToken.startsWith("oauth_")) {
      return {
        success: true,
        message: "OAuth authentication successful",
        token: `internal_${Date.now()}`
      };
    }
    
    return { success: false, message: "Invalid OAuth token" };
  }
}

class JWTAuth implements AuthenticationStrategy {
  authenticate(credentials: { jwt: string }): { success: boolean; message: string; token?: string } {
    const { jwt } = credentials;
    
    // Simulate JWT validation
    if (jwt && jwt.includes("eyJ")) { // Basic JWT format check
      return {
        success: true,
        message: "JWT authentication successful",
        token: jwt
      };
    }
    
    return { success: false, message: "Invalid JWT token" };
  }
}

class AuthenticationService {
  private strategy: AuthenticationStrategy;
  
  constructor(strategy: AuthenticationStrategy) {
    this.strategy = strategy;
  }
  
  setAuthStrategy(strategy: AuthenticationStrategy): void {
    this.strategy = strategy;
  }
  
  login(credentials: any): { success: boolean; message: string; token?: string } {
    return this.strategy.authenticate(credentials);
  }
}

// Usage
const authService = new AuthenticationService(new UsernamePasswordAuth());
console.log(authService.login({ username: "admin", password: "password123" }));

authService.setAuthStrategy(new OAuthAuth());
console.log(authService.login({ accessToken: "oauth_abc123" }));
```

### Shipping Cost Strategy
```ts
interface ShippingStrategy {
  calculateCost(weight: number, distance: number): number;
  getEstimatedDays(): string;
}

class StandardShipping implements ShippingStrategy {
  calculateCost(weight: number, distance: number): number {
    return weight * 0.5 + distance * 0.1;
  }
  
  getEstimatedDays(): string {
    return "5-7 business days";
  }
}

class ExpressShipping implements ShippingStrategy {
  calculateCost(weight: number, distance: number): number {
    return (weight * 0.5 + distance * 0.1) * 2;
  }
  
  getEstimatedDays(): string {
    return "1-2 business days";
  }
}

class OvernightShipping implements ShippingStrategy {
  calculateCost(weight: number, distance: number): number {
    return (weight * 0.5 + distance * 0.1) * 4;
  }
  
  getEstimatedDays(): string {
    return "Next business day";
  }
}

class InternationalShipping implements ShippingStrategy {
  calculateCost(weight: number, distance: number): number {
    return weight * 2 + distance * 0.5 + 25; // Base international fee
  }
  
  getEstimatedDays(): string {
    return "10-15 business days";
  }
}

class ShippingCalculator {
  private strategy: ShippingStrategy;
  
  constructor(strategy: ShippingStrategy) {
    this.strategy = strategy;
  }
  
  setShippingStrategy(strategy: ShippingStrategy): void {
    this.strategy = strategy;
  }
  
  calculateShipping(weight: number, distance: number): { cost: number; estimatedDays: string } {
    return {
      cost: this.strategy.calculateCost(weight, distance),
      estimatedDays: this.strategy.getEstimatedDays()
    };
  }
}

// Usage
const shipping = new ShippingCalculator(new StandardShipping());
console.log(shipping.calculateShipping(5, 100)); // Standard shipping

shipping.setShippingStrategy(new ExpressShipping());
console.log(shipping.calculateShipping(5, 100)); // Express shipping
```

### Image Processing Strategy
```ts
interface ImageProcessingStrategy {
  process(imagePath: string): string;
}

class ResizeStrategy implements ImageProcessingStrategy {
  private width: number;
  private height: number;
  
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
  
  process(imagePath: string): string {
    return `Resized ${imagePath} to ${this.width}x${this.height}`;
  }
}

class CompressStrategy implements ImageProcessingStrategy {
  private quality: number;
  
  constructor(quality: number) {
    this.quality = quality;
  }
  
  process(imagePath: string): string {
    return `Compressed ${imagePath} to ${this.quality}% quality`;
  }
}

class WatermarkStrategy implements ImageProcessingStrategy {
  private watermarkText: string;
  
  constructor(watermarkText: string) {
    this.watermarkText = watermarkText;
  }
  
  process(imagePath: string): string {
    return `Added watermark "${this.watermarkText}" to ${imagePath}`;
  }
}

class GrayscaleStrategy implements ImageProcessingStrategy {
  process(imagePath: string): string {
    return `Converted ${imagePath} to grayscale`;
  }
}

class ImageProcessor {
  private strategy: ImageProcessingStrategy;
  
  constructor(strategy: ImageProcessingStrategy) {
    this.strategy = strategy;
  }
  
  setProcessingStrategy(strategy: ImageProcessingStrategy): void {
    this.strategy = strategy;
  }
  
  processImage(imagePath: string): string {
    return this.strategy.process(imagePath);
  }
}

// Usage
const processor = new ImageProcessor(new ResizeStrategy(800, 600));
console.log(processor.processImage("photo.jpg")); // Resize

processor.setProcessingStrategy(new WatermarkStrategy("© 2024 MyCompany"));
console.log(processor.processImage("photo.jpg")); // Watermark
```

### Search Algorithm Strategy
```ts
interface SearchStrategy<T> {
  search(data: T[], target: T): number;
  getName(): string;
}

class LinearSearch<T> implements SearchStrategy<T> {
  search(data: T[], target: T): number {
    for (let i = 0; i < data.length; i++) {
      if (data[i] === target) {
        return i;
      }
    }
    return -1;
  }
  
  getName(): string {
    return "Linear Search";
  }
}

class BinarySearch<T> implements SearchStrategy<T> {
  search(data: T[], target: T): number {
    let left = 0;
    let right = data.length - 1;
    
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      
      if (data[mid] === target) {
        return mid;
      } else if (data[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    
    return -1;
  }
  
  getName(): string {
    return "Binary Search";
  }
}

class InterpolationSearch implements SearchStrategy<number> {
  search(data: number[], target: number): number {
    let low = 0;
    let high = data.length - 1;
    
    while (low <= high && target >= data[low] && target <= data[high]) {
      if (low === high) {
        return data[low] === target ? low : -1;
      }
      
      const pos = low + Math.floor(((target - data[low]) / (data[high] - data[low])) * (high - low));
      
      if (data[pos] === target) {
        return pos;
      } else if (data[pos] < target) {
        low = pos + 1;
      } else {
        high = pos - 1;
      }
    }
    
    return -1;
  }
  
  getName(): string {
    return "Interpolation Search";
  }
}

class SearchEngine<T> {
  private strategy: SearchStrategy<T>;
  
  constructor(strategy: SearchStrategy<T>) {
    this.strategy = strategy;
  }
  
  setSearchStrategy(strategy: SearchStrategy<T>): void {
    this.strategy = strategy;
  }
  
  findElement(data: T[], target: T): { index: number; algorithm: string } {
    const index = this.strategy.search(data, target);
    return {
      index,
      algorithm: this.strategy.getName()
    };
  }
}

// Usage
const searchEngine = new SearchEngine(new LinearSearch<number>());
const numbers = [1, 3, 5, 7, 9, 11, 13, 15];

console.log(searchEngine.findElement(numbers, 7)); // Linear search

searchEngine.setSearchStrategy(new BinarySearch<number>());
console.log(searchEngine.findElement(numbers, 7)); // Binary search
```

### Tax Calculation Strategy
```ts
interface TaxCalculationStrategy {
  calculateTax(income: number): { tax: number; bracket: string };
}

class SingleTaxStrategy implements TaxCalculationStrategy {
  calculateTax(income: number): { tax: number; bracket: string } {
    let tax = 0;
    let bracket = "";
    
    if (income <= 10000) {
      tax = income * 0.1;
      bracket = "10%";
    } else if (income <= 40000) {
      tax = 1000 + (income - 10000) * 0.12;
      bracket = "12%";
    } else if (income <= 85000) {
      tax = 4600 + (income - 40000) * 0.22;
      bracket = "22%";
    } else {
      tax = 14500 + (income - 85000) * 0.24;
      bracket = "24%";
    }
    
    return { tax, bracket };
  }
}

class MarriedJointTaxStrategy implements TaxCalculationStrategy {
  calculateTax(income: number): { tax: number; bracket: string } {
    let tax = 0;
    let bracket = "";
    
    if (income <= 20000) {
      tax = income * 0.1;
      bracket = "10%";
    } else if (income <= 80000) {
      tax = 2000 + (income - 20000) * 0.12;
      bracket = "12%";
    } else if (income <= 170000) {
      tax = 9200 + (income - 80000) * 0.22;
      bracket = "22%";
    } else {
      tax = 29000 + (income - 170000) * 0.24;
      bracket = "24%";
    }
    
    return { tax, bracket };
  }
}

class BusinessTaxStrategy implements TaxCalculationStrategy {
  calculateTax(income: number): { tax: number; bracket: string } {
    let tax = income * 0.21; // Flat corporate tax rate
    return { tax, bracket: "21% Corporate" };
  }
}

class TaxCalculator {
  private strategy: TaxCalculationStrategy;
  
  constructor(strategy: TaxCalculationStrategy) {
    this.strategy = strategy;
  }
  
  setTaxStrategy(strategy: TaxCalculationStrategy): void {
    this.strategy = strategy;
  }
  
  calculateTaxes(income: number): { tax: number; bracket: string; netIncome: number } {
    const result = this.strategy.calculateTax(income);
    return {
      ...result,
      netIncome: income - result.tax
    };
  }
}

// Usage
const taxCalc = new TaxCalculator(new SingleTaxStrategy());
console.log(taxCalc.calculateTaxes(50000)); // Single filer

taxCalc.setTaxStrategy(new MarriedJointTaxStrategy());
console.log(taxCalc.calculateTaxes(50000)); // Married filing jointly

taxCalc.setTaxStrategy(new BusinessTaxStrategy());
console.log(taxCalc.calculateTaxes(100000)); // Business taxes
```