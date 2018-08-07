import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material/material.module';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { AddNewObjectSheetComponent } from './nav/add-new-object-sheet/add-new-object-sheet.component';
import { NavComponent } from './nav/nav.component';
import { ToastModule } from './toast/toast.module';

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
