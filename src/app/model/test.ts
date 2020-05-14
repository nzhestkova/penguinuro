export class SimpleTestUnit {
  question: string;
  correctAnswer: string;
  wrongAnswerOptions: string[];
  constructor(question: string,
              correctAnswer: string,
              wrongAnswerOptions: string[]) {
    this.question = question;
    this.correctAnswer = correctAnswer;
    this.wrongAnswerOptions = wrongAnswerOptions;
  }
}
