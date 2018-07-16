import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Employee } from '../../employees/shared/employee.model';
import { ProjectListDto } from '../shared/project-list-dto';
import { Project } from '../shared/project.model';
import { ProjectService } from '../shared/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  dataSource: MatTableDataSource<ProjectListDto> = new MatTableDataSource<ProjectListDto>();
  displayedColumns = ['name', 'client', 'location', 'skillsUsed'];
  currentProject: Project;
  currentProjectResponsible: Employee[] = [];
  currentProjectCollaborators: Employee[] = [];

  constructor(private projectService: ProjectService, private router: Router) {
    this.dataSource.data = projectService.getActiveProjects();
  }

  ngOnInit() {
    this.dataSource.filterPredicate = (data: ProjectListDto, filter: string) => {
      let dataString = data.id + data.name + data.client + data.location;
      data.skillsUsed.forEach(skill => dataString = dataString + skill.name);
      data.collaborators.forEach(collaborator => dataString = dataString + collaborator.firstName + collaborator.lastName);
      dataString = dataString.toLowerCase();
      return dataString.indexOf(filter) !== -1;
    };
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  clickedOnProject(id: any) {
    this.currentProjectResponsible = [];
    this.currentProjectCollaborators = [];

    this.projectService.getProjectById(id).subscribe(project => {
      this.currentProject = project;
      project.collaborators
        .filter(coll => project.responsible.find(item => item.id === coll.id) === null)
        .forEach(coll => {
          coll.get()
            .then(e => this.currentProjectCollaborators.push(e.data() as Employee))
            .catch(err => console.log(err));
        });
      project.responsible
        .filter(resp => project.responsible.find(item => item.id === resp.id) !== null)
        .forEach(employee => {
          employee.get()
            .then(e => this.currentProjectResponsible.push(e.data() as Employee))
            .catch(err => console.log(err));
        });
    });
  }
}
