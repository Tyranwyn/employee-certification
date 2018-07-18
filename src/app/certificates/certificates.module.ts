import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafePipeModule } from 'safe-pipe';
import { MaterialModule } from '../core/material/material.module';
import { CertificateListComponent } from './certificate-list/certificate-list.component';
import { CertificatesComponent } from './certificates.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SafePipeModule
  ],
  declarations: [
    CertificatesComponent,
    CertificateListComponent
  ]
})
export class CertificatesModule { }
