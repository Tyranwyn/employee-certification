import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionListComponent } from './question-list/question-list.component';
import { QuestionsComponent } from './questions.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    QuestionsComponent,
    QuestionListComponent
  ]
})
export class QuestionsModule { }
