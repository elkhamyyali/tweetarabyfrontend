import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Select,
  SelectItem,
  Button,
  Input,
  Pagination,
  Checkbox,
} from "@nextui-org/react";
import { columns, initialData } from "./dataNew";
import RenderCellNew from "./RenderCellNew";

// Define the User interface
interface User {
  id: number;
  campaignName: string;
  sessionNiche: string;
  burnerBots: string;
  isActive: boolean;
  mainType: string;
  subType: string;
  limitedRepeatance: boolean;
  inSession: string;
}

const TableNew: React.FC = () => {
  const [data, setData] = useState<User[]>(initialData);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof User | "";
    direction: string;
  }>({
    key: "",
    direction: "",
  });
  const [filters, setFilters] = useState<{
    isActive?: string;
    mainType?: string;
    subType?: string;
  }>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectAllChecked, setSelectAllChecked] = useState<boolean>(false);

  const rowsPerPage: number = 5;

  // Handle search input change
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Handle sorting by column
  const handleSort = (columnKey: keyof User | "") => {
    let direction = "ascending";
    if (sortConfig.key === columnKey && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key: columnKey, direction });
  };

  // Handle filter change for isActive, mainType, and subType
  const handleFilterChange = (columnKey: keyof User, filterValue: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [columnKey]: filterValue === "" ? undefined : filterValue,
    }));
  };

  // Handle checkbox change for selecting rows
  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    itemId: number
  ) => {
    if (event.target.checked) {
      setSelectedRows((prevSelected) => [...prevSelected, itemId]);
    } else {
      setSelectedRows((prevSelected) =>
        prevSelected.filter((id) => id !== itemId)
      );
    }
  };

  // Handle select all checkbox change
  const handleSelectAllChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectAllChecked(event.target.checked);
    if (event.target.checked) {
      const allIds = data.map((item) => item.id);
      setSelectedRows(allIds);
    } else {
      setSelectedRows([]);
    }
  };

  // Handle delete selected rows
  const handleDeleteSelected = () => {
    const updatedData = data.filter((item) => !selectedRows.includes(item.id));
    setData(updatedData);
    setSelectedRows([]);
    setSelectAllChecked(false);
  };

  // Memoized filtered and paginated data
  const filteredData = useMemo(() => {
    let filtered = [...data];

    // Apply filters
    Object.keys(filters).forEach((key) => {
      const filterKey = key as keyof typeof filters;
      if (filters[filterKey] !== undefined && filters[filterKey] !== "") {
        if (filterKey === "isActive") {
          const isActiveFilter = filters[filterKey] === "Yes";
          filtered = filtered.filter(
            (item) => item[filterKey] === isActiveFilter
          );
        } else {
          filtered = filtered.filter((item) =>
            item[filterKey]
              ?.toLowerCase()
              .includes(filters[filterKey]?.toLowerCase() || "")
          );
        }
      }
    });

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter((item) =>
        Object.values(item).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply sorting
    if (sortConfig.key !== "") {
      filtered.sort((a, b) => {
        const key = sortConfig.key as keyof User;
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
  }, [searchTerm, sortConfig, filters, data]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-wrap gap-4 mb-4 justify-center">
        <Input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 rounded w-full md:w-auto"
        />
        {columns.map((column) => (
          <div
            key={column.uid}
            className="flex flex-col w-full md:w-auto items-center"
          >
            {(column.uid === "isActive" ||
              column.uid === "mainType" ||
              column.uid === "subType") && (
              <Select
                value={filters[column.uid] || ""}
                onChange={(e) =>
                  handleFilterChange(column.uid as keyof User, e.target.value)
                }
                className="rounded w-2/3 md:w-40"
                label={column.name}
              >
                <SelectItem key="" value="">
                  Select {column.name}
                </SelectItem>
                {column.filterOptions?.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </Select>
            )}
          </div>
        ))}
      </div>

      <Table
        aria-label="Example table with custom cells"
        className="p-5 md:p-0"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              hideHeader={column.uid === "actions"}
              align={column.uid === "actions" ? "center" : "start"}
              onClick={() => handleSort(column.uid as keyof User)}
            >
              {column.name === "" ? (
                <Checkbox
                  checked={selectAllChecked}
                  onChange={handleSelectAllChange}
                />
              ) : (
                column.name
              )}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={paginatedData}>
          {(item) => (
            <TableRow
              key={item.id}
              className="border-b border-dashed border-[#F1F1F4] dark:border-[#26272F]"
            >
              {(columnKey) => (
                <TableCell key={columnKey}>
                  {columnKey === "id" ? (
                    item.id // Display ID directly
                  ) : columnKey === "selectAll" ? (
                    <Checkbox
                      checked={selectedRows.includes(item.id)}
                      onChange={(e) => handleCheckboxChange(e, item.id)}
                    />
                  ) : (
                    <RenderCellNew
                      data={item}
                      columnKey={columnKey as keyof User}
                    />
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-4">
        <div className="flex justify-center items-center space-x-4">
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
        <Button
          disabled={selectedRows.length === 0}
          onClick={handleDeleteSelected}
        >
          Delete Selected
        </Button>
      </div>
    </div>
  );
};

export default TableNew;
