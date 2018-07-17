import { EmployeeListDto } from '../../employees/shared/employee-list-dto';
import { Skill } from '../../skills/shared/skill.model';
import { Location } from './location.model';

export interface ProjectListDto {
  id: string;
  name: string;
  client: string;
  location: Location;
  collaborators?: EmployeeListDto[];
  responsible?: EmployeeListDto[];
  skillsUsed?: Skill[];
}
