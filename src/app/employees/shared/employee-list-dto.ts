import { Certificate } from '../../certificates/shared/certificate.model';
import { Project } from '../../projects/shared/project.model';
import { Role } from '../../shared/role.enum';
import { Unit } from '../../shared/unit.enum';
import { Skill } from '../../skills/shared/skill.model';

export interface EmployeeListDto {
  id: string;
  firstName: string;
  lastName: string;
  unit?: Unit;
  role?: Role;
  profilePicture: string;
  email: string;
  skills?: Skill[];
  certificates?: Certificate[];
  projects?: Project[];
}
