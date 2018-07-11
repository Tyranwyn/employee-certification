import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastService } from './toast.service';

@Component({
  // moduleId: module.id,
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit, OnDestroy {

  private defaults = {
    title: '',
    message: 'Luke I am your Toast!'
  };

  private toastElement: any;
  private toastSubscription: Subscription;

  title: string;
  message: string;

  constructor(private toastService: ToastService) {
    this.toastSubscription = this.toastService.toastState.subscribe(toastMessage => {
      console.log(`activating toast: ${toastMessage.message}`);
      this.activate(toastMessage.message);
    });
  }

  activate(message = this.defaults.message, title = this.defaults.title) {
    this.message = message;
    this.title = title;
    this.show();
  }

  ngOnInit() {
    this.toastElement = document.getElementById('toast');
  }

  ngOnDestroy(): void {
    this.toastSubscription.unsubscribe();
  }

  private show() {
    console.log(this.message);
    this.toastElement.style.opacity = 1;
    this.toastElement.style.zIndex = 9999;

    window.setTimeout(() => this.hide(), 2500);
  }

  private hide() {
    this.toastElement.style.opacity = 0;
    window.setTimeout(() => this.toastElement.style.zIndex = 0, 400);
  }
}
