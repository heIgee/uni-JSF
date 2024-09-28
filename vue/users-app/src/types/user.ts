export type User = {
  id: string;
  firstName: string;
  lastName: string;
  gender: 'male' | 'female';
  age: number;
  hobbies: string[];
  position?: string;
  photo?: string;
};
