export const QuizResultKeys = {
  all: ['quizResult'] as const,
  lists: () => [...QuizResultKeys.all, 'list'] as const,
  byId: (id: number) => [...QuizResultKeys.all, id] as const,
};
