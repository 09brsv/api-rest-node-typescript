import * as create from './Create';
import * as getEmail from './GetByEmail';

export const UsersProvider = {
  ...create,
  ...getEmail
}