import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Certificate } from './certificate.model';
import { CertificateService } from './certificate.service';

@Injectable()
export class CertificateFireStoreService implements CertificateService {

  constructor(private db: AngularFirestore) {}

  getCertificateById(id: string): Observable<Certificate> {
    return this.db.doc<Certificate>('/certificates/' + id).valueChanges();
  }

  getCertificates(): Observable<Certificate[]> {
    return this.db.collection<Certificate>('certificates')
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Certificate;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
  }
}
