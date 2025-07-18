import type { ReactNode } from "react";
import type { Task } from "./task";

export type DropdownOption = {
  label: string;
  value: string;
};

export type FormModalProps = {
  open: boolean;
  initialData?: Task;
  onClose: () => void;
};

export type ProtectedRoutesProps = {
  children: ReactNode;
};

export type DateRangeProps = {
  onChange: (from: string, to: string) => void;
};

export type DashboardHeaderProps = {
  onAddTaskClick: () => void;
};

export type InputFieldProps = {
    name: string;
    label: string;
    type?: string;
    formik: any
    icon?: React.ReactNode;
    endIcon?: React.ReactNode;
    onEndIconClick?: () => void;
    multiline?: boolean;
    rows?: number;
    select?: boolean;
    options?: { label: string; value: string }[];
    required?: boolean;
    placeholder?: string;
}