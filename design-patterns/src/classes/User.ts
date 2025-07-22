export default class User {
    public name:string;
    public age: number;
    constructor(name: string, age:number) {
        this.name = name;
        this.age = age;
    }

    public sayHello(): void{
        console.log(`Hello, My Name is : ${this.name} and i am ${this.age} years old.`)
    }
}
