import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Input,
  Select,
  SelectItem,
  Pagination,
  Button,
} from "@nextui-org/react";
import { columns, users as initialUsers } from "./data";
import { RenderCell } from "./render-cell"; // Assuming RenderCell is in RenderCell.js

export const TableWrapper = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 12;

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (columnKey) => {
    let direction = "ascending";
    if (sortConfig.key === columnKey && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key: columnKey, direction });
  };

  const handleFilterChange = (columnKey, filterValue) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [columnKey]: filterValue === "" ? undefined : filterValue,
    }));
  };

  const handleInSessionFilterChange = (event) => {
    const filterValue =
      event.target.value === "$.1"
        ? "Yes"
        : event.target.value === "$.2"
        ? "No"
        : undefined;
    console.log(
      `handleInSessionFilterChange called with value: ${filterValue}`
    );
    setFilters((prevFilters) => ({
      ...prevFilters,
      inSession: filterValue,
    }));
  };

  const filteredUsers = useMemo(() => {
    let filtered = [...initialUsers];
    console.log("Initial Users:", filtered);
    console.log("Filters:", filters);

    // Apply filters
    Object.keys(filters).forEach((key) => {
      if (filters[key] !== undefined && filters[key] !== "") {
        if (key === "inSession") {
          console.log(`Filtering inSession ${filters[key]}`);
          filtered = filtered.filter((user) => user.inSession === filters[key]);
          console.log("Filtered Users:", filtered);
        } else {
          filtered = filtered.filter((user) => {
            const userValue = user[key]?.toString().toLowerCase() || "";
            const filterValue = filters[key].toString().toLowerCase();
            return userValue.includes(filterValue);
          });
        }
      }
    });

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter((user) =>
        Object.values(user).some((value) =>
          value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }

    console.log("Final Filtered Users:", filtered);
    return filtered;
  }, [initialUsers, searchTerm, sortConfig, filters]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredUsers.slice(startIndex, endIndex);
  }, [filteredUsers, currentPage]);

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-wrap gap-4 mb-4">
        <Input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 rounded w-full md:w-auto"
        />
        {columns.map(
          (column) =>
            column.uid !== "id" &&
            column.uid !== "username" && (
              <div
                key={column.uid}
                className="flex flex-col md:flex-row md:items-center md:space-x-4"
              >
                <label className="text-center">{column.name}</label>
                {column.filterOptions ? (
                  <Select
                    value={filters[column.uid] || ""}
                    onChange={(e) =>
                      handleFilterChange(column.uid, e.target.value)
                    }
                    className="rounded w-full md:w-40"
                    label={column.name}
                  >
                    <SelectItem value="">Select {column.name}</SelectItem>
                    {column.filterOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </Select>
                ) : (
                  <Input
                    type="text"
                    placeholder={`Filter by ${column.name}`}
                    value={filters[column.uid] || ""}
                    onChange={(e) =>
                      handleFilterChange(column.uid, e.target.value)
                    }
                    className="p-2 rounded w-full md:w-auto"
                  />
                )}
              </div>
            )
        )}
        {/* Add the "In Session" filter */}
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
          <label className="text-center">In Session</label>
          <Select
            value={
              filters.inSession === "Yes"
                ? "$.1"
                : filters.inSession === "No"
                ? "$.2"
                : ""
            }
            onChange={handleInSessionFilterChange}
            className="rounded w-full md:w-40"
            label="By In Session"
          >
            <SelectItem value="">By In Session</SelectItem>
            <SelectItem value="$.1">Yes</SelectItem>
            <SelectItem value="$.2">No</SelectItem>
          </Select>
          <Input
            type="text"
            placeholder="Filter By Session ID"
            value={filters.id || ""}
            onChange={(e) => handleFilterChange("id", e.target.value)}
            className="p-2 rounded w-full md:w-auto"
          />
        </div>
      </div>

      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              hideHeader={column.uid === "actions"}
              align={column.uid === "actions" ? "center" : "start"}
              onClick={() => handleSort(column.uid)}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={paginatedUsers}>
          {(item) => (
            <TableRow
              key={item.id}
              className="border-b border-dashed border-[#F1F1F4] dark:border-[#26272F]"
            >
              {(columnKey) => (
                <TableCell key={columnKey}>
                  <RenderCell user={item} columnKey={columnKey} />
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex justify-center items-center mt-4 space-x-4">
        <Button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </Button>
        <Pagination
          page={currentPage}
          total={totalPages}
          onChange={(page) => setCurrentPage(page)}
        />
        <Button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
