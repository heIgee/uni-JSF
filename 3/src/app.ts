import { Events } from './events';
import globalEmitter from './globalEmitter';
import { IBook, IUser } from './models';
import { Repository } from './repository';
import { LibraryService, RegistryService } from './services';
import { AppStorage } from './storage';
import { Validator } from './validator';

const defaultBooks: IBook[] = [
  {
    id: crypto.randomUUID(),
    name: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    releaseYear: 1951,
    isBorrowed: false,
  },
  {
    id: crypto.randomUUID(),
    name: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    releaseYear: 1960,
    isBorrowed: false,
  },
  {
    id: crypto.randomUUID(),
    name: '1984',
    author: 'George Orwell',
    releaseYear: 1949,
    isBorrowed: true,
  },
];

class App {
  readonly libraryService: LibraryService;
  readonly registryService: RegistryService;
  readonly validator = new Validator();
  readonly storage = new AppStorage();

  readonly addBookForm: HTMLFormElement =
    document.querySelector('#addBookForm')!;
  readonly addUserForm: HTMLFormElement =
    document.querySelector('#addUserForm')!;

  readonly bookList: HTMLFormElement = document.querySelector('#bookList')!;
  readonly userList: HTMLFormElement = document.querySelector('#userList')!;

  constructor() {
    this.libraryService = new LibraryService(
      new Repository<IBook>(this.storage.retrieveBooks() ?? defaultBooks),
    );
    this.registryService = new RegistryService(
      new Repository<IUser>(this.storage.retrieveUsers() ?? []),
    );
    this.setupFormListeners();
    this.setupEvents();
  }

  private setupFormListeners(): void {
    this.addBookForm.addEventListener('submit', (ev) => {
      ev.preventDefault();
      this.handleFormSubmission(ev.target, 'book');
    });
    this.addUserForm.addEventListener('submit', (ev) => {
      ev.preventDefault();
      this.handleFormSubmission(ev.target, 'user');
    });
  }

  private setupEvents(): void {
    // this.renderBooks = this.renderBooks.bind(this); // or an arrow callback
    globalEmitter.on(Events.BooksShouldRender, () =>
      this.renderBooks(this.libraryService.getAllBooks()),
    );
    globalEmitter.on(Events.UsersShouldRender, () =>
      this.renderUsers(this.registryService.getAllUsers()),
    );
    globalEmitter.on(Events.BooksShouldRender, () =>
      this.storage.saveBooks(this.libraryService.getAllBooks()),
    );
    globalEmitter.on(Events.UsersShouldRender, () =>
      this.storage.saveUsers(this.registryService.getAllUsers()),
    );
    globalEmitter.emit(Events.BooksShouldRender);
    globalEmitter.emit(Events.UsersShouldRender);
  }

  private handleFormSubmission(
    form: EventTarget | null,
    formType: 'book' | 'user',
  ): void {
    if (!(form instanceof HTMLFormElement)) return;
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
    } else {
      const formData = new FormData(form);
      switch (formType) {
        case 'book':
          if (this.validator.validateBook(formData)) {
            const name = formData.get('name') as string;
            const author = formData.get('author') as string;
            const releaseYearStr = formData.get('year') as string;
            const releaseYear = parseInt(releaseYearStr, 10);

            const book: IBook = {
              id: crypto.randomUUID(),
              name,
              author,
              releaseYear,
              isBorrowed: false,
            };
            this.libraryService.addBook(book);
          }
          break;
        case 'user':
          if (this.validator.validateUser(formData)) {
            const name = formData.get('name') as string;
            const email = formData.get('email') as string;
            const birthYearStr = formData.get('year') as string;
            const birthYear = parseInt(birthYearStr, 10);

            const user: IUser = {
              id: crypto.randomUUID(),
              name,
              email,
              birthYear,
              borrowedBookIds: new Set<string>(),
            };
            this.registryService.addUser(user);
          }
          break;
      }
    }
  }

  renderBooks(books: IBook[]): void {
    this.bookList.innerHTML = '';
    books.forEach((book) => {
      const container = document.createElement('div');
      container.className =
        'mt-2 pb-2 border-bottom d-flex justify-content-between align-items-center';

      const text = document.createElement('p');
      text.className = 'my-1 me-2';
      text.textContent = `${book.name} by ${book.author} (${book.releaseYear})`;
      container.append(text);

      const buttonContainer = document.createElement('div');
      buttonContainer.style.minWidth = 'fit-content';
      const toggleButton = document.createElement('button');
      toggleButton.className = 'btn py-1 me-2';
      toggleButton.classList.add(book.isBorrowed ? 'btn-warning' : 'btn-info');
      toggleButton.textContent = book.isBorrowed ? 'Return' : 'Borrow';
      toggleButton.onclick = () => {
        this.libraryService.toggleBook(book.id);
      };
      buttonContainer.append(toggleButton);

      const deleteButton = document.createElement('button');
      deleteButton.className = 'btn btn-outline-danger py-1';
      deleteButton.textContent = '❌';
      deleteButton.onclick = () => this.libraryService.deleteBook(book.id);
      buttonContainer.append(deleteButton);

      container.append(buttonContainer);
      this.bookList.append(container);
    });
  }

  renderUsers(users: IUser[]): void {
    console.log('RENDER', this.registryService.getAllUsers());

    this.userList.innerHTML = '';
    users.forEach((user) => {
      const container = document.createElement('div');
      container.className =
        'mt-2 pb-2 border-bottom d-flex justify-content-between align-items-center';

      const text = document.createElement('p');
      text.className = 'my-1 me-2';
      text.textContent = `${user.name} ${user.email} (born ${user.birthYear})`;
      container.append(text);

      const deleteButton = document.createElement('button');
      deleteButton.className = 'btn btn-outline-danger py-1';
      deleteButton.textContent = '❌';
      deleteButton.onclick = () => this.registryService.deleteUser(user.id);
      container.append(deleteButton);

      this.userList.append(container);
    });
  }
}

new App();
