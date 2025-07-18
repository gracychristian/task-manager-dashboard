import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  type SelectChangeEvent,
} from "@mui/material";

type Option = {
  label: string;
  value: string;
};

type FilterSelectProps = {
  label: string;
  options: Option[];
  value?: string;
  onChange: (value: string) => void;
  clearable?: boolean;
};

const FilterSelect = ({
  label,
  options,
  value = "",
  onChange,
}: FilterSelectProps) => {

  const handleChange = (e: SelectChangeEvent) => {
    onChange(e.target.value as string);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id={`${label}-label`}>{label}</InputLabel>
      <Select
        labelId={`${label}-label`}
        label={label}
        value={value}
        onChange={handleChange}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FilterSelect;
