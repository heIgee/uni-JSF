import { emit } from '../events/decorators';
import { Events } from '../events/events';
import { Repository } from './repository';
import { IBook } from '../types/index';

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
