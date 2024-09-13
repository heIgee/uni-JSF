import { IBook, IUser } from '../types/index';

export class AppStorage {
  retrieveBooks(): IBook[] | null {
    const storedBooks = localStorage.getItem('books');
    return storedBooks === null ? null : JSON.parse(storedBooks);
  }

  saveBooks(books: IBook[]): void {
    localStorage.setItem('books', JSON.stringify(books));
  }

  retrieveUsers(): IUser[] | null {
    const storedUsers = localStorage.getItem('users');
    return storedUsers === null ? null : JSON.parse(storedUsers);
  }

  saveUsers(users: IUser[]): void {
    localStorage.setItem('users', JSON.stringify(users));
  }

  clear(): void {
    localStorage.clear();
  }
}
