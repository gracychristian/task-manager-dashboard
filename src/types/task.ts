import type { DropdownOption } from "./props";

export type TaskStatus = "todo" | "in_progress" | "done";
export type TaskPriority = "low" | "medium" | "high";

export type Task = {
  id: string;
  title: string;
  description: string;
  status: DropdownOption | null;
  priority: DropdownOption | null;
  dueDate: string;
};

export type TaskBoardProps = {
  filteredTasks: Task[];
  currentPage: Record<string, number>;
  tasksPerPage: number;
  onPageChange: (status: string, newPage: number) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onDragStart: (e: React.DragEvent, task: Task) => void;
  onDrop: (e: React.DragEvent, status: string) => void;
  isOverdue: (dueDate: string, status: string) => boolean;
};

export type TaskColumnProps = {
  columnId: string;
  title: string;
  colorClass: string;
  tasks: Task[];
  page: number;
  totalPages: number;
  totalTasks: number;
  onPageChange: (newPage: number) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onDragStart: (e: React.DragEvent, task: Task) => void;
  onDrop: (e: React.DragEvent, columnId: string) => void;
  isOverdue: (dueDate: string, status: string) => boolean;
};

export type TasksHeaderProps = {
  onEditTask: (task: Task) => void;
};
