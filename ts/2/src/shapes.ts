interface IShape {
  getArea(): number;
  getPerimeter(): number;
  scale(factor: number): void;
}

class Circle implements IShape {
  constructor(private radius: number) {}
  getArea() {
    return Math.PI * this.radius * this.radius;
  }
  getPerimeter() {
    return 2 * Math.PI * this.radius;
  }
  scale(factor: number) {
    this.radius *= factor;
  }
}

class Rectangle implements IShape {
  constructor(private length: number, private width: number) {}
  getArea() {
    return this.length * this.width;
  }
  getPerimeter() {
    return 2 * (this.length + this.width);
  }
  scale(factor: number) {
    this.length *= factor;
    this.width *= factor;
  }
}

class Triangle implements IShape {
  constructor(private side: number) {}
  getArea() {
    return (Math.sqrt(3) / 4) * this.side * this.side;
  }
  getPerimeter() {
    return 3 * this.side;
  }
  scale(factor: number) {
    this.side *= factor;
  }
}

const circle = new Circle(5);
console.log(`Circle area: ${circle.getArea()}`);
console.log(`Circle perimeter: ${circle.getPerimeter()}`);

circle.scale(2);
console.log(`New circle area: ${circle.getArea()}`);
console.log(`New circle perimeter: ${circle.getPerimeter()}`);

const rectangle = new Rectangle(4, 6);
console.log(`Rectangle area: ${rectangle.getArea()}`);
console.log(`Rectangle perimeter: ${rectangle.getPerimeter()}`);

rectangle.scale(0.5);
console.log(`New rectangle area: ${rectangle.getArea()}`);
console.log(`New rectangle perimeter: ${rectangle.getPerimeter()}`);

const triangle = new Triangle(8);
console.log(`Triangle area: ${triangle.getArea()}`);
console.log(`Triangle perimeter: ${triangle.getPerimeter()}`);

triangle.scale(3);
console.log(`New triangle area: ${triangle.getArea()}`);
console.log(`New triangle perimeter: ${triangle.getPerimeter()}`);

export {};
