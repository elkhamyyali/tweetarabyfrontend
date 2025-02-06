"use client";

import { useState } from "react";
import { Select, SelectItem, Input } from "@nextui-org/react";

const DynamicFilterComponent = ({ data, onFilter }) => {
  // State to hold filter values
  const [filters, setFilters] = useState({
    group_main_type: "all",
    group_sub_type: "all",
    search: "",
  });

  // Generate unique options for a specific key
  const getUniqueOptions = (key) => {
    const uniqueValues = [...new Set(data.map((item) => item[key]))].filter(
      Boolean
    );
    return uniqueValues.map((value) => ({
      label: String(value),
      value: String(value),
    }));
  };

  // Handle dropdown changes and apply filters immediately
  const handleChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  // Apply filters based on state
  const applyFilters = (filterValues) => {
    const filteredData = data.filter((item) => {
      const mainTypeMatch =
        filterValues.group_main_type === "all" ||
        item.group_main_type === filterValues.group_main_type;

      const subTypeMatch =
        filterValues.group_sub_type === "all" ||
        item.group_sub_type === filterValues.group_sub_type;

      const searchMatch =
        filterValues.search === "" ||
        item.name.toLowerCase().includes(filterValues.search.toLowerCase());

      return mainTypeMatch && subTypeMatch && searchMatch;
    });

    onFilter(filteredData);
  };

  return (
    <div className="flex flex-col gap-y-4 p-4 rounded-lg mb-4">
      {/* Search Input */}
      <Input
        label="Search"
        placeholder="Search by name..."
        value={filters.search}
        onChange={(e) => handleChange("search", e.target.value)}
        color="primary"
        className="mb-4"
      />

      {/* Main Type Filter */}
      <Select
        color="primary"
        label="MAIN TYPE"
        className="mb-4"
        selectedKeys={[filters.group_main_type]}
        onChange={(e) => handleChange("group_main_type", e.target.value)}
      >
        <SelectItem key="all" value="all">
          All
        </SelectItem>
        {getUniqueOptions("group_main_type").map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </Select>

      {/* Sub Type Filter */}
      <Select
        label="SUB TYPE"
        color="primary"
        selectedKeys={[filters.group_sub_type]}
        onChange={(e) => handleChange("group_sub_type", e.target.value)}
      >
        <SelectItem key="all" value="all">
          All
        </SelectItem>
        {getUniqueOptions("group_sub_type").map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default DynamicFilterComponent;
