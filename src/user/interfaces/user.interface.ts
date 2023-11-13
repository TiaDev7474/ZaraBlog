import { Role } from '../../lib/enums/role';

export class IUser {
  id: string;
  firstname?: string;
  lastname?: string;
  role: Role[];
  avatar?: [string];
}
