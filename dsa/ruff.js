// write a func to output the fibonacci sequence

function fibonacci(n){
    const fib = [0, 1];
    if(n > 2) {
        for (let i = 2; i < n; i++ ){
            fib[i] = fib[i-1] + fib[i-2];
        }
        return fib;
    } else if( n === 2) {
        return fib;
    } else if( n === 1) {
        return fib[0];
    } else {
        return [0];
    }
}

// console.log(fibonacci(5))
// console.log(fibonacci(1))

function fibN_O(n){
    if(typeof n !== 'number' || n < 0 || !Number.isInteger(n)){
        throw new Error("n must be a non-negative integer");
    }

    const fib = [0, 1];
    if(n > 1) {
        for (let i = 2; i < n+1; i++ ){
            fib[i] = fib[i-1] + fib[i-2];
        }
        return fib[n];
    } else if( n === 1) {
        return fib[1];
    } else {
        return 0;
    }
}

function fibN(n) {
  if (typeof n !== 'number' || n < 0 || !Number.isInteger(n)) {
    throw new Error('n must be a non-negative integer');
  }
  let a = 0, b = 1;
  if (n === 0) return a;
  for (let i = 1; i < n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
}

// console.log(fibN(5))


function isFibSubseq(arr) {
    const n = arr.length
    const fib = [];
    for(let i = 0; i < n; i++){
        if(arr[i] === arr[i-1] + arr[i-2]){
            if(fib.length === 0){
                fib.push(arr[i-2]);
                fib.push(arr[i-1])
                fib.push(arr[i])    
            } else {
                fib.push(arr[i])
            }
        }
        
    }
    return fib;
}

// console.log(isFibSubseq([4, 0, 1, 1, 2, 3, 8]))
// console.log(isFibSubseq(["a", "b"]))
// 1. loop through array
// 2. check if current i is equal to i-1 + i-2
// 3. if yes, then check, i+1 is equal to i + i-1
// 4. if yes, then check i + 2 = i+1 + i


// function fibonacci_fac(n) {
//     if(n > 2){
//         fibonacci_fac(n-1);
//     } else {

//     }
    
// }

function recursiveFibonacci(n){
    if(n < 2){
        return n;
    } 
    return recursiveFibonacci(n-1) + recursiveFibonacci(n-2)
    
}

console.log(recursiveFibonacci(2))