export const EmployeeKeys = {
  all: ['employees'] as const,
  lists: () => [...EmployeeKeys.all, 'list'] as const,
  byId: (id: number) => [...EmployeeKeys.all, id] as const,
};
