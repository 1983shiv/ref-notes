// Re-assignment and Re-declaration with var
var x = 10;
var x = 20; // Re-declaration allowed
x = 30; // Re-assignment allowed
console.log("var x:", x); // Output: 30

// Re-assignment and Re-declaration with let
let y = 10;
// let y = 20; // SyntaxError: Identifier 'y' has already been declared
y = 30; // Re-assignment allowed
console.log("let y:", y); // Output: 30

// Re-assignment and Re-declaration with const
const z = 10;
// const z = 20; // SyntaxError: Identifier 'z' has already been declared
// z = 30; // TypeError: Assignment to constant variable
console.log("const z:", z); // Output: 10

// Modifying const object (contents, not reference)
const obj = { value: 10 };
obj.value = 20; // Allowed: modifying object properties
console.log("const obj:", obj); // Output: { value: 20 }
// obj = { value: 30 }; // TypeError: Assignment to constant variable