export const PongResultKeys = {
  all: ['pongResult'] as const,
  lists: () => [...PongResultKeys.all, 'list'] as const,
  byId: (id: number) => [...PongResultKeys.all, id] as const,
};
