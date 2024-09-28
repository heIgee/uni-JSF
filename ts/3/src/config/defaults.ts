import { IBook, IUser } from '../types/index';

export const defaultBooks: IBook[] = [
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

export const defaultUsers: IUser[] = [
  {
    id: crypto.randomUUID(),
    name: 'helgee',
    email: 'smbd@smwh.com',
    birthYear: 1857,
    borrowedBookIds: [],
  },
];
