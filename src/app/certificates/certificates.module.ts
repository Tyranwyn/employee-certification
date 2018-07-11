import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CertificateListComponent } from './certificate-list/certificate-list.component';
import { CertificatesComponent } from './certificates.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CertificatesComponent,
    CertificateListComponent
  ]
})
export class CertificatesModule { }
