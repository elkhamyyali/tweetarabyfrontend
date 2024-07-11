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
  Checkbox,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { columns, initialUsers } from "./data";
import { RenderCell } from "./RenderCell";

export const Tablebots = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const rowsPerPage = 5;
  const [selectedAction, setSelectedAction] = useState("");

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

  const handleSelectAll = () => {
    if (selectedRows.length === paginatedUsers.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(paginatedUsers.map((user) => user.id));
    }
  };

  const handleDeleteSelected = () => {
    const updatedUsers = users.filter(
      (user) => !selectedRows.includes(user.id)
    );
    setUsers(updatedUsers);
    setSelectedRows([]);
  };

  const handleStateChange = (action) => {
    const updatedUsers = users.map((user) => {
      if (selectedRows.includes(user.id)) {
        return { ...user, isActive: action === "yes" ? "Yes" : "No" };
      }
      return user;
    });
    setUsers(updatedUsers);
    setSelectedRows([]);
  };

  const handleActionButtonClick = (action) => {
    setSelectedAction(action);
    if (action === "delete") {
      handleDeleteSelected();
    } else {
      handleStateChange(action);
    }
  };

  const handleDropdownAction = (action) => {
    setSelectedAction(action);
    if (action === "delete") {
      handleDeleteSelected();
    } else {
      handleStateChange(action);
    }
  };

  const filteredUsers = useMemo(() => {
    let filtered = [...users];

    // Apply filters
    Object.keys(filters).forEach((key) => {
      if (filters[key] !== undefined && filters[key] !== "") {
        filtered = filtered.filter((user) => {
          const userValue = user[key]?.toString().toLowerCase() || "";
          const filterValue = filters[key].toString().toLowerCase();
          return userValue.includes(filterValue);
        });
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

    return filtered;
  }, [searchTerm, sortConfig, filters, users]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredUsers.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredUsers, currentPage]);

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered">Actions</Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Actions">
              <DropdownItem onClick={() => handleDropdownAction("yes")}>
                Set Is Active to Yes
              </DropdownItem>
              <DropdownItem onClick={() => handleDropdownAction("no")}>
                Set Is Active to No
              </DropdownItem>
              <DropdownItem
                className="text-danger"
                color="danger"
                onClick={() => handleDropdownAction("delete")}
              >
                Delete Selected Rows
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
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
            column.uid !== "botIp" &&
            column.uid !== "botId" &&
            column.uid !== "checkBotOffline" && (
              <div
                key={column.uid}
                className="flex flex-col md:flex-row md:items-center md:space-x-4"
              >
                <label className="text-center">{column.name}</label>
                {column.uid === "inSession" ? (
                  <Input
                    type="text"
                    placeholder="Filter By Session ID"
                    value={filters.id || ""}
                    onChange={(e) => handleFilterChange("id", e.target.value)}
                    className="p-2 rounded w-full md:w-auto"
                  />
                ) : column.filterOptions ? (
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
              {column.uid === "selectAll" ? (
                <Checkbox
                  isSelected={selectedRows.length === paginatedUsers.length}
                  onChange={handleSelectAll}
                />
              ) : (
                column.name
              )}
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
                  {columnKey === "selectAll" ? (
                    <Checkbox
                      checked={selectedRows.includes(item.id)}
                      onChange={(e) => handleCheckboxChange(e, item.id)}
                    />
                  ) : columnKey === "id" ? (
                    item.id
                  ) : (
                    <RenderCell user={item} columnKey={columnKey} />
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex justify-center items-center mt-4">
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
      </div>
    </div>
  );
};
