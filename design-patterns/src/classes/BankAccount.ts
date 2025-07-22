export default class BankAccount{
    private balance: number;

    constructor(amt: number){
        this.balance = amt;
    }
    
    public deposit(amt: number): void{
        if(amt > 0){
            this.balance += amt;
        }
    }

    public withdraw(amt: number): void{
        if(amt > 0 && this.balance >=amt){
            this.balance -= amt;
        }
    }

    public getBalance(): number{
        return this.balance;
    }
}