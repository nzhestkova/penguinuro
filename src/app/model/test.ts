import { Question } from "./question";

export class Test {
  _id: number;
  title: string;
  authorID: number;
  questions: Question[];
  ready: boolean;
  passingScore: number;
  assigned: number[];
  lifeCycle: {
    isTemporary: boolean;
    openTime: string;
    closeTime: string;
  };
  passProcess: {
    isOnTime: boolean;
    timeToPass: number;
  };
  rePassAbility: {
    attemptNotLimited: boolean;
    attemptCount: number;
  };

  constructor(questions: Question[], authorID: number) {
    this.authorID = authorID;
    this.questions = questions.filter((question) => question);
    this.passingScore = this.questions.length;
    this.ready = false;
  }
}
