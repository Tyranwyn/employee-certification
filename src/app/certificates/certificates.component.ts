import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.css']
})
export class CertificatesComponent implements OnInit {

  currentId: string;

  @ViewChild('sidenav')
  navbar: MatSidenav;

  constructor() { }

  ngOnInit() {
  }

  clickedOnCertificate(id: string) {
    this.currentId = id;
    this.navbar.toggle();
  }
}
