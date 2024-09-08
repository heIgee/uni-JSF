export interface IEntity {
  id: string;
}

export interface IBook extends IEntity {
  name: string;
  author: string;
  releaseYear: number;
  isBorrowed: boolean;
}

export interface IUser extends IEntity {
  name: string;
  email: string;
  birthYear: number;
  borrowedBookIds: Set<string>;
}
