import { TextField, IconButton } from "@mui/material";
import { X } from "lucide-react";
import { useState } from "react";
import type { DateRangeProps } from "../../types/props";

const DateRangePicker = ({ onChange }: DateRangeProps) => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleChange = (type: "from" | "to", value: string) => {
    if (type === "from") setFromDate(value);
    else setToDate(value);
    onChange(type === "from" ? value : fromDate, type === "to" ? value : toDate);
  };

  const clearDates = () => {
    setFromDate("");
    setToDate("");
    onChange("", "");
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Due Date Range</label>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextField
          type="date"
          size="small"
          label="Start Date"
          value={fromDate}
          onChange={(e) => handleChange("from", e.target.value)}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          type="date"
          size="small"
          label="End Date"
          value={toDate}
          onChange={(e) => handleChange("to", e.target.value)}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
      </div>

      {(fromDate || toDate) && (
        <div className="pt-2">
          <IconButton size="small" onClick={clearDates}>
            <X className="w-4 h-4 text-gray-500" />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
