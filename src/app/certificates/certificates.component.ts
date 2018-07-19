import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { SkillCheckbox } from './shared/skill-checkbox.model';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.css']
})
export class CertificatesComponent implements OnInit {

  currentId: string;
  skillsSelected: String[] = [];

  @ViewChild('sidenav')
  navbar: MatSidenav;

  constructor() { }

  ngOnInit() {
  }

  clickedOnCertificate(id: string) {
    this.currentId = id;
    this.navbar.toggle();
  }

  onFiltersChanged(skillsSelected: SkillCheckbox[]) {
    this.skillsSelected = [];
    skillsSelected
      .filter(skill => skill.checked)
      .forEach(skill => this.skillsSelected.push(skill.id));
  }
}
