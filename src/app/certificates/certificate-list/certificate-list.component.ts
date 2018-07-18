import { Component, EventEmitter, Output } from '@angular/core';
import { Certificate } from '../shared/certificate.model';
import { CertificateService } from '../shared/certificate.service';

@Component({
  selector: 'app-certificate-list',
  templateUrl: './certificate-list.component.html',
  styleUrls: ['./certificate-list.component.css']
})
export class CertificateListComponent {

  certificates: Certificate[] = [];

  @Output()
  currentIdChange = new EventEmitter();

  constructor(certificateService: CertificateService) {
     certificateService.getCertificates().subscribe(value => this.certificates = value);
  }

  openDrawer(id: string) {
    this.currentIdChange.emit(id);
  }
}
