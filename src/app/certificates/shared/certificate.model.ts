import { Skill } from '../../skills/shared/skill.model';

export interface Certificate {
  id: string;
  name: string;
  technology: Skill[];
}
