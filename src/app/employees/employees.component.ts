import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { EmployeeListDto } from './shared/employee-list-dto';
import { EmployeeService } from './shared/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class EmployeesComponent implements OnInit {

  dataSource: EmployeeListDto[];
  expandedElement: EmployeeListDto;
  displayedColumns = ['firstName', 'lastName', 'unit', 'skills', 'certificates', 'projects'];

  constructor(public employeeService: EmployeeService) {
    this.dataSource = employeeService.getEmployedEmployees();
  }

  ngOnInit() {
  }

}
