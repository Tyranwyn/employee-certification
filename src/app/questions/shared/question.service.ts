import { Injectable } from '@angular/core';
import { Question } from './question';

@Injectable()
export abstract class QuestionService {
  abstract getQuestions(): Question[];
  abstract getQuestionById(): Question;
}
