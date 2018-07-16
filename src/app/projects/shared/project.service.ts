import { Injectable } from '@angular/core';
import { ProjectListDto } from './project-list-dto';
import { Project } from './project.model';

@Injectable()
export abstract class ProjectService {
  abstract getActiveProjects(): ProjectListDto[];
  abstract getProjectById(): Project;
}
