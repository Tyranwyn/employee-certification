import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillListComponent } from './skill-list/skill-list.component';
import { SkillsComponent } from './skills.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [],
  declarations: [
    SkillsComponent,
    SkillListComponent
  ]
})
export class SkillsModule { }
