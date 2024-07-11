// TableNew.tsx
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
  Checkbox,
  Input,
  Pagination,
} from "@nextui-org/react";
import { columns, initialData } from "./dataNew";
import RenderCellNew from "./RenderCellNew";

const TableNew = () => {
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  const rowsPerPage = 5;

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

  const handleCheckboxChange = (event, itemId) => {
    if (event.target.checked) {
      setSelectedRows((prevSelected) => [...prevSelected, itemId]);
    } else {
      setSelectedRows((prevSelected) =>
        prevSelected.filter((id) => id !== itemId)
      );
    }
  };

  const handleSelectAllChange = (event) => {
    setSelectAllChecked(event.target.checked);
    if (event.target.checked) {
      const allIds = data.map((item) => item.id);
      setSelectedRows(allIds);
    } else {
      setSelectedRows([]);
    }
  };

  const handleDeleteSelected = () => {
    const updatedData = data.filter((item) => !selectedRows.includes(item.id));
    setData(updatedData);
    setSelectedRows([]);
    setSelectAllChecked(false);
  };

  const filteredData = useMemo(() => {
    let filtered = [...data];

    // Apply filters
    Object.keys(filters).forEach((key) => {
      if (key === "isActive") {
        if (filters[key] === "Yes") {
          filtered = filtered.filter((item) => item[key]);
        } else if (filters[key] === "No") {
          filtered = filtered.filter((item) => !item[key]);
        }
      } else if (filters[key] !== undefined && filters[key] !== "") {
        filtered = filtered.filter((item) => {
          const itemValue = item[key]?.toString().toLowerCase() || "";
          const filterValue = filters[key].toString().toLowerCase();
          return itemValue.includes(filterValue);
        });
      }
    });

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter((item) =>
        Object.values(item).some((value) =>
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

    return filtered;
  }, [searchTerm, sortConfig, filters, data]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

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
            column.uid !== "id" && (
              <div
                key={column.uid}
                className="flex flex-col md:flex-row md:items-center md:space-x-4"
              >
                {column.uid === "isActive" ? (
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
                  ""
                )}
              </div>
            )
        )}
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
                    <RenderCellNew data={item} columnKey={columnKey} />
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex justify-between items-center mt-4">
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
