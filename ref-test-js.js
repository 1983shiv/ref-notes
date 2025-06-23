

// const http = require("node:http")

// const server = http.createServer((req, res) => {
//     const superHero = {
//         firstName:"Shiv",
//         lastName:"Srivastava"
//     }
//     res.writeHead(200, {
//       "content-type": "application/json"
//     });
//     res.end(JSON.stringify(superHero))
// });

// server.listen(3000, () => {
//   console.log("Server is running on port 3000")
// })


// const http = require("node:http")

// const server = http.createServer((req, res) => {
//   console.log({req})
//   res.writeHead(200, {
//     "Content-Type": "text/plain"
//   });
//   res.end("hello Shiv srivastava")
// });

// server.on("close", () => {
//   console.log("Server is closed")
// });
// server.listen(3000, () => {
//   console.log("Server is running on port 3000")
// })


// const buffer = new Buffer.from("shiv")
// buffer.write("Coding")
// console.log(buffer.toString())
// console.log(buffer)
// console.log(buffer.toJSON())



// function simpleCounter(count){
//     count++;
//     return count;
// }

// function createCounter() {
//   let count = 0; // Private variable in the outer function's scope

//   // Inner function that forms a closure over 'count'
//   function counter() {
//     count++; // Accesses and modifies the outer function's variable
//     return count;
//   }

//   return counter; // Return the inner function
// }

// // Create two independent counters
// const counter1 = createCounter();
// const counter2 = createCounter();

// console.log("counter1 :", counter1()); // Output: 1
// console.log("counter1 :", counter1()); // Output: 2
// console.log("counter2 :", counter2()); // Output: 1 (independent state)
// console.log("counter2 :", counter2()); // Output: 2
// console.log("counter1 :", counter1()); // Output: 3 (counter1's state is preserved)

// // const counter3 = simpleCounter(1)
// // console.log(counter3)
// // console.log(counter3)
// // console.log(counter3)