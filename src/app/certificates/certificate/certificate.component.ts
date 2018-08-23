import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AddEmployeeModalComponent } from '../../employees/add-employee-modal/add-employee-modal.component';
import { Employee } from '../../employees/shared/employee.model';
import { EmployeeService } from '../../employees/shared/employee.service';
import { AddCertificateModalComponent } from '../add-certificate-modal/add-certificate-modal.component';
import { Certificate } from '../shared/certificate.model';
import { CertificateService } from '../shared/certificate.service';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css']
})
export class CertificateComponent implements OnChanges {

  @Input()
  currentCertificate: Certificate;
  employeesWithCurrentCertificate: Observable<Employee[]>;

  constructor(route: ActivatedRoute,
              private certificateService: CertificateService,
              private employeeService: EmployeeService,
              private dialog: MatDialog) {
    // If project accessed via url, convert to ProjectListDto
    if (route.snapshot.params.id) {
      this.getCertificateWithCorrespondingEmployees(route.snapshot.params.id);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.currentCertificate) {
      this.employeesWithCurrentCertificate = this.employeeService.getEmployeesByCertificateId(this.currentCertificate.id);
    }
  }

  getCertificateWithCorrespondingEmployees(id: string) {
    this.certificateService.getCertificateById(id).subscribe(value => {
      this.currentCertificate = value;
      this.employeesWithCurrentCertificate = this.employeeService.getEmployeesByCertificateId(value.id);
    });
  }

  edit() {
    this.dialog.open(AddCertificateModalComponent, {
      width: '40em',
      data: { cert: this.currentCertificate}
    });
  }

}
