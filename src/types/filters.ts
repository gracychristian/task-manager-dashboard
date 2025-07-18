import type { DropdownOption } from "./props";

export type FilterSelectProps = {
  label: string;
  options: DropdownOption[];
  value?: string;
  onChange: (value: string) => void;
  clearable?: boolean;
};

export type FilterParams = {
  searchTerm?: string;
  status?: string;
  priority?: string;
  fromDate?: Date;
  toDate?: Date;
};
