import { Injectable } from '@angular/core';
import { Project } from './project.model';
import { ProjectService } from './project.service';

@Injectable()
export class ProjectFireStoreService implements ProjectService {

  constructor() { }

  getProjectById(): Project {
    return undefined;
  }

  getProjects(): Project[] {
    return undefined;
  }
}
