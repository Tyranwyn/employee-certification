import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../shared/project.model';
import { ProjectService } from '../shared/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  currentProject: Project;

  constructor(route: ActivatedRoute, projectService: ProjectService) {
    projectService.getProjectById(route.snapshot.params.id).subscribe(project => this.currentProject = project);
  }

  ngOnInit() {
  }

}
