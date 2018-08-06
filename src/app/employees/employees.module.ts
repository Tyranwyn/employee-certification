import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SafePipeModule } from 'safe-pipe';
import { MaterialModule } from '../core/material/material.module';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeesComponent } from './employees.component';
import { AddEmployeeModalComponent } from './add-employee-modal/add-employee-modal.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SafePipeModule,
    RouterModule
  ],
  exports: [],
  declarations: [
    EmployeesComponent,
    EmployeeComponent,
    EmployeeListComponent,
    AddEmployeeModalComponent
  ],
  entryComponents: [AddEmployeeModalComponent]
})
export class EmployeesModule { }
