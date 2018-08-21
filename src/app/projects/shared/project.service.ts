import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from './location.model';
import { ProjectListDto } from './project-list-dto';
import { Project } from './project.model';

@Injectable()
export abstract class ProjectService {
  abstract getActiveProjectList(): Observable<ProjectListDto[]>;

  abstract getAllProjects(): Observable<Project[]>;

  abstract getProjectById(id: string): Observable<Project>;

  abstract addProject(name: string, client: string, location: Location, responsible: string[],
                      collaborators: string[], skills: string[], active: boolean): boolean;
}
