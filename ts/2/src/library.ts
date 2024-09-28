interface ILibraryItem {
  name: string;
  author: string;
  borrow(): void;
}

class Book implements ILibraryItem {
  constructor(
    public name: string,
    public author: string,
    public pages: number,
  ) {}
  borrow(): void {
    console.log(
      `Book "${this.name}" (${this.pages} pp) by ${this.author} has been borrowed`,
    );
  }
}

class Magazine implements ILibraryItem {
  constructor(
    public name: string,
    public author: string,
    public series: number,
  ) {}
  borrow(): void {
    console.log(
      `Magazine "${this.name}" (issue series ${this.series}) by ${this.author} has been borrowed`,
    );
  }
}

class DVD implements ILibraryItem {
  constructor(
    public name: string,
    public author: string,
    public duration: number,
  ) {}
  borrow(): void {
    console.log(
      `DVD "${this.name}" (${this.duration} min) by ${this.author} has been borrowed`,
    );
  }
}

interface ILibrary {
  addItem(item: ILibraryItem): void;
  findItem(itemName: string): ILibraryItem | undefined;
  showAll(): void;
}

class Library implements ILibrary {
  constructor(private _items: ILibraryItem[] = []) {}
  addItem(item: ILibraryItem): void {
    this._items.push(item);
  }
  findItem(itemName: string) {
    return this._items.find((i) => i.name === itemName);
  }
  showAll() {
    this._items.forEach((item) => {
      console.log(`${item.constructor.name} "${item.name}" by ${item.author}`);
    });
  }
}

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 310);
const nationalGeographic = new Magazine(
  'National Geographic',
  'Various Authors',
  145,
);
const inceptionDVD = new DVD('Inception', 'Christopher Nolan', 148);

const myLibrary = new Library();

myLibrary.addItem(theHobbit);
myLibrary.addItem(nationalGeographic);
myLibrary.addItem(inceptionDVD);

console.log('Library Inventory:');
myLibrary.showAll();
console.log('-'.repeat(20));

const bookToBorrow = myLibrary.findItem('The Hobbit');
bookToBorrow && bookToBorrow.borrow();

const dvdToBorrow = myLibrary.findItem('Inception');
dvdToBorrow && dvdToBorrow.borrow();

const magazineToBorrow = myLibrary.findItem('National Geographic');
magazineToBorrow && magazineToBorrow.borrow();

export {};
