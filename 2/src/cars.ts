abstract class Car {
  constructor(
    protected model: string,
    protected price: number,
    protected horsePower: number,
  ) {}
  abstract getInfo(): string;
}

class Toyota extends Car {
  getInfo() {
    return `Toyota ${this.model} has ${this.horsePower}HP and costs $${this.price}`;
  }
}
class Audi extends Car {
  getInfo() {
    return `Audi ${this.model} has ${this.horsePower}HP and costs $${this.price}`;
  }
}
class BMW extends Car {
  getInfo() {
    return `BMW ${this.model} has ${this.horsePower}HP and costs $${this.price}`;
  }
}

const toyotaCamry = new Toyota('Camry', 30000, 200);
const toyotaCorolla = new Toyota('Corolla', 25000, 150);

const audiA6 = new Audi('A6', 50000, 300);
const audiQ7 = new Audi('Q7', 70000, 350);

const bmwX5 = new BMW('X5', 60000, 340);
const bmwM3 = new BMW('M3', 65000, 420);

console.log(toyotaCamry.getInfo());
console.log(toyotaCorolla.getInfo());

console.log(audiA6.getInfo());
console.log(audiQ7.getInfo());

console.log(bmwX5.getInfo());
console.log(bmwM3.getInfo());

export {};
