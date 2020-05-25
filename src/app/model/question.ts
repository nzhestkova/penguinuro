export class Question {
  type: string;
  wording: string;
  answers: string[];
  correctAnswers: string[];

  constructor(type: string, wording?: string, answers?: string[], correctAnswers?: string[]) {
    this.type = type;
    this.wording = wording;
    if (answers) { this.answers = answers; }
    if (correctAnswers) { this.correctAnswers = correctAnswers; }
  }

  setWording(wording: string): void {
    this.wording = wording;
  }

  setAnswers(answers: string[]): void {
    this.answers = answers.map((answer) => answer);
  }

  setCorrectAnswers(answers: string[]): void {
    this.correctAnswers = answers.map((answer) => answer);
  }
}
