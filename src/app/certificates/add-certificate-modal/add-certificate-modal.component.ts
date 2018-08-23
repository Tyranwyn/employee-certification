import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { MyErrorStateMatcher } from '../../core/my-error-state-matcher';
import { AddSkillModalComponent } from '../../skills/add-skill-modal/add-skill-modal.component';
import { Skill } from '../../skills/shared/skill.model';
import { SkillService } from '../../skills/shared/skill.service';
import { CertificatesComponent } from '../certificates.component';
import { Certificate } from '../shared/certificate.model';
import { CertificateService } from '../shared/certificate.service';

@Component({
  selector: 'app-add-certificate-modal',
  templateUrl: './add-certificate-modal.component.html',
  styleUrls: ['./add-certificate-modal.component.css']
})
export class AddCertificateModalComponent implements OnInit {

  editing: boolean;
  editCertificate: Certificate;

  certificates: Certificate[];
  technologyList: Skill[];
  certificateImage: File;

  certificateForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(private certificateService: CertificateService,
              private skillService: SkillService,
              public dialogRef: MatDialogRef<AddCertificateModalComponent>,
              public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    if (this.data) {
      this.editing = true;
      this.editCertificate = this.data.cert;
    }

    this.certificateService.getCertificates().subscribe(certs => this.certificates = certs);
    this.skillService.getSkills().subscribe(technologies => this.technologyList = technologies);
    this.certificateForm = new FormGroup({
      'name': new FormControl(this.editing ? this.editCertificate.name : '', [
        Validators.required,
        this.duplicateTechnologiesValidator()
      ]),
      'technologies': new FormControl(this.editing ? this.editCertificate.technologies.map(t => t.id) : '', Validators.required)
    });
  }

  duplicateTechnologiesValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let alreadyInCertificates = false;
      if (this.certificates !== undefined) {
        alreadyInCertificates = this.certificates
          .map(certificate => certificate.name.toLowerCase())
          .indexOf(this.name.value.toLowerCase()) !== -1;
      }
      return !this.editing && alreadyInCertificates ? {'duplicateName': {value: control.value}} : null;
    };
  }

  onSubmit() {
    if (this.editing) {
      this.certificateService.editCertificate(
        this.editCertificate.id,
        this.name.value,
        this.certificateImage,
        this.editCertificate.image,
        this.technologies.value);
    } else {
      this.certificateService.addCertificate(this.name.value, this.certificateImage, this.technologies.value);
    }
    this.dialogRef.close();
  }

  onDelete() {
    this.certificateService.deleteCertificate(this.editCertificate.id, this.editCertificate.image);
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

  get technologies() {
    return this.certificateForm.get('technologies') ;
  }

}
