import { Injectable } from '@angular/core';
import { Certificate } from './certificate.model';

@Injectable()
export abstract class CertificateService {
  abstract getCertificates(): Certificate[];
  abstract getCertificateById(id: string): Certificate;
}
