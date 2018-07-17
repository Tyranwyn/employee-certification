import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeListDto } from '../../employees/shared/employee-list-dto';
import { ProjectListDto } from '../shared/project-list-dto';
import { Project } from '../shared/project.model';
import { ProjectService } from '../shared/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnChanges {

  @Input()
  currentProject: ProjectListDto;
  currentProjectResponsible: EmployeeListDto[] = [];
  currentProjectCollaborators: EmployeeListDto[] = [];

  constructor(route: ActivatedRoute, private projectService: ProjectService) {
    // If project accessed via url, convert to ProjectListDto
    if (route.snapshot.params.id) {
      projectService.getProjectById(route.snapshot.params.id).subscribe(project => {
        this.currentProject = {
          id: project.id,
          name: project.name,
          client: project.client,
          location: project.location
        };
        this.getAssociatedEmployeesFromProject(project);
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.currentProject) {
      this.compareRespAndCollab();
    }
  }

  // Accessed via url
  getAssociatedEmployeesFromProject(project: Project) {
    this.currentProjectResponsible = [];
    this.currentProjectCollaborators = [];

    project.collaborators
      .filter(coll => project.responsible.find(item => item.id === coll.id) === null)
      .forEach(coll => {
        coll.get()
          .then(e => this.currentProjectCollaborators.push(e.data() as EmployeeListDto))
          .catch(err => console.log(err));
      });
    project.responsible
      .filter(resp => project.responsible.find(item => item.id === resp.id) !== null)
      .forEach(employee => {
        employee.get()
          .then(e => this.currentProjectResponsible.push(e.data() as EmployeeListDto))
          .catch(err => console.log(err));
      });
  }

  // Accessed via project list
  compareRespAndCollab() {
    this.currentProjectCollaborators = this.currentProject.collaborators
      .filter(coll => this.currentProject.responsible.find(item => item.id === coll.id) === null)
      .map(value => value);
    this.currentProjectResponsible = this.currentProject.responsible
      .filter(resp => this.currentProject.responsible.find(item => item.id === resp.id) !== null)
      .map(value => value);
  }
}
