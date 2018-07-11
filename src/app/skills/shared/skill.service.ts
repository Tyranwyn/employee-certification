import { Injectable } from '@angular/core';
import { Skill } from './skill.model';

@Injectable()
export abstract class SkillService {
  abstract getSkills(): Skill[];
}
