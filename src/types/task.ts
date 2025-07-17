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
