import { expect } from 'chai';
import { Repository } from '../src/services/repository.js';

interface TestItem {
  id: string;
  name: string;
}

describe('Repository', () => {
  let repository: Repository<TestItem>;

  beforeEach(() => {
    repository = new Repository<TestItem>();
  });

  it('should add an item', () => {
    const item: TestItem = { id: '1', name: 'Test Item' };
    repository.add(item);
    expect(repository.getAll()).to.deep.include(item);
  });

  it('should get all items', () => {
    const items: TestItem[] = [
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' },
    ];
    items.forEach((item) => repository.add(item));
    expect(repository.getAll()).to.deep.equal(items);
  });

  it('should find items by condition', () => {
    const items: TestItem[] = [
      { id: '1', name: 'Apple' },
      { id: '2', name: 'Banana' },
      { id: '3', name: 'Apple' },
    ];
    items.forEach((item) => repository.add(item));
    const result = repository.findBy((item) => item.name === 'Apple');
    expect(result).to.have.lengthOf(2);
    expect(result).to.deep.include(items[0]);
    expect(result).to.deep.include(items[2]);
  });

  it('should find an item by id', () => {
    const item: TestItem = { id: '1', name: 'Test Item' };
    repository.add(item);
    expect(repository.findById('1')).to.deep.equal(item);
  });

  it('should update an item', () => {
    const item: TestItem = { id: '1', name: 'Original' };
    repository.add(item);
    const updatedItem: TestItem = { id: '1', name: 'Updated' };
    repository.update('1', updatedItem);
    expect(repository.findById('1')).to.deep.equal(updatedItem);
  });

  it('should delete an item', () => {
    const item: TestItem = { id: '1', name: 'Test Item' };
    repository.add(item);
    repository.delete('1');
    expect(repository.findById('1')).to.be.undefined;
  });
});
