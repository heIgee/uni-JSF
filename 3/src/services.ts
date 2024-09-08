import { emit } from './emit';
import { Events } from './events';
import { IBook, IUser } from './models';
import { Repository } from './repository';

export class LibraryService {
  private library: Repository<IBook>;

  constructor(library: Repository<IBook> = new Repository<IBook>()) {
    this.library = library;
  }

  @emit(Events.BooksShouldRender)
  addBook(book: IBook): void {
    this.library.add(book);
  }

  getAllBooks(): IBook[] {
    return this.library.getAll();
  }

  findBookById(id: string): IBook | undefined {
    return this.library.findById(id);
  }

  @emit(Events.BooksShouldRender)
  updateBook(id: string, updatedBook: IBook): void {
    this.library.update(id, updatedBook);
  }

  @emit(Events.BooksShouldRender)
  toggleBook(id: string): void {
    const book = this.findBookById(id);
    if (book) book.isBorrowed = !book.isBorrowed;
  }

  @emit(Events.BooksShouldRender)
  deleteBook(id: string): void {
    this.library.delete(id);
  }
}

export class RegistryService {
  private registry: Repository<IUser>;

  constructor(registry: Repository<IUser> = new Repository<IUser>()) {
    this.registry = registry;
  }

  @emit(Events.UsersShouldRender)
  addUser(book: IUser): void {
    this.registry.add(book);
  }

  getAllUsers(): IUser[] {
    return this.registry.getAll();
  }

  findUserById(id: string): IUser | undefined {
    return this.registry.findById(id);
  }

  @emit(Events.UsersShouldRender)
  updateUser(id: string, updatedUser: IUser): void {
    this.registry.update(id, updatedUser);
  }

  @emit(Events.UsersShouldRender)
  toggleBorrowBook(userId: string, bookId: string): void {
    const user = this.findUserById(userId);
    if (!user) return;
    user.borrowedBookIds.has(bookId)
      ? user.borrowedBookIds.delete(bookId)
      : user.borrowedBookIds.add(bookId);
  }

  @emit(Events.UsersShouldRender)
  deleteUser(id: string): void {
    this.registry.delete(id);
  }
}
