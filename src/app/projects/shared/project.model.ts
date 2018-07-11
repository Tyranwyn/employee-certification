import { Employee } from '../../employees/shared/employee.model';
import { Skill } from '../../skills/shared/skill.model';

export interface Project {
  id: string;
  name: string;
  client: string;
  location: string;
  collaborators: Employee[];
  responsible: Employee[];
  skillsUsed: Skill[];
}
