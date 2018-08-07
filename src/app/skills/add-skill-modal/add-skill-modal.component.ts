import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { MyErrorStateMatcher } from '../../core/my-error-state-matcher';
import { Skill } from '../shared/skill.model';
import { SkillService } from '../shared/skill.service';

@Component({
  selector: 'app-add-skill-modal',
  templateUrl: './add-skill-modal.component.html',
  styleUrls: ['./add-skill-modal.component.css']
})
export class AddSkillModalComponent implements OnInit {

  skills: Skill[];

  skillForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  alreadyInSkills = false;

  constructor(private skillService: SkillService, public dialogRef: MatDialogRef<AddSkillModalComponent>) {
  }

  ngOnInit() {
    this.skillService.getSkills().subscribe(skills => this.skills = skills);
    this.skillForm = new FormGroup({
      'name': new FormControl('', [
        Validators.required,
        this.duplicateSkillValidator()
      ])
    });
  }

  duplicateSkillValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      if (this.skills !== undefined) {
        this.alreadyInSkills = this.skills.map(skill => skill.name).indexOf(this.name.value) !== -1;
      }
      return this.alreadyInSkills ? { 'duplicateName': {value: control.value }} : null;
    };
  }

  addSkill() {
    this.skillService.addSkill(this.name.value);
    this.dialogRef.close();
  }

  get name() {
    return this.skillForm.get('name');
  }
}
