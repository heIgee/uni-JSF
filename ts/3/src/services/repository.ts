import { IEntity } from '../types/index';

export class Repository<T extends IEntity> {
  private items: T[];

  constructor(items: T[] = []) {
    this.items = items;
  }

  add(item: T): void {
    this.items.push(item);
  }

  getAll(): T[] {
    return [...this.items];
  }

  findBy(cb: (item: T) => boolean): T[] {
    return this.items.filter(cb);
  }

  findById(id: string): T | undefined {
    return this.items.find((item) => item.id === id);
  }

  update(id: string, updatedItem: T): void {
    const index = this.items.findIndex((item: T) => item.id === id);
    if (index !== -1) {
      this.items[index] = updatedItem;
    }
  }

  delete(id: string): void {
    this.items = this.items.filter((item: T) => item.id !== id);
  }
}
