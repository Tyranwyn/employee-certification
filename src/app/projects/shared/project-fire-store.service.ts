import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { EmployeeListDto } from '../../employees/shared/employee-list-dto';
import { Skill } from '../../skills/shared/skill.model';
import { ProjectListDto } from './project-list-dto';
import { Project } from './project.model';
import { ProjectService } from './project.service';

@Injectable()
export class ProjectFireStoreService implements ProjectService {

  constructor(private db: AngularFirestore) {}

  getProjectById(id: string): Observable<Project> {
    return this.db.doc<Project>('/projects/' + id).valueChanges();
  }

  // TODO: Get references properly once eager loading implemented
  getActiveProjects(): ProjectListDto[] {
    // return this.db.collection<EmployeeListDto>('employees', ref => ref.where('employed', '==', true)).valueChanges();
    const projectList: ProjectListDto[] = [];
    this.db.collection<ProjectListDto>('projects')
      .ref
      .where('active', '==', true)
      .get()
      .then(res =>
        res.forEach(doc =>
          projectList.push(this.convertProjectToProjectListDto(doc.id, <Project>doc.data())))
      )
      .catch(err => console.log(err));
    return projectList;
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
}
