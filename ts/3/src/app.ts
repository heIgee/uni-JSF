import { defaultBooks, defaultUsers } from './config/defaults';
import { globalEmitter } from './events/globalEmitter';
import { Events } from './events/events';
import { LibraryService } from './services/libraryService';
import { RegistryService } from './services/registryService';
import { Repository } from './services/repository';
import { IBook, IUser } from './types/index';
import { Modal } from './ui/modal';
import { AppStorage } from './utils/storage';
import { Validator } from './utils/validator';

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
      new Repository<IUser>(this.storage.retrieveUsers() ?? defaultUsers),
    );
    this.setupFormListeners();
    this.setupEvents();
  }

  private setupFormListeners(): void {
    this.addBookForm.addEventListener('submit', (ev) => {
      ev.preventDefault();
      this.handleFormSubmission(ev.target as HTMLFormElement, 'book');
    });
    this.addUserForm.addEventListener('submit', (ev) => {
      ev.preventDefault();
      this.handleFormSubmission(ev.target as HTMLFormElement, 'user');
    });
  }

  private setupEvents(): void {
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
    form: HTMLFormElement,
    formType: 'book' | 'user',
  ): void {
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
    } else {
      const formData = new FormData(form);
      switch (formType) {
        case 'book':
          if (this.validator.validateBook(formData)) {
            const book: IBook = {
              id: crypto.randomUUID(),
              name: formData.get('name') as string,
              author: formData.get('author') as string,
              releaseYear: parseInt(formData.get('year') as string, 10),
              isBorrowed: false,
            };
            this.libraryService.addBook(book);
          }
          break;
        case 'user':
          if (this.validator.validateUser(formData)) {
            const user: IUser = {
              id: crypto.randomUUID(),
              name: formData.get('name') as string,
              email: formData.get('email') as string,
              birthYear: parseInt(formData.get('year') as string, 10),
              borrowedBookIds: [],
            };
            this.registryService.addUser(user);
          }
          break;
      }
      form.reset();
      form.classList.remove('was-validated');
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
        if (book.isBorrowed) {
          this.handleReturnBook(book);
        } else {
          this.showBorrowModal(book);
        }
      };

      buttonContainer.append(toggleButton);

      const deleteButton = document.createElement('button');
      deleteButton.className = 'btn btn-outline-danger py-1';
      deleteButton.textContent = '❌';
      deleteButton.onclick = () => {
        this.libraryService.deleteBook(book.id);
        const user = this.registryService
          .getAllUsers()
          .find((user) => user.borrowedBookIds.includes(book.id));
        user &&
          this.registryService.updateUser(user.id, {
            ...user,
            borrowedBookIds: user.borrowedBookIds.filter(
              (id) => id !== book.id,
            ),
          });
        console.log(this.registryService.getAllUsers());
      };
      buttonContainer.append(deleteButton);

      container.append(buttonContainer);
      this.bookList.append(container);
    });
  }

  renderUsers(users: IUser[]): void {
    this.userList.innerHTML = '';
    users.forEach((user) => {
      const container = document.createElement('div');
      container.className =
        'mt-2 pb-2 border-bottom d-flex justify-content-between align-items-center';

      const text = document.createElement('p');
      text.className = 'my-1 me-2';
      text.textContent = `${user.name} ${user.email} (born ${user.birthYear}) [${user.id}]`;
      container.append(text);

      const deleteButton = document.createElement('button');
      deleteButton.className = 'btn btn-outline-danger py-1';
      deleteButton.textContent = '❌';
      deleteButton.onclick = () => this.registryService.deleteUser(user.id);
      container.append(deleteButton);

      this.userList.append(container);
    });
  }

  private showBorrowModal(book: IBook): void {
    const modal = Modal.showBorrowModal(book, (userId) => {
      if (!userId) {
        Modal.showErrorModal('Invalid Input', 'Please enter a valid User ID.');
        return;
      }

      const user = this.registryService.findUserById(userId);
      if (!user) {
        Modal.showErrorModal(
          'User Not Found',
          `No user found with ID ${userId}.`,
        );
      } else if (user.borrowedBookIds.length >= 3) {
        Modal.showErrorModal(
          'Borrow Limit Reached',
          'This user has already borrowed 3 books, which is the maximum allowed.',
        );
      } else {
        this.libraryService.toggleBook(book.id);
        this.registryService.toggleBorrowBook(user.id, book.id);
        modal.hide();
        Modal.showSuccessModal(
          'Book Borrowed',
          `"${book.name}" has been successfully borrowed by ${user.name}.`,
        );
      }
    });

    modal.show();
  }

  private handleReturnBook(book: IBook): void {
    const user = this.registryService
      .getAllUsers()
      .find((user) => user.borrowedBookIds.includes(book.id));
    if (user) {
      this.registryService.toggleBorrowBook(user.id, book.id);
    }
    this.libraryService.toggleBook(book.id);
    Modal.showSuccessModal(
      'Book Returned',
      `"${book.name}" has been successfully returned.`,
    );
  }
}

new App();
