import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Certificate } from './certificate.model';
import { CertificateService } from './certificate.service';

@Injectable()
export class CertificateFireStoreService implements CertificateService {

  constructor(private db: AngularFirestore, private storage: AngularFireStorage) {
  }

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
          return {id, ...data};
        }))
      );
  }

  addCertificate(name: string, img: File, skills: string[]): string {
    const skillsRef: DocumentReference[] = [];
    skills.forEach(skill => skillsRef.push(this.db.doc('/skills/' + skill).ref));

    const id = this.db.createId();
    this.storage.upload(`certificates/${id}`, img)
      .then(result => result.ref.getDownloadURL()
        .then(url => {
          this.db.doc(`certificates/${id}`)
            .set({name: name, image: url, technologies: skillsRef})
            .then(res => console.log(res))
            .catch(err => console.log(`Something went wrong:\n${err}`));
        })
        .catch(res => console.log(`Something wrong when getting download url:\n${res}`)))
      .catch(result => console.log(`Something wrong while uploading certificate image:\n${result}`));
    return id;
  }
}
