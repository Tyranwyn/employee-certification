import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef, MatDialog } from '@angular/material';
import { AddCertificateModalComponent } from '../../../certificates/add-certificate-modal/add-certificate-modal.component';
import { AddEmployeeModalComponent } from '../../../employees/add-employee-modal/add-employee-modal.component';
import { AddProjectModalComponent } from '../../../projects/add-project-modal/add-project-modal.component';
import { AddSkillModalComponent } from '../../../skills/add-skill-modal/add-skill-modal.component';

@Component({
  selector: 'app-add-new-object-sheet',
  templateUrl: './add-new-object-sheet.component.html',
  styleUrls: ['./add-new-object-sheet.component.css']
})
export class AddNewObjectSheetComponent implements OnInit {

  constructor(private sheetRef: MatBottomSheetRef<AddNewObjectSheetComponent>,
              public dialog: MatDialog) { }

  ngOnInit() {
  }

  addEmployee() {
    this.dialog.open(AddEmployeeModalComponent, {width: '60em'});
    this.sheetRef.dismiss();
  }

  addProject() {
    this.dialog.open(AddProjectModalComponent, {width: '60em'});
    this.sheetRef.dismiss();
  }

  addCertificate() {
    this.dialog.open(AddCertificateModalComponent, {width: '60em'});
    this.sheetRef.dismiss();
  }

  addSkill() {
    this.dialog.open(AddSkillModalComponent, {width: '60em'});
    this.sheetRef.dismiss();
  }
}
