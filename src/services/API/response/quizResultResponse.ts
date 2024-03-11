export interface QuizResultResponse {
  employeeResultID: number;
  fk_QuizID: number;
  username: string;
  quizHeading: string;
  guessedAnswer: string;
  quizDate: string;
  points: number;
  isCorrect: string;
}
