import { Routes } from '@angular/router';
import { CertificateComponent } from './certificate/certificate.component';

export const certificatesRoutes: Routes = [
  {path: 'certificates/:id', component: CertificateComponent}
];
