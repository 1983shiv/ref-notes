## TypeScript

This comprehensive **TypeScript tutorial**, provided by **Mosh Hamidani** of "Programming with Mosh," teaches the fundamentals of TypeScript, a superset of JavaScript. The course introduces **core concepts** like static typing, which enhances code robustness by enabling **compile-time error detection**, contrasting it with JavaScript's dynamic typing. It further explains **setting up a development environment** using Node.js and VS Code, demonstrating how to **configure the TypeScript compiler** and **debug applications**. The tutorial also explores **advanced TypeScript features** such as type aliases, union and intersection types, literal types, and handling null values, all designed to improve **code readability and maintainability**.

## List all the technical point discusss with coding example :

Here is a comprehensive list of the technical topics discussed in the TypeScript tutorial, along with explanations and code examples:

-   **Introduction to TypeScript**

    -   **What it is**: TypeScript is a **programming language created at Microsoft** to address some of the shortcomings of JavaScript. It is technically a **programming language built on top of JavaScript**, meaning every JavaScript file is a valid TypeScript file. However, TypeScript adds cool features to JavaScript that help developers build **more robust and maintainable applications in less time**.
    -   **Why use it**: The most important feature TypeScript offers is **static typing**. In dynamically typed languages like JavaScript, Python, and Ruby, the type of variables is determined at runtime and can change, which gives flexibility but can lead to problems like an application misbehaving or crashing if a variable is passed to a function that expects a different type. These issues are often only discovered at runtime or through extensive unit testing. TypeScript addresses this by allowing developers to **explicitly set the type of variables upon declaration**, similar to statically typed languages like C++, C#, and Java. The **TypeScript compiler** then checks for type errors at **compile time**, before the application runs.
    -   **How it differs from plain JavaScript**: You can think of TypeScript as JavaScript with **type checking**. While JavaScript is flexible and allows variables to change types at runtime, TypeScript adds discipline by requiring explicit type declarations. TypeScript also includes additional features that help write cleaner and more concise code, some of which eventually get added to JavaScript but take time to be implemented across various browsers and runtime environments. Coding in TypeScript allows access to **features of "future JavaScript"** today.
    -   **Compilation/Transpilation**: Browsers do not understand TypeScript code. Therefore, there is always a **compilation step involved** where the TypeScript code is **transpiled** (compiled and translated) into JavaScript by the TypeScript compiler.
    -   **Drawbacks**: The primary drawbacks include the **mandatory compilation step** and the need for developers to be **more disciplined when writing code**. For simple applications, vanilla JavaScript might be preferred, but for large projects with multiple developers, TypeScript helps **save time by catching bugs early** that would otherwise be wasted debugging in vanilla JavaScript.
    -   **Code Example**:

        ```typescript
        // In index.ts
        let age: number = 20; // Explicitly declares age as a number
        // age = 'a'; // This would cause a compilation error: "Type 'string' is not assignable to type 'number'"

        // Generated JavaScript (index.js by default targets ES5)
        // var age = 20; // Type annotation is removed as it's for the compiler
        ```

-   **Setting Up the Development Environment**

    -   **Node.js**: Node.js is required because the **Node Package Manager (npm)** is used to install the TypeScript compiler. You can download it from nodejs.org.
    -   **Installing TypeScript Compiler**: After installing Node.js, open a terminal and use npm to install TypeScript globally.
    -   **Code Example**:
        ```bash
        npm i -g typescript // 'i' is short for install, '-g' for global installation
        tsc -v // Verifies installation and shows the TypeScript compiler version
        ```
    -   **VS Code**: Visual Studio Code (VS Code) is recommended as the code editor, though any editor can be used. It can be downloaded from code.visualstudio.com.
    -   **Creating a Project and First TypeScript File**: Create a project folder and open it in VS Code. TypeScript files should have the **`.ts` extension** (e.g., `index.ts`). Any JavaScript code written in a `.ts` file is valid TypeScript.
    -   **Compiling a TypeScript File**: Use the `tsc` command followed by the filename (e.g., `tsc index.ts`) in the terminal. This generates a JavaScript file (e.g., `index.js`) in the same directory.
    -   **Code Examples**:
        ```bash
        code . // Opens the current folder in VS Code
        // Inside index.ts
        console.log("Hello World"); // Valid JavaScript and TypeScript code
        ```

-   **TypeScript Compiler Configuration (`tsconfig.json`)**

    -   **Generating `tsconfig.json`**: Run `tsc --init` in the terminal to create a configuration file named `tsconfig.json`.
    -   **Key Settings**:
        -   **`target`**: Specifies the **version of JavaScript** the TypeScript compiler will generate. Default is `es2016`. Higher targets often result in shorter and less concise code.
        -   **`rootDir`**: Specifies the **directory containing source files**. By convention, source code is often placed in an `src` folder (e.g., `"./src"`).
        -   **`outDir`**: Specifies the **directory for generated JavaScript files**. Commonly set to `dist` (distributable folder).
        -   **`removeComments`**: If enabled, the compiler removes all comments from the TypeScript code in the generated JavaScript, making the output shorter.
        -   **`noEmitOnError`**: If enabled, the TypeScript compiler **will not generate JavaScript files if there are errors** in the TypeScript code. This is generally recommended.
    -   **Compiling with `tsconfig.json`**: Once `tsconfig.json` is set up, you can compile all TypeScript files in the project by simply running `tsc` without any arguments.
    -   **Code Example**:
        ```json
        // In tsconfig.json
        {
            "compilerOptions": {
                "target": "es2016", // Can be set to 'es2015', 'es2017', etc.
                "module": "commonjs", // Discussed later
                "rootDir": "./src", // Specifies source directory
                "outDir": "./dist", // Specifies output directory for JavaScript
                "removeComments": true, // Removes comments in generated JS
                "noEmitOnError": true, // Prevents JS generation on errors
                "strict": true, // Turns on basic type checking features
                "noImplicitAny": true, // Complains about implicit 'any' types
                "noUnusedParameters": true, // Warns about unused function parameters
                "noImplicitReturns": true, // Warns if not all code paths return a value
                "noUnusedLocals": true, // Warns about unused local variables
                "sourceMap": true // Generates source map files for debugging
            }
        }
        ```

-   **Debugging TypeScript Applications in VS Code**

    -   **Source Maps**: To debug TypeScript code directly in the browser or IDE, **source maps** are needed. A source map is a file (e.g., `index.js.map`) that specifies how each line of TypeScript code maps to the generated JavaScript code. This is enabled by setting `sourceMap: true` in `tsconfig.json`.
    -   **Breakpoints**: You can insert **breakpoints** in your TypeScript code by clicking on the line number. When debugging, execution stops at these breakpoints, allowing line-by-line code execution.
    -   **`launch.json`**: This file, created in the `.vscode` folder, contains configuration that tells VS Code how to debug the application. A `preLaunchTask` can be added to compile the TypeScript code before debugging starts.
    -   **Debugging Tools**: VS Code's debug panel provides tools like **"Step Over" (F10)** to execute one line, **"Step Into"** to enter a function, **"Step Out"** to exit a function, **"Restart"**, and **"Stop"**. Variables can be inspected in the **"Variables" window** and specific variables can be watched in the **"Watch" window**.
    -   **Code Example**:
        ```json
        // In .vscode/launch.json
        {
            "version": "0.2.0",
            "configurations": [
                {
                    "type": "node",
                    "request": "launch",
                    "name": "Launch Program",
                    "skipFiles": ["<node_internals>/**"],
                    "program": "${workspaceFolder}/dist/index.js", // Target the compiled JS file
                    "preLaunchTask": "tsc: build - tsconfig.json" // Builds TS before launching
                }
            ]
        }
        ```
        ```typescript
        // In index.ts with a breakpoint on the 'if' line
        let age: number = 20;
        if (age < 50) {
            age += 10;
        }
        console.log(age); // Adding this line helps see the final value
        ```

-   **Fundamentals of TypeScript (Built-in Types)**

    -   **Primitive Types**: JavaScript has built-in types like `number`, `string`, `boolean`, `null`, `undefined`, and `object`. TypeScript extends this list and introduces new types.

        -   **Type Annotation**: Explicitly setting the type of a variable using a colon followed by the type (e.g., `let sales: number;`).
        -   **Type Inference**: The TypeScript compiler can **infer or detect the type of variables** based on their initial value, so explicit annotation isn't always necessary for primitives.
        -   **Readability for Large Numbers**: Use underscores to separate digits in large numbers for better readability (e.g., `123_456_789`).
        -   **Code Example**:

            ```typescript
            let sales: number = 123_456_789; // Explicit annotation
            let course: string = 'TypeScript'; // Explicit annotation
            let isPublished: boolean = true; // Explicit annotation

            // Type inference in action:
            let inferredSales = 123_456_789; // TypeScript infers 'inferredSales' as number
            let inferredCourse = 'TypeScript'; // TypeScript infers 'inferredCourse' as string
            let inferredIsPublished = true; // TypeScript infers 'inferredIsPublished' as boolean
            ```

    -   **`any` Type**:

        -   Represents **any kind of value**. If a variable is declared but **not initialized**, TypeScript assumes it is of type `any`.
        -   **Avoid using `any`**: Using `any` effectively **loses the type checking feature** and the major benefit of TypeScript, as variables typed `any` can be reassigned to any type without compilation errors.
        -   **`noImplicitAny`**: A compiler option (part of `strict` in `tsconfig.json`) that makes the compiler complain about implicitly typed `any` variables or parameters. It's recommended to keep this enabled.
        -   **Code Example**:

            ```typescript
            let level; // TypeScript infers 'level' as 'any'
            level = 1;
            level = 'a'; // No compilation error if 'noImplicitAny' is off or 'level' is explicitly 'any'

            function render(document: any) {
                // Explicitly annotating with 'any' to suppress error
                console.log(document);
            }
            ```

    -   **Arrays**:

        -   In JavaScript, arrays can hold elements of different types.
        -   In TypeScript, you can **explicitly type an array** to ensure all elements are of a specific type (e.g., `number[]` for an array of numbers).
        -   **Type Inference for Arrays**: If an array is initialized with elements of a single type, the compiler can infer its type.
        -   **Empty Arrays**: For an **empty array**, explicit type annotation is necessary (e.g., `let numbers: number[] = [];`) to prevent it from being inferred as `any[]`.
        -   **Code Completion (IntelliSense)**: TypeScript provides **code completion and IntelliSense** for array elements because the editor knows their type, boosting productivity.
        -   **Code Example**:

            ```typescript
            // let numbers = [1, 2, '3']; // Compilation error if numbers is inferred as number[]
            let numbers: number[] =; // Explicitly typed as an array of numbers
            let emptyNumbers: number[] = []; // Explicitly typed for an empty array

            numbers.forEach(n => n.toFixed()); // IntelliSense provides number methods for 'n'
            ```

    -   **Tuples**:

        -   A **fixed-length array where each element has a particular type**.
        -   Often used for a **pair of values** like an ID and a name.
        -   Defined using square brackets with types listed inside (e.g., `[number, string]`).
        -   Provides **IntelliSense** for elements based on their defined type.
        -   **Internal Representation**: Tuples are internally represented as plain JavaScript arrays.
        -   **Drawback**: The `push` method on a tuple doesn't trigger a compilation error, allowing additional elements to be added at runtime, which is considered a gap in TypeScript.
        -   **Best Practice**: Restrict tuples to **only two values** to maintain code readability.
        -   **Code Example**:

            ```typescript
            let user: [number, string] = [1, 'Mosh']; // A tuple with a number and a string
            // user = [1, 'Mosh', true]; // Compilation error: "Type '[number, string, boolean]' is not assignable to type '[number, string]'"
            // user = '1'; // Compilation error: "Type 'string' is not assignable to type 'number'"

            user.toFixed(); // IntelliSense for number methods
            user.toUpperCase(); // IntelliSense for string methods

            user.push(3); // No compilation error, but violates fixed-length nature
            ```

    -   **Enums**:

        -   Represents a **list of related constants**. Similar to enums in C# or Java.
        -   Defined using the `enum` keyword. Members are typically named using Pascal casing.
        -   **Default Values**: By default, the first member is assigned `0`, and subsequent members increment by `1`.
        -   **Explicit Values**: Values can be explicitly set (e.g., `Small = 1`), and subsequent members will follow. String values can also be used, but all members must be explicitly set if any is a string.
        -   **Constant Enums**: Defining an enum with the `const` keyword (e.g., `const enum Size`) results in **more optimized JavaScript code**.
        -   **Code Example**:

            ```typescript
            enum Size {
                Small = 1, // Small is 1, Medium is 2, Large is 3 by default
                Medium,
                Large,
            }

            let mySize: Size = Size.Medium; // Using the enum type and member
            console.log(mySize); // Outputs '2' (the numeric value)

            // const enum for optimized JS output
            const enum ConstantSize {
                Small = 1,
                Medium,
                Large,
            }
            let myConstantSize: ConstantSize = ConstantSize.Medium; // Generated JS will be just 'var myConstantSize = 2;'
            ```

    -   **Functions**:

        -   **Type Annotation**: Best practice is to **properly annotate all parameters and the return type** of functions, especially when building APIs.
        -   **Return Type Inference**: The TypeScript compiler can infer the return type if a function consistently returns a certain type.
        -   **Compiler Options for Functions**:
            -   **`noUnusedParameters`**: Warns about function parameters that are declared but never used.
            -   **`noImplicitReturns`**: Warns if not all code paths in a function return a value (especially if a return type is explicitly defined, and some paths might implicitly return `undefined`).
            -   **`noUnusedLocals`**: Warns about local variables that are declared but never read within a function.
        -   **Strict Argument Count**: TypeScript is strict about the **number of arguments** passed to a function; it expects an exact match to the number of parameters unless specified.
        -   **Optional Parameters**: Make a parameter optional by adding a **question mark** (`?`) after its name (e.g., `taxYear?: number`).
        -   **Default Parameters**: Provide a **default value** to a parameter (e.g., `taxYear = 2022`). This makes the parameter optional and provides a fallback if not supplied, which is a cleaner approach than using the `||` operator in the function body.
        -   **Code Example**:

            ```typescript
            // All parameters and return type annotated
            function calculateTax(income: number, taxYear = 2022): number {
                // Default parameter
                // if (taxYear < 2022) // This check needs careful handling with optional/default params
                if (income < 50_000) {
                    return income * 1.2;
                }
                return income * 1.3; // Ensures a number is always returned
            }

            calculateTax(10_000, 2022); // Pass both arguments
            calculateTax(10_000); // taxYear defaults to 2022
            // calculateTax(10_000, 2022, 1); // Compilation error: "Expected 2 arguments but got 3"
            ```

    -   **Objects**:

        -   **Dynamic Nature in JavaScript**: In plain JavaScript, object shapes can change dynamically (properties can be added later).
        -   **Static Shape in TypeScript**: TypeScript infers or requires an **explicit type annotation for the shape of an object**. This means properties must be declared as part of the object's type, and new properties cannot be added later unless specified in the type.
        -   **Required vs. Optional Properties**: By default, properties defined in an object's type are **required**. You can make a property **optional** by adding a `?` after its name (e.g., `name?: string`), meaning it doesn't have to be supplied during initialization. However, it's advised to make properties optional only if it conceptually makes sense.
        -   **`readonly` Modifier**: Apply the `readonly` modifier before a property name (e.g., `readonly id: number;`) to **prevent accidental modification** of its value after initialization.
        -   **Defining Methods**: Methods within an object's type are defined using an **arrow function syntax** to specify parameters and return type (e.g., `retire: (date: Date) => void`).
        -   **Code Example**:

            ```typescript
            let employee: {
                readonly id: number; // Read-only property
                name: string; // Required property
                retire: (date: Date) => void; // Method signature
            } = {
                id: 1,
                name: 'Mosh',
                retire: (date: Date) => {
                    console.log(date);
                },
            };

            // employee.id = 2; // Compilation error: "Cannot assign to 'id' because it is a read-only property"
            // employee.name = null; // Compilation error if strictNullChecks is on
            ```

-   **Advanced Types**

    -   **Type Aliases**:

        -   Allows you to **define a custom type** (a "type alias") for complex object shapes or other types.
        -   Defined using the `type` keyword, followed by the alias name (PascalCase) and the type definition (e.g., `type Employee = { ... }`).
        -   **Benefits**: Helps **reuse types**, avoids code duplication (`DRY - Don't Repeat Yourself`), ensures consistent object shapes across an application, and improves code readability.
        -   **Code Example**:

            ```typescript
            type Employee = {
                // Defining a type alias for an Employee object
                readonly id: number;
                name: string;
                retire: (date: Date) => void;
            };

            let employee: Employee = {
                // Using the type alias for an object
                id: 1,
                name: 'Mosh',
                retire: (date: Date) => {
                    console.log(date);
                },
            };

            let anotherEmployee: Employee = {
                // Reusing the type alias
                id: 2,
                name: 'John',
                retire: (date: Date) => {
                    console.log(date);
                },
            };
            ```

    -   **Union Types**:

        -   Allows a variable or function parameter to have **more than one type**.
        -   Defined using a **vertical bar (`|`)** between the types (e.g., `number | string`).
        -   **Narrowing**: Within a function, you often need to **"narrow down" a union type** to a more specific type using type guards (e.g., `typeof` checks) to access type-specific properties or methods.
        -   **Code Example**:

            ```typescript
            function kgToLbs(weight: number | string): number {
                // 'weight' can be a number or a string
                // Narrowing the type:
                if (typeof weight === 'number') {
                    // If 'weight' is a number
                    return weight * 2.2; // Can use number-specific methods
                } else {
                    // Otherwise, 'weight' is a string
                    return parseInt(weight) * 2.2; // Can use string-specific methods like parseInt()
                }
            }

            kgToLbs(10); // Valid: number
            kgToLbs('10kg'); // Valid: string
            ```

    -   **Intersection Types**:

        -   Combines **multiple types into a single new type** that possesses all members (properties and methods) from _all_ the combined types.
        -   Defined using an **ampersand (`&`)** between the types (e.g., `Draggable & Resizable`).
        -   **Code Example**:

            ```typescript
            type Draggable = {
                drag: () => void; // A method for draggable objects
            };

            type Resizable = {
                resize: () => void; // A method for resizable objects
            };

            type UIWidget = Draggable & Resizable; // An intersection type that is both draggable and resizable

            let textBox: UIWidget = {
                // An object of type UIWidget must implement both drag and resize methods
                drag: () => console.log('Dragging'),
                resize: () => console.log('Resizing'),
            };
            ```

    -   **Literal Types**:

        -   Limits a variable to **specific exact values** (literals) rather than a broader type (e.g., `50` instead of `number`).
        -   Often used with **union types** to create a set of allowed literal values (e.g., `50 | 100`).
        -   Can be numbers or strings.
        -   **Type Aliases for Literal Types**: Can be combined with type aliases for reusability (e.g., `type Quantity = 50 | 100;`).
        -   **Code Example**:

            ```typescript
            let quantity: 50 | 100 = 100; // 'quantity' can only be 50 or 100
            // quantity = 75; // Compilation error: "Type '75' is not assignable to type '50 | 100'"

            type Quantity = 50 | 100; // Type alias for literal union type
            let myQuantity: Quantity = 50;

            type Metric = 'cm' | 'inch'; // String literal types
            let unit: Metric = 'cm';
            ```

    -   **Nullable Types**:

        -   By default, TypeScript is **strict about using `null` and `undefined` values** because they are common sources of bugs. This is controlled by the `strictNullChecks` compiler option (enabled by default under `strict: true` in `tsconfig.json`).
        -   To allow `null` or `undefined`, use **union types** (e.g., `string | null | undefined`).
        -   **Null Checks**: When working with nullable objects, it's often necessary to perform **null checks** (e.g., `if (customer !== null && customer !== undefined)`) before accessing properties or methods.
        -   **Optional Chaining Operator (`?.`)**: A simpler way to perform null checks for property access. If the left-hand side of `?.` is `null` or `undefined`, the expression short-circuits and evaluates to `undefined`.
        -   **Optional Element Access Operator (`?.[ ]`)**: Similar to optional chaining, but for accessing elements in arrays.
        -   **Optional Call Operator (`?.()`)**: Used for conditionally calling a function or method only if it exists.
        -   **Code Example**:

            ```typescript
            function greet(name: string | null | undefined) { // 'name' can be string, null, or undefined
              if (name) { // Null check: 'name' is truthy (not null or undefined)
                console.log(name.toUpperCase());
              } else {
                console.log('Hola');
              }
            }

            greet('Mosh');
            greet(null);
            greet(undefined);

            type Customer = {
              birthday?: Date; // Optional property (can be undefined)
            };

            function getCustomer(id: number): Customer | null | undefined {
              return id === 0 ? null : { birthday: new Date() };
            }

            let customer = getCustomer(0);
            console.log(customer?.birthday?.getFullYear()); // Optional chaining for properties and methods

            let customers: string[] | null = null;
            console.log(customers?.); // Optional element access

            let log: Function | null = null; // A variable that might reference a function or be null
            log?.('message'); // Optional call operator: only calls 'log' if it's a function
            ```
