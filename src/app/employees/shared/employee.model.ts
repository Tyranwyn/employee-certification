import { Role } from '../../shared/role.enum';
import { Unit } from '../../shared/unit.enum';

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  unit: Unit;
  role: Role;
  profilePicture: string;
  email: string;
  password: string;
  employed: boolean;
  skills: any[];
  certificate: any[];
  projects: any[];
  questions: any[];
}
