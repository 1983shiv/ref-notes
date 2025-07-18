## Typescript by hitesh choudhary

Here is a comprehensive list of the technical topics discussed in the "Complete Typescript in under 5 hours" tutorial by Hitesh Choudhary:

### **1. Introduction to TypeScript**

-   **Explanation**: TypeScript is highlighted as a modern extension of JavaScript, with many developers claiming a strong preference for it over plain JavaScript. It is fundamentally a **superset of JavaScript**, meaning that all valid JavaScript code is also valid TypeScript, but TypeScript adds more features. The primary purpose of TypeScript is to allow developers to **write JavaScript in a more precise manner**, which leads to a significant reduction in runtime errors. Errors are detected and displayed while the code is being written, rather than during execution. Despite its own syntax, all TypeScript code is eventually **compiled into standard JavaScript**. The tutorial emphasises that TypeScript is primarily a **development tool** that helps in producing cleaner, more scalable, and maintainable code, rather than a standalone programming language. Its core job is **static checking**, which involves analysing the code for potential issues _before_ it runs.
-   **Code Examples**:
    -   Basic JavaScript in a `.ts` file: `console.log("hello world");`
    -   Object declaration: `let user = { name: "my name", age: 10 };`
    -   Demonstration of TypeScript's error detection during typing (e.g., accessing `user.email` when `email` is not defined on the `user` object, even though the code can still compile to JavaScript).

### **2. Type Safety**

-   **Explanation**: A central concept in TypeScript is **type safety**. This feature aims to prevent the "odd behaviour" that can occur in JavaScript due to implicit type coercions. For instance, JavaScript allows operations like adding a number and a string (`2 + "2"` resulting in `"22"`), or adding values to `null` or `undefined`, which can lead to unexpected outcomes. TypeScript introduces mechanisms to **stop these type mismatches** at the development stage, ensuring that operations are performed only on compatible data types and promoting consistency.
-   **Code Examples**:
    -   Illustrates `2 + "2"` yielding `22` in JavaScript, indicating a lack of type safety.
    -   Mentions similar issues with operations like adding `2` to `null` or `undefined` values.

### **3. Installation and Environment Setup**

-   **Explanation**: TypeScript installation is typically done via npm. The tutorial distinguishes between two main installation approaches:
    -   A **globalized system install** (`npm install -g typescript`), suitable for initial learning and experimenting with core TypeScript concepts.
    -   A **project-specific install** (`npm install typescript --save-dev`), which is common in frameworks like React or Angular, where TypeScript is managed as a development dependency and typically requires a `tsconfig.json` configuration file.
-   **Prerequisites**: Users must have Node.js and npm installed to proceed (`node -v` and `npm -v` commands are mentioned for verification).
-   **Key Commands & Files**:
    -   `tsc`: The TypeScript compiler command. Used to check the version (`tsc -v`) and to compile `.ts` files into `.js` files (`tsc [filename.ts]`).
    -   `tsc --init`: Initializes a TypeScript project by creating a `tsconfig.json` file in the current directory, which contains various compiler options.
    -   `tsc -w`: Runs the TypeScript compiler in **watch mode**, continuously monitoring `.ts` files for changes and recompiling them into `.js` automatically, respecting the `tsconfig.json` settings.
    -   `tsconfig.json`: This crucial configuration file governs how TypeScript compiles files, including target ECMAScript versions (`target`), output directories (`outDir`), strictness rules, and more.
-   **Project Structure**: A standard project setup involves a `src/` (source) folder for writing TypeScript code (e.g., `index.ts`) and a `dist/` (distribution) folder where the compiled JavaScript code (e.g., `index.js`) is generated for deployment.
-   **Code Examples**:
    -   Global install: `npm install -g typescript`.
    -   Checking compiler version: `tsc -v`.
    -   Compiling a file: `tsc intro.ts` (creates `intro.js` from `intro.ts`).
    -   Initializing `tsconfig.json`: `tsc --init`.
    -   Setting up a basic web project with `index.html` linking to `dist/index.js`, and TypeScript code in `src/index.ts`.
    -   Configuration in `tsconfig.json`: ` "outDir": "./dist"`.

### **4. Basic Types**

-   **Explanation**: TypeScript's foundation lies in its type system. The tutorial introduces common **primitive types**: `number`, `string`, and `boolean`. It's noted that JavaScript does not differentiate between integers and floating-point numbers, and TypeScript similarly uses a single `number` type for both. Other fundamental types briefly mentioned include `null`, `undefined`, `void`, `object`, `array`, `tuple`, `never`, and `unknown`.
-   **Type Annotation Syntax**: To explicitly assign a type to a variable, a **colon `:` is used after the variable name, followed by the type name** (which is typically lowercase).
-   **Type Inference**: TypeScript is "smart enough" to **automatically infer a variable's type** if it is initialized immediately with a value. In such cases, explicit type annotation can be omitted as it becomes redundant.
-   **Code Examples**:
    -   **String Type**:

        ```typescript
        let greetings: string = 'Hitesh';
        // Trying to assign incorrect type:
        // greetings = 6; // Error: Type 'number' is not assignable to type 'string'.
        // greetings = true; // Error: Type 'boolean' is not assignable to type 'string'.
        ```

    -   **Number Type**:

        ```typescript
        let userId: number = 334466;
        let decimalNum: number = 0.2; // Both integers and floats are 'number'
        ```

    -   **Boolean Type**:

        ```typescript
        let isLoggedIn: boolean = false;
        ```

    -   Demonstration of **Type Inference**:

        ```typescript
        let inferredNum = 10; // TypeScript infers 'inferredNum' as 'number'
        // inferredNum = "hello"; // Error: Type 'string' is not assignable to type 'number'.
        ```

    -   Type-checking also provides type-specific method suggestions (e.g., `myNum.toFixed()` for a number, `greetings.toUpperCase()` for a string).

### **5. `any` Keyword**

-   **Explanation**: The `any` keyword is presented as a mechanism to **opt out of TypeScript's type-checking** for a particular value. While it allows flexibility, it is strongly advised against, as it defeats the purpose of using TypeScript's strictness and should generally be avoided.
-   **Compiler Flag**: The `tsconfig.json` file contains a `noImplicitAny` compiler flag. Enabling this flag (often recommended) will cause TypeScript to **flag any implicitly typed `any` as an error**, forcing developers to explicitly define types or use other type-safe alternatives.
-   **Code Example**:
    -   Implicit `any`: `let hero;` (if not immediately assigned a type or value, it becomes `any`).
    -   Demonstrates how `any` can lead to inconsistent data:

        ```typescript
        let hero; // Type is 'any'
        function getHero() {
            // Imagine this fetches data, but sometimes returns a string, sometimes a boolean
            return 'Thor'; // Or return true;
        }
        hero = getHero(); // 'hero' will accept either 'string' or 'boolean' without error if 'any'
        ```

    -   The recommended solution is to explicitly type the variable: `let hero: string;`.

### **6. Functions**

-   **Explanation**: In TypeScript, functions are enhanced with **type annotations for both their parameters and their return values**. This explicit typing ensures that functions receive and produce data in the expected formats, which is crucial for building robust applications and collaborative development.
-   **Syntax for Parameters**: Parameters are annotated with a colon and their type, e.g., `(paramName: Type)`.
-   **Syntax for Return Type**: The return type is specified after the function's parameter list, separated by a colon, e.g., `(): ReturnType`.
-   **`void` Return Type**: Used to indicate that a function does not return any value.
-   **`never` Return Type**: This is a special return type for functions that _never_ complete their execution normally. This could be because they always throw an exception or cause the program to terminate. It's distinct from `void` and indicates an intentional "crash" or non-return.
-   **Default Parameters**: Parameters can be assigned default values using `paramName: Type = defaultValue`, making them optional during function calls.
-   **Arrow Functions**: Type annotation for arrow functions follows a similar pattern, with the return type placed after the parameters, before the arrow.
-   **Code Examples**:
    -   **Function with Number Parameter and Number Return Type**:

        ```typescript
        function addTwo(num: number): number {
            return num + 2;
        }
        // addTwo("5"); // Error: Argument of type 'string' is not assignable to parameter of type 'number'.
        ```

    -   **Function with String Parameter and String Return Type**:

        ```typescript
        function getUpper(value: string): string {
            return value.toUpperCase();
        }
        // getUpper(4); // Error: Argument of type 'number' is not assignable to parameter of type 'string'.
        ```

    -   **Function with Multiple Parameters and Types**:

        ```typescript
        function signUpUser(name: string, email: string, isPaid: boolean) {
            // Function logic here
        }
        signUpUser('hitesh', 'hitesh@lco.dev', false);
        ```

    -   **Arrow Function with Default Parameter**:

        ```typescript
        const loginUser = (
            name: string,
            email: string,
            isPaid: boolean = false
        ) => {
            // Function logic here
        };
        loginUser('h', 'h@h.com'); // 'isPaid' defaults to false
        ```

    -   **`void` Return Type**:

        ```typescript
        function consoleError(errmsg: string): void {
            console.log(errmsg);
            // return 1; // Error: Type 'number' is not assignable to type 'void'.
        }
        ```

    -   **`never` Return Type**:

        ```typescript
        function handleError(errmsg: string): never {
            throw new Error(errmsg); // This function never returns a value, always throws
        }
        ```

    -   **Type Inference in Callbacks (e.g., `map`)**: When iterating over an array of a known type (e.g., `string[]`), TypeScript automatically infers the type of the callback parameter (e.g., `hero` in `heroes.map((hero) => ...)`). You can still explicitly type the return value for better readability in team projects: `heroes.map((hero): string => { return 'Hero is ' + hero; });`.

### **7. Objects**

-   **Explanation**: Objects are extensively used in JavaScript for structuring data, such as database entries. TypeScript extends this by allowing developers to **define the precise structure and types of properties within objects**, especially when these objects are passed as arguments to or returned from functions.
-   **Optional Properties**: A property can be marked as optional by appending a **question mark `?`** after its name (e.g., `propertyName?: Type`), meaning it doesn't have to be present in the object.
-   **`readonly` Modifier**: The `readonly` keyword can be used before a property name (e.g., `readonly propertyName: Type`) to ensure that once the property is initialized, its value **cannot be reassigned**.
-   **Excess Property Checking**: TypeScript performs checks to prevent passing object literals with properties not defined in the expected type. However, this strictness can be bypassed if the object is first assigned to a variable and then that variable is passed. This is considered a "weird behaviour" of TypeScript.
-   **Code Examples**:

    -   **Function Accepting an Object with Defined Structure**:

        ```typescript
        function createUser(user: { name: string; isPaid: boolean }) {
            // Logic for creating user
        }
        createUser({ name: 'hitesh', isPaid: false }); // Valid
        // createUser({ name: "hitesh", isPaid: false, email: "h@h.com" }); // Error if passed directly as literal, as 'email' is an excess property.
        ```

    -   **Function Returning an Object**:

        ```typescript
        function createCourse(): { name: string; price: number } {
            return { name: 'react.js', price: 399 };
        }
        ```

    -   **Object with `readonly` and Optional Properties**:

        ```typescript
        type User = {
            // Using a Type Alias for clarity, covered next
            readonly _id: string; // _id cannot be changed after creation
            name: string;
            email: string;
            isActive: boolean;
            creditCardDetails?: number; // creditCardDetails is optional
        };

        let myUser: User = {
            _id: '1234',
            name: 'H Mr H',
            email: 'H@h.com',
            isActive: false,
        };
        // myUser._id = "5678"; // Error: Cannot assign to '_id' because it is a read-only property.
        myUser.email = 'H@gmail.com'; // Allowed
        ```

    -   **Bypass of Excess Property Checking**:
        ```typescript
        let newUserObj = { name: 'hitesh', isPaid: false, email: 'h@h.com' };
        // This assignment might allow 'email' to be passed without error,
        // even if 'createUser' only expects 'name' and 'isPaid'.
        // createUser(newUserObj); // (Depends on specific TypeScript configuration and version)
        ```

### **8. Type Aliases (`type` keyword)**

-   **Explanation**: Type aliases provide a way to **define a new name for a type**, allowing for reusable and descriptive type definitions. This is particularly beneficial for complex object structures that are used repeatedly across multiple functions or components, improving code readability and maintainability by preventing lengthy inline type declarations.
-   **Syntax**: Type aliases are declared using the `type` keyword, followed by the alias name and its definition (e.g., `type MyType = { /* ... */ };`).
-   **Combining Types (Intersection Types)**: Type aliases can be combined using the **ampersand `&` operator**, creating an **intersection type**. This means the new type will inherit all properties from the types it combines, enforcing that an object of this type must satisfy all combined definitions.
-   **Code Examples**:

    -   **Defining a `User` Type Alias**:

        ```typescript
        type User = {
            name: string;
            email: string;
            isActive: boolean;
        };

        // Reusing the type alias in a function parameter
        function createUser(user: User) {
            // Function logic
        }

        createUser({
            name: 'Alice',
            email: 'alice@example.com',
            isActive: true,
        });
        // createUser({ name: "Bob", email: "bob@example.com" }); // Error: Property 'isActive' is missing.
        ```

    -   **Combining Type Aliases (Intersection Type)**:

        ```typescript
        type CardNumber = { cardNumber: string };
        type CardDate = { cardDate: string };

        // CardDetails must have all properties from CardNumber, CardDate, AND cvv
        type CardDetails = CardNumber & CardDate & { cvv: number };

        let myCard: CardDetails = {
            cardNumber: '1234-5678-9012-3456',
            cardDate: '12/25',
            cvv: 123,
        };
        // myCard = { cardNumber: "...", cardDate: "..." }; // Error: Property 'cvv' is missing.
        ```

### **9. Arrays**

-   **Explanation**: TypeScript allows explicit typing of arrays, ensuring that they contain only elements of a specified type. This enforces type consistency within collections.
-   **Syntax Options**: There are two primary syntaxes for declaring array types, both functionally equivalent:
    -   **`ElementType[]`**: Appending `[]` to the element's type (e.g., `string[]` for an array of strings).
    -   **`Array<ElementType>`**: Using the `Array` generic type with the element's type in angle brackets (e.g., `Array<number>` for an array of numbers).
-   **Arrays of Custom Types**: Arrays can also be typed to hold elements that conform to a custom `type` alias or `interface` definition.
-   **Multi-dimensional Arrays**: TypeScript supports typing for arrays nested within arrays (e.g., `number[][]` for an array of number arrays).
-   **`never` Type in Array Inference**: If an empty array is declared without an explicit type annotation, TypeScript might infer its type as `never[]`, which then prevents any elements from being pushed into it without a type error.
-   **Code Examples**:
    -   **Array of Strings (`ElementType[]` syntax)**:

        ```typescript
        let superheroes: string[] = [];
        superheroes.push('Spider-Man'); // Allowed
        // superheroes.push(123); // Error: Argument of type 'number' is not assignable to parameter of type 'string'.
        ```

    -   **Array of Numbers (`Array<ElementType>` syntax)**:

        ```typescript
        let heroPower: Array<number> = [];
        heroPower.push(2); // Allowed
        ```

    -   **Array of Custom `User` Type**:

        ```typescript
        type User = { name: string; isActive: boolean };
        const allUsers: User[] = [];
        allUsers.push({ name: 'Alice', isActive: true }); // Allowed
        // allUsers.push({}); // Error: Property 'name' and 'isActive' are missing.
        ```

    -   **Multi-dimensional Array (Array of Arrays of Numbers)**:
        ```typescript
        let pixelValues: number[][] = [];
        pixelValues.push(); // Allowed
        // pixelValues.push([1, "2"]); // Error: Type 'string' is not assignable to type 'number'.
        ```

### **10. Union Types (`|`)**

-   **Explanation**: Union types enable a variable, parameter, or return type to accept **more than one specified data type**. This provides a type-safe alternative to the `any` keyword when you know the possible types a value could take, but not its exact type at all times.
-   **Syntax**: The pipe symbol **`|`** is used between the different types to denote a union (e.g., `number | string`).
-   **Type Narrowing**: When working with union types, TypeScript often requires **type narrowing** (e.g., using `typeof` checks or other control flow analysis) before performing operations specific to one of the types in the union. This ensures type safety by guaranteeing the exact type at a particular point in the code.
-   **Union Types with Custom Types**: Union types can also be formed using custom `type` aliases or `interface` definitions, allowing for complex data structures to be represented.
-   **Arrays with Union Types**:
    -   **Mixed-type Array `(Type1 | Type2)[]`**: This syntax correctly indicates an array that can contain a mixture of elements from the specified types (e.g., `(string | number)[]` for an array with both strings and numbers).
    -   **Array of `Type1` OR Array of `Type2` `Type1[] | Type2[]`**: A common misconception is to use `Type1[] | Type2[]` for mixed arrays. This syntax means the array must _either_ contain _only_ `Type1` elements _or_ _only_ `Type2` elements, not a combination.
-   **Literal Types (related)**: A more restrictive form of union types where the values are specific literal values (e.g., `'aisle' | 'middle' | 'window'`) rather than broader types.
-   **Code Examples**:

    -   **Variable with `number` or `string` type**:

        ```typescript
        let score: number | string = 33; // Starts as number
        score = '55'; // Allowed, as 'string' is part of the union
        // score = true; // Error: Type 'boolean' is not assignable to type 'string | number'.
        ```

    -   **Union with Custom Types (`User` or `Admin`)**:

        ```typescript
        type User = { name: string; id: number };
        type Admin = { username: string; id: number };

        let hitesh: User | Admin = { name: 'myname', id: 334 }; // Starts as User
        hitesh = { username: 'hc', id: 334 }; // Allowed, can be reassigned as Admin
        ```

    -   **Function Parameter with Union Type and Narrowing**:

        ```typescript
        function getDbId(id: number | string) {
            // Narrowing using typeof
            if (typeof id === 'string') {
                console.log(id.toLowerCase()); // 'id' is guaranteed to be 'string' here
            } else {
                console.log(id + 2); // 'id' is guaranteed to be 'number' here
            }
        }
        getDbId(3); // Passes a number
        getDbId('3'); // Passes a string
        ```

    -   **Array Allowing Mixed Types**:

        ```typescript
        let mixedData: (string | number | boolean)[] = [1, 2, 'hello', true]; // Valid, mixed types allowed
        // let strictMixedData: string[] | number[] = [1, 2, "hello"]; // Error: Cannot mix types. Either all strings or all numbers.
        ```

    -   **Literal Type Example**:
        ```typescript
        type SeatAllotment = 'aisle' | 'middle' | 'window';
        let mySeat: SeatAllotment = 'aisle'; // Valid
        // mySeat = "crew"; // Error: Type '"crew"' is not assignable to type 'SeatAllotment'.
        ```

### **11. Tuples**

-   **Explanation**: Tuples are a specialized array-like type in TypeScript that enforce a **fixed number of elements** and a **specific order of types** for those elements. They are particularly useful in scenarios where data needs to be structured precisely, such as for API responses or database records where the position of a value dictates its type.
-   **Syntax**: Tuple types are defined by listing the types of each element within square brackets, separated by commas (e.g., `[Type1, Type2, Type3]`).
-   **Limitations/Controversies**: A notable characteristic (and point of discussion) regarding tuples is that while they enforce type and length during _declaration_, they **do not prevent array methods like `push()` or `unshift()` from adding elements that might violate the tuple's defined types or length at runtime**. This can lead to situations where the intended type safety is bypassed.
-   **Code Examples**:

    -   **Basic Tuple (String, Number, Boolean)**:

        ```typescript
        type TUser = [string, number, boolean];
        let tUser: TUser;
        tUser = ['hc', 131, true]; // Correct: order and types match
        // tUser = [true, 131, "hc"]; // Error: Type 'boolean' is not assignable to type 'string'.
        // tUser = ["hc", 131]; // Error: Source has 2 elements, but target requires 3.
        ```

    -   **RGB Color Tuple (Fixed Length of Numbers)**:

        ```typescript
        type RGB = [number, number, number];
        let newColor: RGB =; // Valid
        // newColor = [255, 123, 112, 0.5]; // Error: Type '[number, number, number, number]' is not assignable to type 'RGB'.
        ```

    -   **Tuple with Custom Types**:

        ```typescript
        type UserTuple = [number, string]; // Example: [UserID, UserEmail]

        let newUser: UserTuple = [123, 'example@google.com']; // Valid
        // newUser = ["example@google.com", 123]; // Error: Type 'string' is not assignable to type 'number'.
        ```

    -   **Demonstrating Tuple Limitation with `push()`**:
        ```typescript
        let newUser: UserTuple = [123, 'example@google.com'];
        newUser.push(true); // This operation might be allowed by TypeScript (depending on version/config),
        // even though 'true' is not part of the [number, string] tuple definition.
        ```

### **12. Enums (`enum` keyword)**

-   **Explanation**: Enums (enumerations) in TypeScript allow the definition of a **set of named constants**, effectively restricting a variable's possible values to a predefined list. This is highly useful for scenarios where you need to model distinct, fixed choices, such as order statuses in e-commerce, seat types in airline booking, or specific menu options.
-   **Default Behaviour**: By default, the first member of a numeric enum is assigned the value `0`, with subsequent members automatically incrementing (e.g., `0, 1, 2, ...`).
-   **Custom Values**: Developers can explicitly assign numeric or string values to enum members. If string values are assigned to some members, all subsequent members must also be explicitly assigned values, as auto-incrementation does not apply to strings.
-   **`const enum`**: Prefixing an enum declaration with the `const` keyword (e.g., `const enum SeatChoice`) instructs TypeScript to generate **more minimal and cleaner JavaScript code**. This avoids the generation of an Immediately Invoked Function Expression (IIFE) structure, resulting in direct literal values in the compiled JavaScript output.
-   **Code Examples**:
    -   **Basic Numeric Enum (Default Indexing)**:

        ```typescript
        enum SeatChoice {
            AISLE, // Defaults to 0
            MIDDLE, // Defaults to 1
            WINDOW, // Defaults to 2
        }
        let hcSeat: SeatChoice = SeatChoice.AISLE; // hcSeat will have value 0
        ```

    -   **Enum with Custom Numeric Values**:

        ```typescript
        enum SeatChoice {
            AISLE = 10, // Explicitly set to 10
            MIDDLE, // Auto-increments to 11
            WINDOW, // Auto-increments to 12
        }
        let mySeat: SeatChoice = SeatChoice.MIDDLE; // mySeat will have value 11
        ```

    -   **Enum with Custom String Values**:

        ```typescript
        enum SeatChoice {
            AISLE = 'AISLE',
            MIDDLE = 'MIDDLE',
            WINDOW = 'WINDOW',
        }
        let yourSeat: SeatChoice = SeatChoice.AISLE; // yourSeat will literally be the string "AISLE"
        ```

    -   **`const enum` for Optimized JavaScript Output**:
        ```typescript
        const enum SeatChoice {
            AISLE = 10,
            MIDDLE,
            WINDOW,
        }
        let internationalSeat: SeatChoice = SeatChoice.AISLE;
        // Compiled JavaScript would directly use '10' instead of 'SeatChoice.AISLE'
        ```

### **13. Interfaces (`interface` keyword)**

-   **Explanation**: Interfaces in TypeScript define a **contract or blueprint for the structure of objects or classes**. They specify which properties and methods _must_ be present, along with their types, but they **do not include any implementation details** for methods. Interfaces are conceptual constructs that enforce consistency and ensure that any object or class adhering to an interface will have the expected shape. They are often compared to "protocols" in iOS development.
-   **Similarities to Type Aliases**: Interfaces share many similarities with type aliases when defining object shapes.
-   **Key Differences (highlighted in the tutorial)**:
    -   **Declaration Merging ("Reopening")**: A unique feature where interfaces with the same name can be declared multiple times. TypeScript automatically merges their definitions, allowing you to add new properties or methods to an existing interface. This is particularly useful for extending types from third-party libraries. Type aliases do not support this feature.
    -   **Inheritance (`extends`)**: Interfaces can extend (inherit from) one or more other interfaces, acquiring all their properties and methods. This promotes code reuse and hierarchical type definitions.
    -   **Implementation by Classes**: Classes use the `implements` keyword to declare that they adhere to the contract defined by an interface, forcing the class to provide implementations for all properties and methods declared in that interface.
-   **`readonly` and Optional Properties**: Interfaces support `readonly` properties (cannot be reassigned after initialization) and optional properties (marked with `?`), similar to how they are used with object types or type aliases.
-   **Defining Methods**: Methods can be defined within an interface by specifying their name, parameters, and return type, but no method body (implementation) is provided.
-   **Code Examples**:

    -   **Basic `User` Interface Definition**:

        ```typescript
        interface User {
            email: string;
            userId: number;
            googleId?: string; // Optional property
            readonly dbId: number; // Read-only property
            startTrial(): string; // Method declaration (no implementation)
            getCoupon(couponname: string, value: number): number; // Method with params and return type
        }
        ```

    -   **Creating an Object Conforming to the Interface**:

        ```typescript
        const hitesh: User = {
            email: 'h@h.com',
            userId: 2211,
            dbId: 123,
            startTrial: () => {
                // Implementation for startTrial method
                return 'trial started';
            },
            getCoupon: (name: string, off: number) => {
                // Implementation for getCoupon method
                return 10;
            },
        };
        // hitesh.dbId = 333; // Error: Cannot assign to 'dbId' because it is a read-only property.
        ```

    -   **Reopening an Interface (Declaration Merging)**:

        ```typescript
        interface User {
            githubToken: string; // Adds 'githubToken' to the existing 'User' interface
        }
        // Now, any object of type 'User' must also include 'githubToken'.
        // This is useful for extending types from external libraries.
        ```

    -   **Interface Inheritance (`extends`)**:

        ```typescript
        interface Admin extends User {
            // 'Admin' inherits all properties and methods from 'User'
            role: 'admin' | 'ta' | 'learner'; // Adds a new property specific to Admin
        }
        // An object of type 'Admin' would require 'email', 'userId', 'dbId', 'startTrial', 'getCoupon', and 'role'.
        ```

    -   **Class Implementing an Interface (`implements`)**:

        ```typescript
        interface TakePhoto {
            cameraMode: string;
            filter: string;
            burst: number;
        }

        class Instagram implements TakePhoto {
            // Instagram class declares it adheres to TakePhoto interface
            constructor(
                public cameraMode: string,
                public filter: string,
                public burst: number
            ) {
                // Must define these properties
            }
            // If any property or method from TakePhoto is missing, TypeScript will error.
        }
        ```

### **14. Classes**

-   **Explanation**: TypeScript supports object-oriented programming with classes, providing a robust structure similar to JavaScript classes but with added **type safety and access control modifiers**.
-   **Constructors**: Classes can have constructors to initialize properties when a new object is created. Parameters passed to the constructor can be assigned to the class's properties.
-   **Property Declaration**: All properties intended to be part of the class instance must be declared with their types within the class definition (e.g., `propertyName: Type;`).
-   **Access Modifiers**: These keywords control the visibility and accessibility of class members:
    -   **`public`**: (Default modifier) Members are accessible from anywhere: inside the class, from instances of the class, and from subclasses. Explicitly using `public` can make code clearer.
    -   **`private`**: Members are strictly **only accessible from within the class itself**. They cannot be accessed from instances of the class or from subclasses. In JavaScript, a `#` prefix (`#propertyName`) achieves similar privacy, but `private` is the TypeScript-specific keyword.
    -   **`protected`**: Members are accessible from **within the class itself and also from any classes that inherit from it (subclasses)**, but not from outside instances.
-   **Shorthand Constructor Syntax**: A convenient shortcut where properties can be declared and initialized directly within the constructor's parameter list by prefixing them with an access modifier (`public`, `private`, or `protected`). This eliminates the need for separate property declarations and `this.propertyName = propertyName` assignments within the constructor body.
-   **Getters and Setters**: These provide controlled access to class properties, often used to expose `private` properties safely:
    -   **`get`**: Defines a getter method that returns a property's value. It can include custom logic before returning the value.
    -   **`set`**: Defines a setter method that allows updating a property's value. It can include validation or other logic. A key TypeScript rule is that **setter methods cannot have a return type annotation** (they implicitly return `void`).
-   **Private Methods**: Just like properties, methods can also be marked as `private`, making them callable only from within the class.
-   **Inheritance**: Classes can inherit from other classes using the `extends` keyword. A subclass `extends` a parent class, inheriting its public and protected members. Subclasses must call `super()` in their constructors to pass parameters to the parent class's constructor.
-   **Code Examples**:

    -   **Basic Class with Explicit Property Declaration**:

        ```typescript
        class User {
            email: string;
            name: string;
            constructor(email: string, name: string) {
                this.email = email;
                this.name = name;
            }
        }
        const hitesh = new User('h@example.com', 'Hitesh');
        ```

    -   **Class with Optional and Readonly Properties**:

        ```typescript
        class User {
            email: string;
            name: string;
            readonly city: string = 'Jaipur'; // Read-only property with default
            courseCount?: number; // Optional property
            constructor(email: string, name: string) {
                this.email = email;
                this.name = name;
            }
        }
        // hitesh.city = "Delhi"; // Error: Cannot assign to 'city' because it is a read-only property.
        ```

    -   **Shorthand Constructor Syntax (with Access Modifiers)**:

        ```typescript
        class User {
            // Properties declared and initialized directly from constructor parameters
            constructor(
                public email: string, // Public property
                public name: string, // Public property
                private userId: string // Private property
            ) {
                // No need for 'this.email = email;' etc.
            }
        }
        const hitesh = new User('h@example.com', 'Hitesh', 'abc1234');
        // console.log(hitesh.email); // Allowed
        // console.log(hitesh.userId); // Error: 'userId' is private.
        ```

    -   **Private Property Example**:

        ```typescript
        class User {
            private _secret: string = 'mySecret'; // Private property
            constructor(public email: string) {}
            // Access _secret only within the class (e.g., in a method)
            getSecret() {
                return this._secret;
            }
        }
        ```

    -   **Getters and Setters**:

        ```typescript
        class User {
            private _courseCount: number = 1; // Private property for course count

            constructor(public email: string) {}

            get getAppleEmail(): string {
                // Getter: prefixed with 'get'
                return `apple${this.email}`;
            }

            get courseCount(): number {
                // Getter for _courseCount
                return this._courseCount;
            }

            set courseCount(courseNum: number) {
                // Setter: prefixed with 'set', no return type
                if (courseNum <= 1) {
                    throw new Error('Course count should be more than one');
                }
                this._courseCount = courseNum;
            }
        }
        const user = new User('test@test.com');
        console.log(user.getAppleEmail); // Access getter
        user.courseCount = 5; // Use setter
        // user.courseCount = 0; // Throws error from setter
        ```

    -   **Protected Member and Inheritance**:

        ```typescript
        class User {
            protected _protectedProp: string = 'initial'; // Protected property
            constructor(public email: string) {}
        }

        class SubUser extends User {
            // SubUser inherits from User
            constructor(public email: string, public name: string) {
                super(email); // Call parent constructor
            }
            accessProtected() {
                console.log(this._protectedProp); // Accessible within SubUser
            }
        }
        const sub = new SubUser('sub@test.com', 'Subby');
        // console.log(sub._protectedProp); // Error: '_protectedProp' is protected and only accessible within class 'User' and its subclasses.
        sub.accessProtected(); // Allowed
        ```

### **15. Abstract Classes**

-   **Explanation**: Abstract classes serve as **blueprints for other classes** but **cannot be instantiated directly** themselves. Their primary purpose is to define a common structure and potentially some shared behaviour (concrete methods) for a group of related subclasses, while also enforcing that certain methods (abstract methods) must be implemented by those subclasses.
-   **Keyword**: An abstract class is declared using the `abstract` keyword before the `class` keyword (e.g., `abstract class MyAbstractClass { ... }`).
-   **Key Differences from Interfaces**:
    -   **Instantiation**: Like interfaces, abstract classes cannot be used to create objects directly. However, concrete (non-abstract) classes that `extend` an abstract class _can_ be instantiated.
    -   **Implementation**: Interfaces define only contracts (method signatures without bodies). Abstract classes, on the other hand, can contain both:
        -   **Abstract methods**: Declared with the `abstract` keyword and no implementation (`abstract myMethod(): void;`). These _must_ be implemented by any concrete subclass.
        -   **Concrete methods**: Regular methods with full implementations. Subclasses inherit these implementations but can also override them.
    -   **Relationship**: Classes `extends` abstract classes (indicating an inheritance relationship), while classes `implements` interfaces (indicating adherence to a contract).
-   **Code Examples**:

    -   **Abstract Class Definition with Abstract and Concrete Methods**:

        ```typescript
        abstract class TakePhoto {
            // Constructor with public properties (shorthand syntax)
            constructor(public cameraMode: string, public filter: string) {}

            // Abstract method: must be implemented by concrete subclasses
            abstract getSepia(): void;

            // Concrete method: has an implementation, inherited by subclasses
            getReelTime(): number {
                // Complex calculation logic
                return 8;
            }
        }
        ```

    -   **Extending an Abstract Class**:

        ```typescript
        class Instagram extends TakePhoto {
            // Instagram extends the abstract class TakePhoto
            constructor(
                public cameraMode: string,
                public filter: string,
                public burst: number
            ) {
                super(cameraMode, filter); // Calls the constructor of the parent (TakePhoto)
            }

            // Implementation of the abstract method from TakePhoto
            getSepia(): void {
                console.log('Sepia effect applied.');
            }

            // Can override concrete methods from parent if needed, but not compulsory
            // getReelTime(): number { return 10; }
        }

        // const invalidInstance = new TakePhoto("test", "test"); // Error: Cannot create an instance of an abstract class.
        const myInstagram = new Instagram('portrait', 'vintage', 5); // Valid: Instantiates the concrete subclass
        console.log(myInstagram.getReelTime()); // Uses the concrete method from the abstract parent
        ```

### **16. Generics (`<T>`)**

-   **Explanation**: Generics are a powerful feature in TypeScript that enable the creation of **reusable, flexible components** (functions, classes, interfaces) that can operate with a wide variety of data types while **maintaining full type safety**. They solve the problem of writing repetitive code for different types by allowing type parameters to be placeholders for actual types that are determined at the time of use.
-   **Type Parameters**: Represented by a type variable (commonly `T`, `U`, `K`, etc.) enclosed in angle brackets (`<T>`). This variable acts as a placeholder for a specific type that will be "locked in" when the generic component is used.
-   **Key Difference from `any`**: Unlike `any`, which bypasses type checking, generics _preserve_ type information. When a specific type is provided to a generic, TypeScript ensures that operations within the generic component adhere to that type, providing strong type safety throughout its usage.
-   **Generic Constraints (`extends`)**: Generics can be constrained, meaning you can specify that a type parameter must `extend` a certain type or conform to a specific interface. This ensures that the generic component can only be used with types that possess certain properties or behaviours.
-   **Generic Classes**: Classes can also be made generic, allowing them to define properties and methods that operate on a type parameter, making the class itself reusable for different data types.
-   **Arrow Function Syntax**: When defining generic arrow functions, the type parameter `T` is placed _before_ the function's parameter list, inside angle brackets (e.g., `const func = <T>(param: T): T => { ... };`).
-   **Comma After Generics (JSX Context)**: In contexts where TypeScript might confuse a generic type parameter with a JSX tag (e.g., within React files), a trailing comma is sometimes added inside the angle brackets to explicitly indicate it's a generic type parameter (e.g., `function func<T,>(val: T) { ... }`).
-   **Code Examples**:

    -   **Generic Identity Function (basic)**:

        ```typescript
        function identity<T>(val: T): T {
            // 'T' is the type parameter
            return val;
        }
        identity(3); // 'T' is inferred as 'number', returns a number
        identity('hitesh'); // 'T' is inferred as 'string', returns a string
        identity(true); // 'T' is inferred as 'boolean', returns a boolean
        ```

    -   **Generic Identity Function (common shorthand syntax)**:

        ```typescript
        const identity4 = <T>(val: T): T => {
            // 'T' is placed before parameters in arrow functions
            return val;
        };
        // identity4<string>("myString"); // Can explicitly specify the type parameter
        ```

    -   **Generic Function with Multiple Type Parameters**:

        ```typescript
        function anotherFunction<T, U>(val1: T, val2: U): { val1: T; val2: U } {
            return { val1, val2 };
        }
        anotherFunction(3, '4'); // 'T' is 'number', 'U' is 'string'
        ```

    -   **Generic Constraint (`extends`)**:

        ```typescript
        interface Database {
            // Defines a contract for database configuration
            connectionString: string;
            username: string;
            password: string;
        }
        // 'T' must conform to the 'Database' interface
        function connectToDB<T extends Database>(dbConfig: T): T {
            // Logic to connect to DB
            return dbConfig;
        }
        // connectToDB({ type: "some" }); // Error: Argument does not match 'Database' interface
        connectToDB({
            connectionString: 'mongodb://...',
            username: 'user',
            password: 'pwd',
        }); // Valid
        ```

    -   **Generic Class Example**:

        ```typescript
        interface Quiz {
            name: string;
            type: string;
        }
        interface Course {
            name: string;
            author: string;
            subject: string;
        }

        class Sellable<T> {
            // 'Sellable' is a generic class
            public cart: T[] = []; // 'cart' holds an array of type 'T'

            addToCart(product: T) {
                this.cart.push(product);
            }
        }
        // Create a 'Sellable' instance specifically for 'Course' objects
        const myCourses = new Sellable<Course>();
        myCourses.addToCart({
            name: 'TS Course',
            author: 'Hitesh',
            subject: 'Programming',
        });

        // Create a 'Sellable' instance specifically for 'Quiz' objects
        const myQuizzes = new Sellable<Quiz>();
        myQuizzes.addToCart({ name: 'JS Quiz', type: 'MCQ' });
        ```

### **17. Type Narrowing**

-   **Explanation**: Type narrowing is a fundamental aspect of TypeScript that involves **refining a variable's type within specific code blocks (e.g., conditional statements)** based on runtime checks. This process allows TypeScript to guarantee the variable's precise type at that point, enabling type-specific operations without errors. It addresses JavaScript's quirks where `typeof` might return `'object'` for both arrays and `null`.
-   **`typeof` Type Guard**: A basic form of narrowing that uses the `typeof` operator to check the runtime type of primitive values (e.g., `string`, `number`, `boolean`).
-   **`in` Operator Narrowing**: Used to check if a specific property exists within an object. This is highly useful for distinguishing between different object shapes within a union type (e.g., checking if an object has an `isAdmin` property to determine if it's an `Admin` type).
-   **`instanceof` Operator Narrowing**: This operator is used to check if an object is an instance of a particular class or constructor function. It's effective for narrowing down types when dealing with objects created using the `new` keyword (e.g., `Date` objects or instances of custom classes).
-   **Type Predicates (`is` keyword)**: A custom function signature that uses the `parameterName is Type` syntax in its return type. When such a function returns `true`, TypeScript guarantees that the input `parameterName` is of the specified `Type` within the calling scope, providing a powerful way to perform custom type narrowing.
-   **Discriminated Unions**: This is a pattern for working with union types of objects where each object in the union has a common, literal property (often named `kind` or `type`). This shared property acts as a "discriminant" that can be used in `if`/`else if` chains or `switch` statements to precisely narrow down the object's type.
-   **`never` Type for Exhaustive Checks**: When used in the `default` case of a `switch` statement on a discriminated union, the `never` type acts as an **exhaustive check**. If a new type is added to the union but is not handled by any `case` in the `switch` statement, TypeScript will flag an error because the variable (which could be of the new unhandled type) cannot be assigned to `never`. This forces developers to ensure all possible types in a union are explicitly handled.
-   **Code Examples**:

    -   **`typeof` Narrowing**:

        ```typescript
        function detectTypes(val: number | string) {
            if (typeof val === 'string') {
                console.log(val.toLowerCase()); // 'val' is now guaranteed 'string'
            } else {
                console.log(val + 3); // 'val' is now guaranteed 'number'
            }
        }
        ```

    -   **`in` Operator Narrowing**:

        ```typescript
        interface User {
            name: string;
            email: string;
        }
        interface Admin {
            name: string;
            email: string;
            isAdmin: boolean;
        }

        function isAdminAccount(account: User | Admin) {
            if ('isAdmin' in account) {
                // Checks if 'isAdmin' property exists
                return account.isAdmin; // 'account' is narrowed to 'Admin' here
            }
            return false; // 'account' is inferred as 'User' here
        }
        ```

    -   **`instanceof` Operator Narrowing**:

        ```typescript
        function logValue(x: Date | string) {
            if (x instanceof Date) {
                // Checks if 'x' is an instance of 'Date'
                console.log(x.toUTCString()); // 'x' is narrowed to 'Date'
            } else {
                console.log(x.toUpperCase()); // 'x' is narrowed to 'string'
            }
        }
        ```

    -   **Type Predicate (`is` keyword)**:

        ```typescript
        type Fish = { swim: () => void };
        type Bird = { fly: () => void };

        // Type predicate: if this returns true, 'pet' is of type 'Fish'
        function isFish(pet: Fish | Bird): pet is Fish {
            return (pet as Fish).swim !== undefined; // Cast to Fish to check for 'swim' method
        }

        function getFood(pet: Fish | Bird) {
            if (isFish(pet)) {
                console.log('fish food'); // 'pet' is narrowed to 'Fish'
            } else {
                console.log('bird food'); // 'pet' is narrowed to 'Bird'
            }
        }
        ```

    -   **Discriminated Unions**:

        ```typescript
        interface Circle {
            kind: 'circle';
            radius: number;
        }
        interface Square {
            kind: 'square';
            side: number;
        }
        interface Rectangle {
            kind: 'rectangle';
            length: number;
            width: number;
        }

        type Shape = Circle | Square | Rectangle;

        function getTrueShape(shape: Shape) {
            if (shape.kind === 'circle') {
                return Math.PI * shape.radius ** 2; // 'shape' is narrowed to 'Circle'
            }
            if (shape.kind === 'square') {
                return shape.side * shape.side; // 'shape' is narrowed to 'Square'
            }
            // ... and so on for other 'kind' values
        }
        ```

    -   **`never` Type for Exhaustive Checks**:
        ```typescript
        function getArea(shape: Shape) {
            switch (shape.kind) {
                case 'circle':
                    return Math.PI * shape.radius ** 2;
                case 'square':
                    return shape.side * shape.side;
                case 'rectangle':
                    return shape.length * shape.width;
                default: // This 'default' case acts as an exhaustive check
                    const _defaultForShape: never = shape; // If 'shape' can be a type not handled above,
                    // this line will cause a type error, ensuring exhaustive handling.
                    return _defaultForShape;
            }
        }
        ```
