import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material/material.module';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { ToastModule } from './toast/toast.module';
import { NavComponent } from './nav/nav.component';
import { AddNewObjectSheetComponent } from './nav/add-new-object-sheet/add-new-object-sheet.component';

@NgModule({
  imports: [
    CommonModule,
    ToastModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    ToastModule,
    BrowserAnimationsModule,
    MaterialModule,
    [NavComponent]
  ],
  entryComponents: [AddNewObjectSheetComponent],
  declarations: [NavComponent, AddNewObjectSheetComponent]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
