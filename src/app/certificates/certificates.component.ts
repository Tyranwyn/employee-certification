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
  isDrawerOpen = false;

  @ViewChild('sidenav')
  navbar: MatSidenav;

  constructor() { }

  ngOnInit() {
  }

  clickedOnCertificate(id: string) {
    if (this.currentId !== id) {
      this.currentId = id;
      if (!this.isDrawerOpen) {
        this.navbar.toggle(true);
        this.isDrawerOpen = true;
      }
    } else {
      this.navbar.toggle(false);
      this.isDrawerOpen = false;
      this.currentId = null;
    }
  }

  onFiltersChanged(skillsSelected: SkillCheckbox[]) {
    this.skillsSelected = [];
    skillsSelected
      .filter(skill => skill.checked)
      .forEach(skill => this.skillsSelected.push(skill.id));
  }
}
