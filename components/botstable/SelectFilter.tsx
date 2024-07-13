import React, { useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";

interface SelectFilterProps {
  label: string;
  options: string[];
  selectedOption: string;
  onChange: (selected: string) => void;
}

const SelectFilter: React.FC<SelectFilterProps> = ({
  label,
  options,
  selectedOption,
  onChange,
}) => {
  return (
    <Select
      value={selectedOption}
      onChange={(e) => onChange(e.target.value)}
      className="rounded w-full md:w-40"
      label={label}
    >
      <SelectItem key={""} value="">
        Select {label}
      </SelectItem>
      {options.map((option) => (
        <SelectItem key={option} value={option}>
          {option}
        </SelectItem>
      ))}
    </Select>
  );
};

export default SelectFilter;
