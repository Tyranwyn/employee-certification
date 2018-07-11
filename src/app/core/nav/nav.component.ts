import { Component, OnInit } from '@angular/core';

class MenuItem {
  constructor(public caption: string, public link: any[]) {}
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  menuItems: MenuItem[];

  constructor() { }

  ngOnInit() {
    this.menuItems = [
      {caption: 'Questions', link: ['/questions']},
      {caption: 'Employees', link: ['/employees']},
      {caption: 'Projects', link: ['/projects']},
      {caption: 'Certificates', link: ['/certificates']},
      {caption: 'Skills', link: ['/skills']},
      {caption: 'Chat', link: ['/chat']}
    ];
  }
}
