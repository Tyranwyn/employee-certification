import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';
import { EmployeeListDto } from '../shared/employee-list-dto';
import { Employee } from '../shared/employee.model';
import { EmployeeService } from '../shared/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class EmployeeListComponent implements OnInit {

  // dataSource: MatTableDataSource<EmployeeListDto> = new MatTableDataSource<EmployeeListDto>();
  observableDataSource: Observable<EmployeeListDto[]>;
  expandedElement: Employee;
  displayedColumns = ['firstName', 'lastName', 'unit', 'skills', 'certificates', 'projects'];

  constructor(employeeService: EmployeeService) {
    // this.dataSource.data = employeeService.getEmployedEmployees();
    this.observableDataSource = employeeService.getEmployedEmployeeList();
  }
  ngOnInit() {
    /*this.dataSource.filterPredicate = (data: EmployeeListDto, filter: string) => {
      let dataString = data.id + data.firstName + data.lastName + data.role + data.unit;
      data.skills.forEach(skill => dataString = dataString + skill.name);
      data.certificates.forEach(cert => dataString = dataString + cert.name);
      data.projects.forEach(project => dataString = dataString + project.name + project.client + project.location);
      dataString = dataString.toLowerCase();
      return dataString.indexOf(filter) !== -1;
    };*/
  }

  applyFilter(filterValue: string) {
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
