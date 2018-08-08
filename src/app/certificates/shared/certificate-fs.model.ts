import { DocumentReference } from 'angularfire2/firestore';

export interface CertificateFs {
  name: string;
  image: string;
  technologies?: DocumentReference[];
}
