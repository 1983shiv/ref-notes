export default class BankAccount {
    constructor(amt) {
        this.balance = amt;
    }
    deposit(amt) {
        if (amt > 0) {
            this.balance += amt;
        }
    }
    withdraw(amt) {
        if (amt > 0 && this.balance >= amt) {
            this.balance -= amt;
        }
    }
    getBalance() {
        return this.balance;
    }
}
//# sourceMappingURL=BankAccount.js.map