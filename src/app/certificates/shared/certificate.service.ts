import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Certificate } from './certificate.model';

@Injectable()
export abstract class CertificateService {
  abstract getCertificates(): Observable<Certificate[]>;
  abstract getCertificateById(id: string): Observable<Certificate>;
  abstract addCertificate(name: string, img: File, technologies: string[]): string;
  abstract editCertificate(id: string, name: string, img: File,
                           currentImgUrl: string, technologies: string[]): boolean;
  abstract deleteCertificate(id: string, imageUrl: string): boolean;
  abstract deleteCertificateImage(url: string);
}
