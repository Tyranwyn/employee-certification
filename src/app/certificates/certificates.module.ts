import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ImageUploadModule } from 'angular2-image-upload';
import { SafePipeModule } from 'safe-pipe';
import { MaterialModule } from '../core/material/material.module';
import { AddCertificateModalComponent } from './add-certificate-modal/add-certificate-modal.component';
import { CertificateListComponent } from './certificate-list/certificate-list.component';
import { CertificateComponent } from './certificate/certificate.component';
import { CertificatesComponent } from './certificates.component';
import { certificatesRoutes } from './certificates.routes';
import { SkillsFilterComponent } from './skills-filter/skills-filter.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SafePipeModule,
    RouterModule.forRoot(certificatesRoutes),
    FormsModule,
    ReactiveFormsModule,
    ImageUploadModule.forRoot()
  ],
  declarations: [
    CertificatesComponent,
    CertificateListComponent,
    CertificateComponent,
    SkillsFilterComponent,
    AddCertificateModalComponent
  ],
  entryComponents: [AddCertificateModalComponent]
})
export class CertificatesModule { }
