import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../core/material/material.module';
import { ProjectComponent } from './project/project.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectsComponent } from './projects.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    ProjectsComponent,
    ProjectComponent,
    ProjectListComponent
  ]
})
export class ProjectsModule { }
