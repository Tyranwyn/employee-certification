import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material';
import { AddNewObjectSheetComponent } from './add-new-object-sheet/add-new-object-sheet.component';

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

  constructor(private bottomSheet: MatBottomSheet) { }

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

  openBottomSheet(): void {
    this.bottomSheet.open(AddNewObjectSheetComponent);
  }
}
