interface IPayable {
  pay(): void;
}

abstract class Employee implements IPayable {
  constructor(public name: string, public age: number, public salary: number) {}
  abstract getAnnualBonus(): number;
  abstract pay(): void;
}

class Developer extends Employee {
  getAnnualBonus() {
    return this.salary * 0.1;
  }
  pay(): void {
    console.log(`Developer ${this.name} has been paid.`);
  }
}

class Manager extends Employee {
  getAnnualBonus() {
    return this.salary * 0.2;
  }
  pay(): void {
    console.log(`Manager ${this.name} has been paid.`);
  }
}

const employees: Employee[] = [
  new Developer('Jordan', 34, 86000),
  new Manager('Michael', 34, 72000),
];
employees.forEach((emp) => {
  console.log(`${emp.name} annual bonus is $${emp.getAnnualBonus()}`);
  emp.pay();
});

const totalPayout = employees.reduce(
  (acc, cur) => acc + cur.getAnnualBonus(),
  0,
);
console.log(`Total payout is $${totalPayout}`);

export {};
