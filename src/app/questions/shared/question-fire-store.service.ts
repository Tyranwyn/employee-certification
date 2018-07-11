import { Injectable } from '@angular/core';
import { Question } from './question';
import { QuestionService } from './question.service';

@Injectable()
export class QuestionFireStoreService implements QuestionService {

  constructor() { }

  getQuestionById(): Question {
    return undefined;
  }

  getQuestions(): Question[] {
    return undefined;
  }
}
