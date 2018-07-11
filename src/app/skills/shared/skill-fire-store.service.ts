import { Injectable } from '@angular/core';
import { Skill } from './skill.model';
import { SkillService } from './skill.service';

@Injectable()
export class SkillFireStoreService implements SkillService {

  constructor() { }

  getSkills(): Skill[] {
    return undefined;
  }
}
