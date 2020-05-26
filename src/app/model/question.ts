export class Question {
  type: string;
  wording: string;
  answers: string[];
  correctAnswers: string[];

  constructor(type: string, wording?: string, answers?: string[], correctAnswers?: string[]) {
    this.type = type;
    this.wording = wording;
    this.answers = [];
    if (answers) { this.setAnswers(answers); }
    this.correctAnswers = [];
    if (correctAnswers) { this.setCorrectAnswers(answers); }
  }

  setWording(wording: string): void {
    this.wording = wording;
  }

  setAnswers(answers: string[]): void {
    this.answers = this.answers.concat(answers);
  }

  setCorrectAnswers(answers: string[]): void {
    this.correctAnswers = this.correctAnswers.concat(answers);
  }
}
