import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MyErrorStateMatcher } from '../../core/my-error-state-matcher';
import { AddSkillModalComponent } from '../../skills/add-skill-modal/add-skill-modal.component';
import { Skill } from '../../skills/shared/skill.model';
import { SkillService } from '../../skills/shared/skill.service';
import { Certificate } from '../shared/certificate.model';
import { CertificateService } from '../shared/certificate.service';

@Component({
  selector: 'app-add-certificate-modal',
  templateUrl: './add-certificate-modal.component.html',
  styleUrls: ['./add-certificate-modal.component.css']
})
export class AddCertificateModalComponent implements OnInit {

  certificates: Certificate[];
  skills: Skill[];
  certificateImage: File;

  certificateForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(private certificateService: CertificateService,
              private skillService: SkillService,
              public dialogRef: MatDialogRef<AddCertificateModalComponent>,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.certificateService.getCertificates().subscribe(certs => this.certificates = certs);
    this.skillService.getSkills().subscribe(skills => this.skills = skills);
    this.certificateForm = new FormGroup({
      'name': new FormControl('', [
        Validators.required,
        this.duplicateSkillValidator()
      ]),
      'skills': new FormControl()
    });
  }

  duplicateSkillValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let alreadyInCertificates = false;
      if (this.certificates !== undefined) {
        alreadyInCertificates = this.certificates
          .map(certificate => certificate.name.toLowerCase())
          .indexOf(this.name.value.toLowerCase()) !== -1;
      }
      return alreadyInCertificates ? {'duplicateName': {value: control.value}} : null;
    };
  }

  onSubmit() {
    this.certificateService.addCertificate(this.name.value, this.certificateImage, this.selectedSkills.value);
    this.dialogRef.close();
  }

  addNewSkill() {
    this.dialog.open(AddSkillModalComponent, {width: '20em'});
  }

  selectFile(event) {
    this.certificateImage = event.file;
  }

  get name() {
    return this.certificateForm.get('name');
  }

  get selectedSkills() {
    return this.certificateForm.get('skills') ;
  }

}
