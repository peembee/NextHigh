export const PongRankKeys = {
  all: ['PongRank'] as const,
  lists: () => [...PongRankKeys.all, 'list'] as const,
  byId: (id: number) => [...PongRankKeys.all, id] as const,
};
