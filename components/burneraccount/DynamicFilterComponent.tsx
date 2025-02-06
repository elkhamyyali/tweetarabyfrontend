"use client";

import { useState, useEffect } from "react";
import { Select, SelectItem, Input } from "@nextui-org/react";

const DynamicFilterComponent = ({ data, onFilter }) => {
  // Filter configuration array
  const filterConfig = [
    {
      key: "state",
      label: "STATE",
      type: "dynamic",
      defaultValue: "all",
    },
    {
      key: "is_active",
      label: "ACTIVE STATUS",
      type: "boolean",
      defaultValue: "all",
    },
    {
      key: "in_group",
      label: "IN GROUP",
      type: "boolean",
      defaultValue: "all",
    },
    {
      key: "account_type",
      label: "ACCOUNT TYPE",
      type: "dynamic",
      defaultValue: "all",
    },
  ];

  // Initialize filters state based on config
  const initialFilters = {
    search: "", // Added search field
    ...Object.fromEntries(
      filterConfig.map((filter) => [filter.key, filter.defaultValue])
    ),
  };

  const [filters, setFilters] = useState(initialFilters);

  // Common options for boolean filters
  const booleanOptions = [
    { label: "Yes", value: "true" },
    { label: "No", value: "false" },
  ];

  // Get unique options from data for dynamic filters
  const getUniqueOptions = (key) => {
    const uniqueValues = [...new Set(data.map((item) => item[key]))].filter(
      Boolean
    );
    return uniqueValues.map((value) => ({
      label: String(value),
      value: String(value),
    }));
  };

  // Handle filter changes
  const handleChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  // Apply all filters
  const applyFilters = (filterValues) => {
    const filteredData = data.filter((item) => {
      const matchesAllFilters = Object.entries(filterValues).every(
        ([filterKey, filterValue]) => {
          if (filterKey === "search") {
            return (
              filterValue === "" ||
              (item.name?.toLowerCase() || "").includes(
                filterValue.toLowerCase()
              )
            );
          }
          return (
            filterValue === "all" || String(item[filterKey]) === filterValue
          );
        }
      );
      return matchesAllFilters;
    });

    onFilter(filteredData);
  };

  // Reset filters when data changes
  useEffect(() => {
    setFilters(initialFilters);
    onFilter(data);
  }, [data, onFilter]);

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

      {filterConfig.map((filter) => (
        <Select
          key={filter.key}
          color="primary"
          label={filter.label}
          className="mb-4"
          value={filters[filter.key]}
          onChange={(e) => handleChange(filter.key, e.target.value)}
        >
          <SelectItem key="all">All</SelectItem>
          {filter.type === "boolean"
            ? booleanOptions.map((option) => (
                <SelectItem key={option.value}>{option.label}</SelectItem>
              ))
            : getUniqueOptions(filter.key).map((option) => (
                <SelectItem key={option.value}>{option.label}</SelectItem>
              ))}
        </Select>
      ))}
    </div>
  );
};

export default DynamicFilterComponent;
