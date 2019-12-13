import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ImageUploadModule } from 'angular2-image-upload';
import { AngularFireStorage } from '@angular/firestorage';
import { SafePipeModule } from 'safe-pipe';
import { KeysPipe } from '../core/keys.pipe';
import { MaterialModule } from '../core/material/material.module';
import { AddEmployeeModalComponent } from './add-employee-modal/add-employee-modal.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeesComponent } from './employees.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SafePipeModule,
    RouterModule,
    ReactiveFormsModule,
    ImageUploadModule.forRoot()
  ],
  exports: [],
  declarations: [
    EmployeesComponent,
    EmployeeComponent,
    EmployeeListComponent,
    AddEmployeeModalComponent,
    KeysPipe
  ],
  entryComponents: [AddEmployeeModalComponent],
  providers: [AngularFireStorage]
})
export class EmployeesModule { }
