import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AddCertificateModalComponent } from '../../certificates/add-certificate-modal/add-certificate-modal.component';
import { Certificate } from '../../certificates/shared/certificate.model';
import { CertificateService } from '../../certificates/shared/certificate.service';
import { MyErrorStateMatcher } from '../../core/my-error-state-matcher';
import { Role } from '../../shared/role.enum';
import { Unit } from '../../shared/unit.enum';
import { AddSkillModalComponent } from '../../skills/add-skill-modal/add-skill-modal.component';
import { Skill } from '../../skills/shared/skill.model';
import { SkillService } from '../../skills/shared/skill.service';
import { Employee } from '../shared/employee.model';
import { EmployeeService } from '../shared/employee.service';

@Component({
  selector: 'app-add-employee-modal',
  templateUrl: './add-employee-modal.component.html',
  styleUrls: ['./add-employee-modal.component.css']
})
export class AddEmployeeModalComponent implements OnInit {

  roles = Role;
  units = Unit;
  employees: Employee[];
  skills: Skill[];
  certificates: Certificate[];

  employeeForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  employed = true;

  constructor(private employeeService: EmployeeService,
              private skillService: SkillService,
              private certificateService: CertificateService,
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<AddEmployeeModalComponent>,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.employeeService
      .getEmployedEmployeesObservable()
      .subscribe(employees => this.employees = employees);
    this.skillService
      .getSkills()
      .subscribe(skills => this.skills = skills);
    this.certificateService
      .getCertificates()
      .subscribe(certificates => this.certificates = certificates);
    this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      profilePicture: ['', ],
      role: ['', Validators.required],
      unit: ['', Validators.required],
      skills: ['', ],
      certificates: ['', ]
    });
  }

  onSubmit() {
    this.employeeService.addEmployee(this.firstName.value, this.lastName.value, this.email.value, this.profilePicture.value,
      this.role.value, this.unit.value, this.skillsInput, this.certificatesInput, this.employed);
    this.dialogRef.close();
  }

  addNewSkill() {
    this.dialog.open(AddSkillModalComponent, {width: '20em'});
  }

  addNewCertificate() {
    this.dialog.open(AddCertificateModalComponent, {width: '30em'});
  }

  get firstName() {
    return this.employeeForm.get('firstName');
  }

  get lastName() {
    return this.employeeForm.get('lastName');
  }

  get email() {
    return this.employeeForm.get('email');
  }

  get profilePicture() {
    return this.employeeForm.get('profilePicture');
  }

  get role() {
    return this.employeeForm.get('role');
  }

  get unit() {
    return this.employeeForm.get('unit');
  }

  get skillsInput() {
    const skills = this.employeeForm.get('skills');
    return skills.value !== '' ? skills.value : [];
  }

  get certificatesInput() {
    const certificates = this.employeeForm.get('certificates');
    return certificates.value !== '' ? certificates.value : [];
  }
}
