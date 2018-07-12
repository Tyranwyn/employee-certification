import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../core/material/material.module';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeesComponent } from './employees.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [],
  declarations: [
    EmployeesComponent,
    EmployeeComponent,
    EmployeeListComponent
  ]
})
export class EmployeesModule { }
