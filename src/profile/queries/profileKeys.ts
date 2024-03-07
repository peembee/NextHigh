export const ProfileKeys = {
  all: ['profile'] as const,
  lists: () => [...ProfileKeys.all, 'list'] as const,
  byId: (id: number) => [...ProfileKeys.all, id] as const,
};
