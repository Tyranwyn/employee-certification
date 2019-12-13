import { DocumentReference } from '@angular/firefirestore';

export interface CertificateFs {
  name: string;
  image: string;
  technologies?: DocumentReference[];
}
