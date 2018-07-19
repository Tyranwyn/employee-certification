import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SafePipeModule } from 'safe-pipe';
import { MaterialModule } from '../core/material/material.module';
import { CertificateListComponent } from './certificate-list/certificate-list.component';
import { CertificateComponent } from './certificate/certificate.component';
import { CertificatesComponent } from './certificates.component';
import { certificatesRoutes } from './certificates.routes';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SafePipeModule,
    RouterModule.forRoot(certificatesRoutes),
  ],
  declarations: [
    CertificatesComponent,
    CertificateListComponent,
    CertificateComponent
  ]
})
export class CertificatesModule { }
