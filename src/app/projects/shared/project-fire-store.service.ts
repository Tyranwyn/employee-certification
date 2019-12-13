import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/firefirestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmployeeListDto } from '../../employees/shared/employee-list-dto';
import { Skill } from '../../skills/shared/skill.model';
import { Location } from './location.model';
import { ProjectListDto } from './project-list-dto';
import { Project } from './project.model';
import { ProjectService } from './project.service';

@Injectable()
export class ProjectFireStoreService implements ProjectService {

  constructor(private db: AngularFirestore) {
  }

  getProjectById(id: string): Observable<Project> {
    return this.db.doc<Project>('/projects/' + id).valueChanges();
  }

  getActiveProjectList(): Observable<ProjectListDto[]> {
    return this.db.collection<Project>('projects',
        ref => ref.where('active', '==', true))
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Project;
          const id = a.payload.doc.id;
          return this.convertProjectToProjectListDto(id, data);
        }))
      );
  }

  getAllProjects(): Observable<Project[]> {
    return this.db.collection<Project>('projects').valueChanges();
  }

  private convertProjectToProjectListDto(id: string, oldProject: Project): ProjectListDto {
    const newProject: ProjectListDto = {
      id: id,
      name: oldProject.name,
      client: oldProject.client,
      location: oldProject.location,
      collaborators: [],
      responsible: [],
      skillsUsed: []
    };
    if (null != oldProject.collaborators && oldProject.collaborators.length > 0) {
      oldProject.collaborators.forEach(collaborator =>
        collaborator.get()
          .then(res => newProject.collaborators.push(<EmployeeListDto>res.data()))
          .catch(err => console.log(`Something went wrong with getting collaborators: ${err}`))
      );
    }
    if (null != oldProject.responsible && oldProject.responsible.length > 0) {
      oldProject.responsible.forEach(responsible =>
        responsible.get()
          .then(res => newProject.responsible.push(<EmployeeListDto>res.data()))
          .catch(err => console.log(`Something went wrong with getting responsible: ${err}`))
      );
    }
    if (null != oldProject.skillsUsed && oldProject.skillsUsed.length > 0) {
      oldProject.skillsUsed.forEach(skill =>
        skill.get()
          .then(res => newProject.skillsUsed.push(<Skill>res.data()))
          .catch(err => console.log(`Something went wrong with getting used skill: ${err}`))
      );
    }
    return newProject;
  }

  addProject(name: string, client: string, location: Location, responsible: string[],
             collaborators: string[], skills: string[], active: boolean): boolean {
    let success = false;

    const respRef: DocumentReference[] = [];
    const collRef: DocumentReference[] = [];
    const skillsRef: DocumentReference[] = [];
    responsible.forEach(empl => respRef.push(this.db.doc('/employees/' + empl).ref));
    collaborators.forEach(empl => collRef.push(this.db.doc('/employees/' + empl).ref));
    skills.forEach(skill => skillsRef.push(this.db.doc('/skills/' + skill).ref));

    this.db.collection('projects')
      .add(
        {name, client, location, responsible: respRef, collaborators: collRef, skillsUsed: skillsRef, active}
      )
      .then(v => success = true)
      .catch(v => {
        success = false;
        console.log('Something went wrong');
        console.log(v);
      });
    return success;
  }
}
