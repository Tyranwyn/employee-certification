import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { ProjectListDto } from '../shared/project-list-dto';
import { ProjectService } from '../shared/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  dataSource: MatTableDataSource<ProjectListDto> = new MatTableDataSource<ProjectListDto>();
  displayedColumns = ['name', 'client', 'location', 'skillsUsed'];

  @Output()
  currentProjectChange = new EventEmitter();

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

  openDrawer(row) {
    this.currentProjectChange.emit(row);
  }
}
