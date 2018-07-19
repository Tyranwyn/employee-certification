import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SkillService } from '../../skills/shared/skill.service';
import { SkillCheckbox } from '../shared/skill-checkbox.model';

@Component({
  selector: 'app-skills-filter',
  templateUrl: './skills-filter.component.html',
  styleUrls: ['./skills-filter.component.css']
})
export class SkillsFilterComponent implements OnInit {

  skills: SkillCheckbox[] = [];

  @Output()
  skillsChange = new EventEmitter();

  constructor(private skillService: SkillService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.skillService.getSkills().subscribe(skills =>
      skills.forEach(skill =>
        this.skills.push({...skill, checked: false})));
  }

  selectSkill() {
    this.skillsChange.emit(this.skills);
  }
}
