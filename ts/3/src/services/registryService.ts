import { emit } from '../events/decorators';
import { Events } from '../events/events';
import { IUser } from '../types/index';
import { Repository } from './repository';

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
    user.borrowedBookIds.includes(bookId)
      ? user.borrowedBookIds.filter((id) => id !== bookId)
      : user.borrowedBookIds.push(bookId);
  }

  @emit(Events.UsersShouldRender)
  deleteUser(id: string): void {
    this.registry.delete(id);
  }
}
