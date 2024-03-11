export const QuizKeys = {
  all: ['quiz'] as const,
  lists: () => [...QuizKeys.all, 'list'] as const,
  byId: (id: number) => [...QuizKeys.all, id] as const,
};
