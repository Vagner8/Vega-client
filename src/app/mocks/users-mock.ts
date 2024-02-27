import { User } from '../types/user.types';

export const UsersMock: User[] = [];

for (let index = 1; index <= 40; index++) {
  UsersMock.push({
    userId: index,
    login: `login-${index}`,
    firstName: `firstName-${index}`,
    lastName: `lastName-${index}`,
    email: 'vagner@gmail.com',
    phone: '+420776544634',
    updated: '2024-01-11T01:23:10.2688472',
    created: '2024-01-11T01:23:10.2688472',
  });
}