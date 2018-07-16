import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SafePipeModule } from 'safe-pipe';
import { MaterialModule } from '../core/material/material.module';
import { ProjectComponent } from './project/project.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectsComponent } from './projects.component';
import { projectsRoutes } from './projects.routes';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forRoot(projectsRoutes),
    SafePipeModule
  ],
  declarations: [
    ProjectsComponent,
    ProjectComponent,
    ProjectListComponent
  ]
})
export class ProjectsModule { }
