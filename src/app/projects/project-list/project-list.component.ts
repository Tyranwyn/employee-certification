import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ProjectListDto } from '../shared/project-list-dto';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  dataSource: MatTableDataSource<ProjectListDto> = new MatTableDataSource<ProjectListDto>();
  displayedColumns = ['name', 'client', 'location', 'skills', 'skillsUsed'];

  constructor() {
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

}
