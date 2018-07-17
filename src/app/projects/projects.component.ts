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

  @ViewChild(MatSidenav)
  private sidenav: MatSidenav;

  constructor() { }

  onProjectClicked(currentProject: ProjectListDto) {
    this.currentProject = currentProject;
    this.sidenav.toggle();
  }

}
