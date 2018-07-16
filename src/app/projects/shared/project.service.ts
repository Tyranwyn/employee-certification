import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectListDto } from './project-list-dto';
import { Project } from './project.model';

@Injectable()
export abstract class ProjectService {
  abstract getActiveProjects(): ProjectListDto[];
  abstract getProjectById(id: string): Observable<Project>;
}
