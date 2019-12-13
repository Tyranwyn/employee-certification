import { DocumentReference } from '@angular/fire/firestore';

export interface CertificateFs {
  name: string;
  image: string;
  technologies?: DocumentReference[];
}
