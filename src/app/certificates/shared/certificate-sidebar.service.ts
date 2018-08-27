import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Certificate } from './certificate.model';

@Injectable({
  providedIn: 'root'
})
export class CertificateSidebarService {

  private currentCertificateSource = new Subject<Certificate>();

  currentCertificate$ = this.currentCertificateSource.asObservable();

  selectCertificate(certificate: Certificate) {
    this.currentCertificateSource.next(certificate);
  }
}
