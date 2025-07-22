import User from "./classes/User.js"
import TaxCalculator2024 from "./classes/TaxCalculator2024.js";
import TaxCalculator2025 from "./classes/TaxCalculator2025.js";
import BankAccount from "./classes/BankAccount.js";



// let calculateTaxin2024 = new TaxCalculator2024()
// console.log(calculateTaxin2024.calculateTax(12_00_000))
// console.log(calculateTaxin2024.calculateInsurance(12_00_000))

// let calculateTaxin2025 = new TaxCalculator2025()
// console.log(calculateTaxin2025.calculateTax(12_00_000))

let newCustomer = new BankAccount(10_000)
newCustomer.deposit(1200)
newCustomer.withdraw(9000)
console.log(newCustomer.getBalance())

// let user = new User("Shiv", 41)
// user.sayHello();






