import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { map } from 'rxjs/operators';
import { Certificate } from '../shared/certificate.model';
import { CertificateService } from '../shared/certificate.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-certificate-list',
  templateUrl: './certificate-list.component.html',
  styleUrls: ['./certificate-list.component.css']
})
export class CertificateListComponent implements OnChanges {

  certificates: Observable<Certificate[]>;
  filteredCertificates: Observable<Certificate[]>;

  @Input()
  skillsSelected: String[];

  @Output()
  currentIdChange = new EventEmitter();

  constructor(certificateService: CertificateService) {
    this.certificates = certificateService.getCertificates();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.skillsSelected.length !== 0) {
      this.filterCertificatesBySkill();
    } else {
      this.filteredCertificates = this.certificates;
    }
  }

  openDrawer(id: string) {
    this.currentIdChange.emit(id);
  }

  filterCertificatesBySkill() {
    this.filteredCertificates = this.certificates.pipe(
      map(certs => certs.filter(cert => {
          for (const skillId of this.skillsSelected) {
            for (const certTechId of cert.technologies) {
              if (skillId === certTechId.id) {
                console.log(skillId);
                return true;
              }
            }
          }
          return false;
        })
      )
    );
  }
}
