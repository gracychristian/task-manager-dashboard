import { AlertCircle, Clock, CheckCircle } from "lucide-react";
import type { ReactNode } from "react";

export const statusOptions = [
  { label: 'Todo', value: 'todo' },
  { label: 'In Progress', value: 'in_progress' },
  { label: 'Done', value: 'done' },
]
export const priorityOptions = [
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
]

export const statusConfig: Record<string, { label: string; color: string; icon: () => ReactNode }> = {
  todo: {
    label: "Todo",
    color: "bg-blue-100 text-blue-800 border-blue-200",
    icon: () => <AlertCircle className="w-4 h-4" />,
  },
  in_progress: {
    label: "In Progress",
    color: "bg-orange-100 text-orange-800 border-orange-200",
    icon: () => <Clock className="w-4 h-4" />,
  },
  done: {
    label: "Done",
    color: "bg-green-100 text-green-800 border-green-200",
    icon: () => <CheckCircle className="w-4 h-4" />,
  },
};

export const priorityConfig: Record<string, { color: string }> = {
  high: {
    color: "bg-red-100 text-red-800 border-red-200",
  },
  medium: {
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
  low: {
    color: "bg-green-100 text-green-800 border-green-200",
  },
};

export const columns = [
  { id: 'todo', title: 'To Do', color: 'bg-blue-50 border-blue-200' },
  { id: 'in_progress', title: 'In Progress', color: 'bg-orange-50 border-orange-200' },
  { id: 'done', title: 'Done', color: 'bg-green-50 border-green-200' }
];