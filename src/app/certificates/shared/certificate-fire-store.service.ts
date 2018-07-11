import { Injectable } from '@angular/core';
import { Certificate } from './certificate.model';
import { CertificateService } from './certificate.service';

@Injectable()
export class CertificateFireStoreService implements CertificateService {

  constructor() { }

  getCertificateById(id: string): Certificate {
    return undefined;
  }

  getCertificates(): Certificate[] {
    return undefined;
  }
}
