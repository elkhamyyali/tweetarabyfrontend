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
import { RenderCell } from "./render-cell"; // Assuming RenderCell is in RenderCell.tsx

interface User {
  id: number;
  username: string;
  accountState: string;
  isActive: string;
  accountType: string;
  inSession: string;
}

interface SortConfig {
  key: keyof User;
  direction: "ascending" | "descending";
}

export const TableWrapper = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "id",
    direction: "ascending",
  });
  const [filters, setFilters] = useState<
    Partial<Record<keyof User, string | undefined>>
  >({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage = 12;

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (columnKey: keyof User) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === columnKey && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key: columnKey, direction });
  };

  const handleFilterChange = (columnKey: keyof User, filterValue: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [columnKey]: filterValue === "" ? undefined : filterValue,
    }));
  };

  const handleInSessionFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const filterValue =
      event.target.value === "$.1"
        ? "Yes"
        : event.target.value === "$.2"
        ? "No"
        : undefined;
    setFilters((prevFilters) => ({
      ...prevFilters,
      inSession: filterValue,
    }));
  };

  const filteredUsers = useMemo(() => {
    let filtered = [...initialUsers];

    // Apply filters
    Object.keys(filters).forEach((key) => {
      const filterValue = filters[key as keyof typeof filters]
        ?.toString()
        .toLowerCase();
      if (filterValue !== undefined && filterValue !== "") {
        if (key === "inSession") {
          filtered = filtered.filter(
            (user) => user.inSession.toLowerCase() === filterValue
          );
        } else {
          filtered = filtered.filter((user) => {
            const userValue =
              user[key as keyof User]?.toString().toLowerCase() || "";
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
        const key = sortConfig.key;
        if (a[key] < b[key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }

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
      <div className="flex flex-wrap gap-4 mb-4 p-4">
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
                className="flex flex-col md:flex-row md:items-center md:space-x-4 w-full md:w-auto"
              >
                <label className="text-center">{column.name}</label>
                {column.filterOptions ? (
                  <Select
                    value={filters[column.uid as keyof User] || ""}
                    onChange={(e) =>
                      handleFilterChange(
                        column.uid as keyof User,
                        e.target.value
                      )
                    }
                    className="rounded w-full md:w-40"
                    label={column.name}
                  >
                    <SelectItem value="" key="">
                      Select {column.name}
                    </SelectItem>
                    {/* {column.filterOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))} */}
                  </Select>
                ) : (
                  <Input
                    type="text"
                    placeholder={`Filter by ${column.name}`}
                    value={filters[column.uid as keyof User] || ""}
                    onChange={(e) =>
                      handleFilterChange(
                        column.uid as keyof User,
                        e.target.value
                      )
                    }
                    className="p-2 rounded w-full md:w-auto"
                  />
                )}
              </div>
            )
        )}
        {/* Add the "In Session" filter */}
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 w-full md:w-auto">
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
            <SelectItem value="" key="">
              By In Session
            </SelectItem>
            <SelectItem value="$.1" key="">
              Yes
            </SelectItem>
            <SelectItem value="$.2" key="">
              No
            </SelectItem>
          </Select>
          <Input
            type="text"
            placeholder="Filter By Session ID"
            value={filters.id?.toString() || ""}
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
              onClick={() => handleSort(column.uid as keyof User)}
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
