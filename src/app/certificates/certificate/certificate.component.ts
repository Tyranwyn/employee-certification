import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  employeesWithCurrentCertificate: Employee[] = [];

  constructor(route: ActivatedRoute, private certificateService: CertificateService,
              private employeeService: EmployeeService) {
    // If project accessed via url, convert to ProjectListDto
    if (route.snapshot.params.id) {
      this.currentCertificateId = route.snapshot.params.id;
      this.getCertificateWithCorrespondingEmployees(this.currentCertificateId);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.employeesWithCurrentCertificate = [];
    if (this.currentCertificateId) {
      this.getCertificateWithCorrespondingEmployees(this.currentCertificateId);
    }
  }

  getCertificateWithCorrespondingEmployees(id: string) {
    this.certificateService.getCertificateById(id).subscribe(value => {
      this.currentCertificate = value;
      this.employeeService.getEmployedEmployeesObservable().subscribe(value1 => {
        value1.forEach(empl => {
          for (const cert of empl.certificates) {
            if (cert.id === id) {
              this.employeesWithCurrentCertificate.push(empl);
            }
          }
        });
      });
    });
  }

}
