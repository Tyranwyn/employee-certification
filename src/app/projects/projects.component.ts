import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { ProjectListDto } from './shared/project-list-dto';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {

  currentProject: ProjectListDto;
  isDrawerOpen = false;

  @ViewChild(MatSidenav, { static: true })
  private sidenav: MatSidenav;

  constructor() { }

  onProjectClicked(currentProject: ProjectListDto) {
    if (this.currentProject !== currentProject) {
      this.currentProject = currentProject;
      if (!this.isDrawerOpen) {
        this.sidenav.toggle(true);
        this.isDrawerOpen = true;
      }
    } else {
      this.sidenav.toggle(false);
      this.isDrawerOpen = false;
      this.currentProject = null;
    }
  }

}
