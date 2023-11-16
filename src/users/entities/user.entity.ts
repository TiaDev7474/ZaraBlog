import { Role } from '../../lib/enums/role';

export class User {
  id: string;
  firstname?: string;
  lastname?: string;
  role: Role[];
  avatar?: [string];
}
