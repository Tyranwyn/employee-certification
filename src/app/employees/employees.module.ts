import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeComponent } from './employee/employee.component';

@NgModule({
  imports: [
    CommonModule,
    EmployeeComponent,
    EmployeeListComponent
  ],
  exports: [
    EmployeeComponent,
    EmployeeListComponent
  ],
  declarations: []
})
export class EmployeesModule { }
