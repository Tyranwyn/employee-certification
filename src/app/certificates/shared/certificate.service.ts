import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Certificate } from './certificate.model';

@Injectable()
export abstract class CertificateService {
  abstract getCertificates(): Observable<Certificate[]>;
  abstract getCertificateById(id: string): Observable<Certificate>;
  abstract addCertificate(name: string, img: string, skills: string[]): boolean;
}
