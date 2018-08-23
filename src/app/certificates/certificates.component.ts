import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Certificate } from './shared/certificate.model';
import { SkillCheckbox } from './shared/skill-checkbox.model';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.css']
})
export class CertificatesComponent implements OnInit {

  currentCertificate: Certificate;
  skillsSelected: String[] = [];
  isDrawerOpen = false;

  @ViewChild('sidenav')
  navbar: MatSidenav;

  constructor() {
  }

  ngOnInit() {
  }

  // TODO: FIXXXXXX DIZZZZ
  clickedOnCertificate(certificate: Certificate) {
    if (this.currentCertificate !== certificate) {
      this.currentCertificate = certificate;
      if (!this.isDrawerOpen) {
        this.navbar.toggle(true);
        this.isDrawerOpen = true;
      }
    } else {
      this.navbar.toggle(false);
      this.isDrawerOpen = false;
      this.currentCertificate = null;
    }
  }

  onFiltersChanged(skillsSelected: SkillCheckbox[]) {
    this.skillsSelected = [];
    skillsSelected
      .filter(skill => skill.checked)
      .forEach(skill => this.skillsSelected.push(skill.id));
  }
}
