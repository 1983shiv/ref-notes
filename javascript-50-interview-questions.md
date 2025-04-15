### 1. What is a JavaScript engine, and how does it work?

A JavaScript engine is a program that executes JavaScript code by converting it into machine code that a computer can understand. It parses the code, compiles it (often using Just-In-Time compilation), and executes it, managing memory and optimizing performance.

**How it works**:
- **Parsing**: Converts code into an Abstract Syntax Tree (AST).
- **Compilation**: Translates AST into bytecode or machine code.
- **Execution**: Runs the code, managing memory and call stacks.

**Example**:
```javascript
console.log("Hello, World!");
```
The engine (e.g., V8 in Chrome) parses this code, creates an AST, compiles it to machine code, and executes it to print "Hello, World!" to the console.

---

### 2. What are the different JavaScript engines available (V8, SpiderMonkey, Chakra, etc.)?

JavaScript engines are implemented by different browsers and environments:
- **V8**: Used in Chrome and Node.js, known for high performance with JIT compilation.
- **SpiderMonkey**: Powers Firefox, developed by Mozilla.
- **Chakra**: Used in legacy Microsoft Edge (pre-Chromium).
- **JavaScriptCore (Nitro)**: Used in Safari, optimized for Apple ecosystems.

**Example**:
```javascript
// Runs differently based on engine
let arr = [1, 2, 3];
arr.map(x => x * 2); // V8, SpiderMonkey, etc., optimize this differently
```
Each engine processes this code, but performance varies due to their optimization strategies.

---

### 3. What is Just-In-Time (JIT) compilation, and how does it optimize JavaScript performance?

JIT compilation combines interpretation and compilation. It compiles JavaScript code at runtime, optimizing frequently executed code paths to improve speed.

**Optimization**:
- **Baseline Compilation**: Quick compilation to bytecode.
- **Optimizing Compilation**: Recompiles hot code with assumptions for speed.
- **Deoptimization**: Falls back if assumptions fail.

**Example**:
```javascript
function sumArray(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}
console.log(sumArray([1, 2, 3, 4, 5])); // JIT optimizes loop after repeated calls
```
V8’s JIT compiler optimizes the loop if `sumArray` is called multiple times, reducing execution time.

---

### 4. What are the different phases of JavaScript execution? (Parsing, Compilation, and Execution)

JavaScript execution involves:
- **Parsing**: Code is broken into tokens and converted to an AST.
- **Compilation**: AST is translated to bytecode or machine code (often via JIT).
- **Execution**: The engine runs the code, managing memory and call stacks.

**Example**:
```javascript
let x = 10;
function add(y) {
  return x + y;
}
console.log(add(5)); // Outputs 15
```
- **Parsing**: Creates AST for variable `x` and function `add`.
- **Compilation**: Generates bytecode for `add`.
- **Execution**: Runs `add(5)`, resolving `x` and outputting 15.

---

### 5. What is an Abstract Syntax Tree (AST), and how is it generated?

An AST is a tree representation of the syntactic structure of code, where nodes represent constructs like variables, functions, or operators.

**Generation**:
- The parser tokenizes the code (e.g., splits `let x = 5;` into `let`, `x`, `=`, `5`, `;`).
- It builds a tree where each node represents a syntax element.

**Example**:
```javascript
let x = 5 + 3;
```
**AST (simplified)**:
```
- VariableDeclaration
  - Identifier: x
  - BinaryExpression
    - Left: 5
    - Operator: +
    - Right: 3
```
Tools like `esprima` can generate this:
```javascript
const esprima = require("esprima");
console.log(esprima.parseScript("let x = 5 + 3;"));
```

---

### 6. How does JavaScript handle memory allocation and garbage collection?

JavaScript allocates memory for variables, objects, and functions on the heap. Garbage collection (GC) reclaims memory from unused objects.

**Process**:
- **Allocation**: Objects are created in heap memory.
- **Garbage Collection**: Identifies unreachable objects and frees memory (e.g., using Mark-and-Sweep).

**Example**:
```javascript
let obj = { name: "Alice" };
obj = null; // Object is now eligible for garbage collection
```
After `obj = null`, the engine’s GC (e.g., V8’s Orinoco) marks `{ name: "Alice" }` as unreachable and frees its memory.

---

### 7. What is the role of the interpreter and compiler in JavaScript execution?

- **Interpreter**: Executes code line-by-line, enabling quick startup (e.g., V8’s Ignition).
- **Compiler**: Translates code to optimized machine code for performance (e.g., V8’s TurboFan).

**Example**:
```javascript
function multiply(a, b) {
  return a * b;
}
console.log(multiply(4, 5)); // 20
```
Ignition interprets initially for fast execution; TurboFan compiles it to optimized code if called repeatedly.

---

### 8. What is the difference between a runtime and a JavaScript engine?

- **JavaScript Engine**: Executes JavaScript code (e.g., V8, SpiderMonkey).
- **Runtime**: Provides additional APIs and environments (e.g., Node.js adds file system APIs; browsers add DOM).

**Example**:
```javascript
// Browser runtime
document.getElementById("demo").innerText = "Hello"; // Uses browser runtime

// Node.js runtime
const fs = require("fs");
fs.writeFileSync("test.txt", "Hello"); // Uses Node.js runtime
```
V8 executes the JavaScript, but the runtime provides `document` or `fs`.

---

### 9. How does the optimizing compiler improve JavaScript performance?

The optimizing compiler (e.g., V8’s TurboFan) analyzes code at runtime, making assumptions (e.g., variable types) to generate faster machine code. It deoptimizes if assumptions fail.

**Example**:
```javascript
function addNumbers(a, b) {
  return a + b;
}
for (let i = 0; i < 1000; i++) {
  addNumbers(10, 20); // Compiler optimizes assuming numbers
}
```
TurboFan optimizes `addNumbers` for integers, speeding up execution after repeated calls.

---

### 10. What is hidden class optimization in V8, and why is it important?

V8 uses **hidden classes** to track object property layouts. Objects with the same structure share a hidden class, enabling faster property access.

**Importance**: Reduces lookup time, improving performance.

**Example**:
```javascript
function Point(x, y) {
  this.x = x;
  this.y = y;
}
let p1 = new Point(1, 2);
let p2 = new Point(3, 4); // Same hidden class
p1.z = 5; // New hidden class for p1
```
`p1` and `p2` share a hidden class until `p1.z` creates a new one, slowing access for `p1`.

---

### 11. What is an Execution Context, and how is it created in JavaScript?

An Execution Context is an environment where JavaScript code runs, containing variable bindings, `this`, and scope information.

**Creation**:
- **Variable Object**: Stores variables and functions.
- **Scope Chain**: Links to outer scopes.
- **this**: Binds to the context (e.g., global object or instance).

**Example**:
```javascript
let x = 10;
function foo() {
  console.log(x);
}
foo(); // 10
```
The engine creates a global execution context for `x` and a function context for `foo`, linking them via scope.

---

### 12. What are the different types of Execution Contexts in JavaScript? (Global, Function, Eval)

- **Global**: Created for code outside functions, binds to the global object (e.g., `window`).
- **Function**: Created for each function call, with its own variables and `this`.
- **Eval**: Created for code in `eval()`, with access to the caller’s context.

**Example**:
```javascript
// Global
let x = 5;

// Function
function test() {
  let y = 10;
  console.log(x, y); // 5, 10
}
test();

// Eval
eval("console.log(x);"); // 5
```

---

### 13. What is the Execution Stack (Call Stack), and how does JavaScript manage function calls?

The Execution Stack tracks execution contexts. When a function is called, its context is pushed; when it returns, it’s popped.

**Example**:
```javascript
function first() {
  second();
}
function second() {
  console.log("Called");
}
first();
```
**Stack**:
1. Global context
2. `first` context
3. `second` context
4. Pop `second`, then `first`, back to global.

---

### 14. What is Scope in JavaScript, and how does Lexical Scope work?

**Scope** determines variable accessibility. **Lexical Scope** means a function’s scope is defined by its position in the source code, not where it’s called.

**Example**:
```javascript
let x = 10;
function outer() {
  let y = 20;
  function inner() {
    console.log(x, y); // 10, 20
  }
  inner();
}
outer();
```
`inner` accesses `x` and `y` from its lexical parent scopes (`outer` and global).

---

### 15. What is the difference between the Global Execution Context and Function Execution Context?

- **Global Execution Context**:
  - Created once per script.
  - Binds to the global object (`window` in browsers).
  - Holds global variables.
- **Function Execution Context**:
  - Created per function call.
  - Has its own variable environment and `this`.
  - Links to outer scopes.

**Example**:
```javascript
let globalVar = "global";
function func() {
  let localVar = "local";
  console.log(globalVar, localVar); // global, local
}
func();
```

---

### 16. What is the Scope Chain, and how does it help resolve variables?

The Scope Chain links a function’s execution context to its outer scopes, used to resolve variables by searching upward.

**Example**:
```javascript
let a = 1;
function outer() {
  let b = 2;
  function inner() {
    let c = 3;
    console.log(a, b, c); // 1, 2, 3
  }
  inner();
}
outer();
```
`inner` resolves `a` from global, `b` from `outer`, and `c` locally via the scope chain.

---

### 17. What is Hoisting, and how does JavaScript handle it?

Hoisting moves variable and function declarations to the top of their scope during compilation, but not assignments.

**Example**:
```javascript
console.log(x); // undefined
var x = 5;

foo(); // Works
function foo() {
  console.log("Hello");
}
```
`var x` is hoisted (initialized as `undefined`); `function foo` is fully hoisted.

---

### 18. What is the Temporal Dead Zone (TDZ) in JavaScript?

The TDZ is the period where `let` and `const` variables exist but are uninitialized, causing errors if accessed.

**Example**:
```javascript
console.log(x); // ReferenceError: x is not defined
let x = 10;
```
`x` is in the TDZ until its declaration, unlike `var`.

---

### 19. What is Closure, and how does it work internally?

A closure is a function that retains access to its lexical scope’s variables even after the outer function returns.

**Example**:
```javascript
function outer() {
  let count = 0;
  return function inner() {
    count++;
    console.log(count);
  };
}
let counter = outer();
counter(); // 1
counter(); // 2
```
`inner` closes over `count`, preserving it in memory.

---

### 20. What is the `this` keyword, and how does it behave in different contexts?

`this` refers to the object executing the current function:
- **Global**: `window` (browsers).
- **Method**: The object calling the method.
- **Constructor**: The new instance.
- **Arrow Function**: Inherits `this` from the parent scope.

**Example**:
```javascript
const obj = {
  name: "Alice",
  say: function () {
    console.log(this.name);
  },
};
obj.say(); // Alice

const arrow = () => console.log(this.name);
arrow(); // undefined or window.name (global)
```

---

### 21. What is the difference between Stack and Heap memory in JavaScript?

- **Stack**: Stores primitive values and function call frames (fixed size).
- **Heap**: Stores objects and dynamic data (variable size).

**Example**:
```javascript
let num = 10; // Stack
let obj = { value: 20 }; // Heap
function test() {
  let local = 30; // Stack
}
test();
```
`num` and `local` go on the stack; `obj` is allocated on the heap.

---

### 22. How does JavaScript manage memory and avoid memory leaks?

JavaScript uses garbage collection to reclaim unused memory. To avoid leaks:
- Nullify unused references.
- Avoid global variables.
- Clean up event listeners.

**Example**:
```javascript
let data = { big: new Array(1000000).fill("x") };
data = null; // Allows GC to reclaim memory
```

---

### 23. What is Garbage Collection, and how does it work in JavaScript?

Garbage Collection identifies and frees memory for objects no longer reachable from the root (e.g., global object).

**Example**:
```javascript
function createObj() {
  let obj = { data: "temp" };
  return null; // obj becomes unreachable
}
createObj();
```
The engine’s GC (e.g., Mark-and-Sweep) frees `obj`’s memory.

---

### 24. What are the different types of Garbage Collection algorithms? (Mark and Sweep, Reference Counting)

- **Mark-and-Sweep**: Marks reachable objects, sweeps unmarked ones. Used in V8.
- **Reference Counting**: Tracks references to objects, freeing those with zero references (not common in JavaScript due to circular reference issues).

**Example**:
```javascript
let obj = { a: 1 };
obj = null; // Mark-and-Sweep will collect it
```

---

### 25. What is a memory leak in JavaScript, and how can you prevent it?

A memory leak occurs when memory isn’t freed, causing increased usage. Causes include forgotten timers, global variables, or event listeners.

**Prevention**:
- Clear timers.
- Remove event listeners.
- Nullify references.

**Example**:
```javascript
let element = document.getElementById("btn");
element.addEventListener("click", () => console.log("Clicked"));
element.removeEventListener("click", () => console.log("Clicked")); // Prevents leak
```

---

### 26. How do WeakMap and WeakSet help with memory management?

`WeakMap` and `WeakSet` hold weak references, allowing garbage collection if the key (WeakMap) or value (WeakSet) is only referenced there.

**Example**:
```javascript
let weakMap = new WeakMap();
let key = {};
weakMap.set(key, "data");
key = null; // Allows GC to collect key and its data
console.log(weakMap.has(key)); // false
```

---

### 27. What are closures, and how can they cause memory leaks?

Closures retain outer scope variables, which can cause leaks if references (e.g., event listeners) persist.

**Example**:
```javascript
function setup() {
  let data = new Array(1000000).fill("x");
  document.getElementById("btn").addEventListener("click", () => {
    console.log(data.length); // data persists
  });
}
setup();
```
**Fix**:
```javascript
document.getElementById("btn").removeEventListener("click", listener);
```

---

### 28. How can you monitor and optimize JavaScript memory usage?

Use browser tools (e.g., Chrome DevTools Memory tab) to profile heap snapshots and detect leaks. Optimize by minimizing allocations and clearing references.

**Example**:
```javascript
// DevTools: Record heap snapshot
let arr = new Array(1000000).fill("x");
arr = null; // Check if memory is reclaimed
```

---

### 29. How does JavaScript handle large objects and memory-intensive operations?

JavaScript relies on GC and efficient allocation. For large objects:
- Use streams or chunks.
- Avoid unnecessary copies.
- Use Typed Arrays for raw data.

**Example**:
```javascript
// Process large data in chunks
let largeArray = new Array(1000000).fill(1);
for (let i = 0; i < largeArray.length; i += 1000) {
  let chunk = largeArray.slice(i, i + 1000);
  console.log(chunk.reduce((a, b) => a + b));
}
```

---

### 30. What are Typed Arrays, and how do they improve performance in JavaScript?

Typed Arrays provide fixed-size arrays for raw binary data (e.g., `Int32Array`), offering better performance than regular arrays for numeric operations.

**Example**:
```javascript
let regular = [1, 2, 3];
let typed = new Int32Array([1, 2, 3]);
for (let i = 0; i < 1000000; i++) {
  typed[0] += typed[1]; // Faster than regular[0] += regular[1]
}
```
Typed Arrays avoid dynamic resizing, improving speed for computations.
