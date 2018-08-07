import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Skill } from './skill.model';
import { SkillService } from './skill.service';

@Injectable()
export class SkillFireStoreService implements SkillService {

  constructor(private db: AngularFirestore) { }

  getSkills(): Observable<Skill[]> {
    return this.db.collection<Skill>('skills')
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as Skill;
            const id = a.payload.doc.id;
            return {id, ...data};
          });
        })
      );
  }

  addSkill(name: string): boolean {
    let success = false;
    this.db.doc('skills').set({ name: name })
      .then(v => success = true)
      .catch(v => {
        success = false;
        console.log(v);
      });
    return success;
  }
}
