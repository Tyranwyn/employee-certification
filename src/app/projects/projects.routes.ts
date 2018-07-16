import { Routes } from '@angular/router';
import { ProjectComponent } from './project/project.component';

export const projectsRoutes: Routes = [
  {path: 'projects/:id', component: ProjectComponent}
];
