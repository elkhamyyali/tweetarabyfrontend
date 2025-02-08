"use client";

import { useState } from "react";
import { Select, SelectItem, Input } from "@nextui-org/react";

const DynamicFilterComponent = ({ data, onFilter }) => {
  // State to hold filter values
  const [filters, setFilters] = useState({
    user_type: "all",
    is_staff: "all",
    is_director: "all",
    search: "",
  });

  // Generate unique options for user_type
  const getUniqueOptions = (key) => {
    const uniqueValues = [...new Set(data.map((item) => item[key]))].filter(
      Boolean
    );
    return uniqueValues.map((value) => ({
      label: String(value).charAt(0).toUpperCase() + String(value).slice(1),
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
      const userTypeMatch =
        filterValues.user_type === "all" ||
        item.user_type === filterValues.user_type;

      const staffMatch =
        filterValues.is_staff === "all" ||
        String(item.is_staff) === filterValues.is_staff;

      const directorMatch =
        filterValues.is_director === "all" ||
        String(item.is_director) === filterValues.is_director;

      const searchMatch =
        filterValues.search === "" ||
        item.username
          .toLowerCase()
          .includes(filterValues.search.toLowerCase()) ||
        (item.name &&
          item.name.toLowerCase().includes(filterValues.search.toLowerCase()));

      return userTypeMatch && staffMatch && directorMatch && searchMatch;
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

      {/* User Type Filter */}
      <Select
        color="primary"
        label="By User Type"
        className="mb-4"
        selectedKeys={[filters.user_type]}
        onChange={(e) => handleChange("user_type", e.target.value)}
      >
        <SelectItem key="all" value="all">
          All
        </SelectItem>
        {getUniqueOptions("user_type").map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </Select>

      {/* Staff Filter */}
      <Select
        label="By is staff"
        color="primary"
        className="mb-4"
        selectedKeys={[filters.is_staff]}
        onChange={(e) => handleChange("is_staff", e.target.value)}
      >
        <SelectItem key="all" value="all">
          All
        </SelectItem>
        <SelectItem key="true" value="true">
          Yes
        </SelectItem>
        <SelectItem key="false" value="false">
          No
        </SelectItem>
      </Select>

      {/* Director Filter */}
      <Select
        label="By is director"
        color="primary"
        selectedKeys={[filters.is_director]}
        onChange={(e) => handleChange("is_director", e.target.value)}
      >
        <SelectItem key="all" value="all">
          All
        </SelectItem>
        <SelectItem key="true" value="true">
          Yes
        </SelectItem>
        <SelectItem key="false" value="false">
          No
        </SelectItem>
      </Select>
    </div>
  );
};

export default DynamicFilterComponent;
