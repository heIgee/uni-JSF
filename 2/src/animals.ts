interface IAnimal {
  name: string;
  move: () => void;
  voice: () => void;
}

class Cat implements IAnimal {
  constructor(public name: string) {}
  move() {
    console.log(`${this.name} is running`);
  }
  voice() {
    console.log(`${this.name} says meow`);
  }
}

class Bird implements IAnimal {
  constructor(public name: string) {}
  move() {
    console.log(`${this.name} is flying`);
  }
  voice() {
    console.log(`${this.name} says tweet`);
  }
}

class Fish implements IAnimal {
  constructor(public name: string) {}
  move() {
    console.log(`${this.name} is swimming`);
  }
  voice() {
    console.log(`${this.name} says plop`);
  }
}

const george = new Cat('George');
const thomas = new Bird('Thomas');
const austin = new Fish('Austin');

george.move();
george.voice();

thomas.move();
thomas.voice();

austin.move();
austin.voice();

export {};
