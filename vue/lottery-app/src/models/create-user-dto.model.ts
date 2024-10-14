import type { User } from './user.model';

export type CreateUserDto = Omit<User, 'id'>;
