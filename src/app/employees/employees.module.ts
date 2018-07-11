import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeesComponent } from './employees.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [],
  declarations: [
    EmployeesComponent,
    EmployeeComponent,
    EmployeeListComponent
  ]
})
export class EmployeesModule { }
