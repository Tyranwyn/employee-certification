import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SafePipeModule } from 'safe-pipe';
import { MaterialModule } from '../core/material/material.module';
import { ProjectComponent } from './project/project.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectsComponent } from './projects.component';
import { projectsRoutes } from './projects.routes';
import { AgmCoreModule } from '@agm/core';
import { AddProjectModalComponent } from './add-project-modal/add-project-modal.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forRoot(projectsRoutes),
    SafePipeModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBG1dl7t8N3IB2oZa-WwBogzb14m6aQ7Uc',
      libraries: ['places']
    })
  ],
  declarations: [
    ProjectsComponent,
    ProjectComponent,
    ProjectListComponent,
    AddProjectModalComponent
  ],
  entryComponents: [AddProjectModalComponent]
})
export class ProjectsModule { }
