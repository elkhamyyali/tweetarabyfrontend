"use client";

import { useState, useEffect } from "react";
import { Select, SelectItem } from "@nextui-org/react";

const DynamicFilterComponent = ({ data, onFilter }) => {
  // State to hold filter values
  const [filters, setFilters] = useState({
    state: "all",
  });

  // Generate unique options for the state
  const getUniqueStateOptions = () => {
    const uniqueValues = [...new Set(data.map((item) => item.state))].filter(
      Boolean
    );
    return uniqueValues.map((value) => ({
      label: String(value),
      value: String(value),
    }));
  };

  // Handle dropdown changes and apply filters immediately
  const handleChange = (value) => {
    const newFilters = {
      ...filters,
      state: value,
    };

    setFilters(newFilters);

    // Apply filters
    const filteredData = data.filter((item) => {
      return newFilters.state === "all" || item.state === newFilters.state;
    });

    onFilter(filteredData);
  };

  // Update filter options when data changes
  useEffect(() => {
    // Reset filters when data changes
    setFilters({ state: "all" });
    onFilter(data);
  }, [data, onFilter]);

  return (
    <div className="flex-col gap-y-4 p-4 rounded-lg mb-4">
      <Select
        color="primary"
        label="STATE"
        className="mb-4"
        selectedKeys={[filters.state]}
        onChange={(e) => handleChange(e.target.value)}
      >
        <SelectItem key="all" value="all">
          All
        </SelectItem>
        {getUniqueStateOptions().map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default DynamicFilterComponent;
