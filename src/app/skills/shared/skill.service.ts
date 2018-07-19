import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Skill } from './skill.model';

@Injectable()
export abstract class SkillService {
  abstract getSkills(): Observable<Skill[]>;
}
