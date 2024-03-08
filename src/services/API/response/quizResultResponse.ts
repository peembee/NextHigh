export interface QuizResultResponse {
  fk_QuizID: number;
  username: string;
  quizHeading: string;
  guessedAnswer: string;
  quizDate: string;
  points: number;
  isCorrect: string;
}
