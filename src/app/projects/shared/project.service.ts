import { Injectable } from '@angular/core';
import { Project } from './project.model';

@Injectable()
export abstract class ProjectService {
  abstract getProjects(): Project[];
  abstract getProjectById(): Project;
}
