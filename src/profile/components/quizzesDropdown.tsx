import { QuizResultResponse } from '../../services/API/response/quizResultResponse';

type QuizzesDropdownProps = {
  quizResults: QuizResultResponse[];
};

export const QuizzesDropdown = (props: QuizzesDropdownProps) => {
  const { quizResults } = props;
  return <div>Q</div>;
};
