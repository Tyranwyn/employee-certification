import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { AngularFirestore, DocumentReference } from '@angular/firefirestore';
import { AngularFireStorage } from '@angular/firestorage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Certificate } from './certificate.model';
import { CertificateService } from './certificate.service';

@Injectable()
export class CertificateFireStoreService implements CertificateService {

  constructor(private db: AngularFirestore, private storage: AngularFireStorage) {
  }

  getCertificateById(id: string): Observable<Certificate> {
    return this.db.doc<Certificate>('/certificates/' + id)
      .snapshotChanges()
      .pipe(
        map(snapshot => this.createCompleteCertificate(snapshot.payload.id, snapshot.payload.data()))
      );
  }

  getCertificates(): Observable<Certificate[]> {
    return this.db.collection<Certificate>('certificates')
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => this.createCompleteCertificate(a.payload.doc.id, a.payload.doc.data())))
      );
  }

  private createCompleteCertificate(id: string, data: any): Certificate {
    const certificate: Certificate = {
      id: id,
      name: data.name,
      image: data.image,
      technologies: []
    };

    if (data.technologies) {
      data.technologies.forEach(skill =>
        skill.get()
          .then(res => certificate.technologies.push({id: res.id, ...res.data()}))
          .catch(err => console.log(err))
      );
    }
    return certificate;
  }

  addCertificate(name: string, img: File, technologies: string[]): string {
    const technologiesRef: DocumentReference[] = [];
    if (technologies) {
      technologies.forEach(technology => technologiesRef.push(this.db.doc(`/skills/${technology}`).ref));
    }

    const id = this.db.createId();
    if (img) {
      this.addCertWithImage(img, { name, technologies: technologiesRef });
    } else {
      this.addCert('', { name, technologies: technologiesRef });
    }

    return id;
  }

  private addCertWithImage(img: File, data) {
    const uuid = UUID.UUID();
    this.storage.upload(`certificates/${uuid}`, img)
      .then(result => result.ref.getDownloadURL()
        .then(url => this.addCert(url, data))
        .catch(res => console.log(`Something wrong when getting download url:\n${res}`)))
      .catch(result => console.log(`Something wrong while uploading certificate image:\n${result}`));
  }

  private addCert(url: string, data) {
    this.db.collection('certificates')
      .add({image: url, ...data})
      .catch(err => console.log(`Something went wrong:\n${err}`));
  }

  editCertificate(id: string, name: string, img: File, currentImgUrl: string, technologies: string[]): boolean {
    let edited = false;

    const technologiesRef: DocumentReference[] = [];
    if (technologies) {
      technologies.forEach(technology => technologiesRef.push(this.db.doc(`/skills/${technology}`).ref));
    }

    if (img) {
      const uuid = UUID.UUID();
      this.storage.upload(`certificates/${uuid}`, img)
        .then(res => res.ref.getDownloadURL()
          .then(url => {
            edited = this.updateCert(id, { name, image: url, technologies: technologiesRef });
            if (currentImgUrl && currentImgUrl !== '') {
              this.deleteCertificateImage(currentImgUrl);
            }
          }))
        .catch(err => console.log(err));
    } else {
      edited = this.updateCert(id, { name, technologies: technologiesRef });
    }
    return edited;
  }

  private updateCert(id: string, data: any): boolean {
    let updated = false;
    this.db.doc(`certificates/${id}`)
      .update(data)
      .then(() => updated = true)
      .catch(err => console.log(err));
    return updated;
  }

  deleteCertificate(id: string, imgUrl: string): boolean {
    let deleted = false;
    this.db.doc(`certificates/${id}`)
      .delete()
      .then(() => {
        if (imgUrl && imgUrl !== '') {
          this.deleteCertificateImage(imgUrl);
        }
        deleted = true;
      })
      .catch(err => console.log(err));
    return deleted;
  }

  deleteCertificateImage(url: string) {
    this.storage
      .storage
      .refFromURL(url)
      .delete()
      .catch(err => console.log(err));
  }
}
