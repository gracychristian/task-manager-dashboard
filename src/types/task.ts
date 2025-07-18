export type TaskStatus = 'todo' | 'in_progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export type DropdownOption = {
  label: string;
  value: string;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  status: DropdownOption | null;
  priority: DropdownOption | null;
  dueDate: string;
};

export type FilterParams = {
  searchTerm?: string;
  status?: string;
  priority?: string;
  fromDate?: Date;
  toDate?: Date;
};