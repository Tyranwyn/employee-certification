import { EmployeeListDto } from '../../employees/shared/employee-list-dto';
import { Skill } from '../../skills/shared/skill.model';

export interface ProjectListDto {
  id: string;
  name: string;
  client: string;
  location: string;
  collaborators: EmployeeListDto[];
  responsible: EmployeeListDto[];
  skillsUsed: Skill[];
}
