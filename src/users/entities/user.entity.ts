import { Role } from '../../lib/enums/role';

export class UserEntity {
  id: string;
  firstname?: string;
  lastname?: string;
  role: Role;
  avatar?: [string];
}
