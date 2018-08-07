import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../core/material/material.module';
import { AddSkillModalComponent } from './add-skill-modal/add-skill-modal.component';
import { SkillListComponent } from './skill-list/skill-list.component';
import { SkillsComponent } from './skills.component';
import { DuplicateSkillValidatorDirective } from './shared/duplicate-skill-validator.directive';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [],
  declarations: [
    SkillsComponent,
    SkillListComponent,
    AddSkillModalComponent
  ],
  entryComponents: [AddSkillModalComponent]
})
export class SkillsModule { }
