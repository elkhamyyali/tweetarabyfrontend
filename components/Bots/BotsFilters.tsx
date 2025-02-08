"use client";

import { useState } from "react";
import { Select, SelectItem, Input } from "@nextui-org/react";

const DynamicFilterComponent = ({ data, onFilter }) => {
  // State to hold filter values
  const [filters, setFilters] = useState({
    is_active: "all",
    type: "all",
    state: "all",
    campaign: "all",
    search: "",
  });

  // Function to get unique options dynamically
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
      const isActiveMatch =
        filterValues.is_active === "all" ||
        String(item.is_active) === filterValues.is_active;

      const typeMatch =
        filterValues.type === "all" || item.type === filterValues.type;

      const stateMatch =
        filterValues.state === "all" || item.state === filterValues.state;

      const campaignMatch =
        filterValues.campaign === "all" ||
        (item.campaign && item.campaign === filterValues.campaign);

      const searchMatch =
        filterValues.search === "" ||
        (item.bot_ip &&
          item.bot_ip
            .toLowerCase()
            .includes(filterValues.search.toLowerCase()));

      return (
        isActiveMatch && typeMatch && stateMatch && campaignMatch && searchMatch
      );
    });

    onFilter(filteredData);
  };

  return (
    <div className="flex flex-col gap-y-4 p-4 rounded-lg mb-4">
      {/* Search Input */}
      <Input
        label="Search by Bot IP"
        placeholder="Enter Bot IP..."
        value={filters.search}
        onChange={(e) => handleChange("search", e.target.value)}
        color="primary"
        className="mb-4"
      />

      {/* Is Active Filter */}
      <Select
        label="By Is Active"
        color="primary"
        className="mb-4"
        selectedKeys={[filters.is_active]}
        onChange={(e) => handleChange("is_active", e.target.value)}
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

      {/* Bot Type Filter */}
      <Select
        label="By Bot Type"
        color="primary"
        className="mb-4"
        selectedKeys={[filters.type]}
        onChange={(e) => handleChange("type", e.target.value)}
      >
        <SelectItem key="all" value="all">
          All
        </SelectItem>
        {getUniqueOptions("type").map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </Select>

      {/* Bot State Filter */}
      <Select
        label="By Bot State"
        color="primary"
        className="mb-4"
        selectedKeys={[filters.state]}
        onChange={(e) => handleChange("state", e.target.value)}
      >
        <SelectItem key="all" value="all">
          All
        </SelectItem>
        {getUniqueOptions("state").map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </Select>

      {/* Campaign Filter */}
      {/* <Select
        label="By Campaign"
        color="primary"
        selectedKeys={[filters.campaign]}
        onChange={(e) => handleChange("campaign", e.target.value)}
      >
        <SelectItem key="all" value="all">
          All
        </SelectItem>
        {getUniqueOptions("campaign").map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </Select> */}
    </div>
  );
};

export default DynamicFilterComponent;
