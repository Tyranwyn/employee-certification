import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Employee } from '../../employees/shared/employee.model';
import { EmployeeService } from '../../employees/shared/employee.service';
import { Certificate } from '../shared/certificate.model';
import { CertificateService } from '../shared/certificate.service';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css']
})
export class CertificateComponent implements OnChanges {

  @Input()
  currentCertificateId: string;

  currentCertificate: Certificate;
  employeesWithCurrentCertificate: Observable<Employee[]>;

  constructor(route: ActivatedRoute, private certificateService: CertificateService,
              private employeeService: EmployeeService) {
    // If project accessed via url, convert to ProjectListDto
    if (route.snapshot.params.id) {
      this.currentCertificateId = route.snapshot.params.id;
      this.getCertificateWithCorrespondingEmployees(this.currentCertificateId);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.currentCertificateId) {
      this.getCertificateWithCorrespondingEmployees(this.currentCertificateId);
    }
  }

  getCertificateWithCorrespondingEmployees(id: string) {
    this.certificateService.getCertificateById(id).subscribe(value => {
      this.currentCertificate = value;
      this.employeesWithCurrentCertificate = this.employeeService.getEmployeesByCertificateId(value.id);
    });
  }

}
