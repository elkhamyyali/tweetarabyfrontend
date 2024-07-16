import React, { useState, useMemo, ChangeEvent } from "react";
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

interface User {
  id: number;
  botIp: string;
  botId: string;
  checkBotOffline: string;
  botType: string;
  isActive: string;
  botDataState: string;
  inSession: string;
}

interface Filters {
  [key: string]: string | undefined;
}

interface SortConfig {
  key: string;
  direction: "ascending" | "descending" | "";
}

const Tablebots: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "",
    direction: "",
  });
  const [filters, setFilters] = useState<Filters>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const rowsPerPage: number = 5;
  const [selectedAction, setSelectedAction] = useState<string>("");

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (columnKey: string) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === columnKey && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key: columnKey, direction });
  };

  const handleFilterChange = (columnKey: string, filterValue: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [columnKey]: filterValue === "" ? undefined : filterValue,
    }));
  };

  const handleCheckboxChange = (
    event: ChangeEvent<HTMLInputElement>,
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

  const handleStateChange = (action: string) => {
    const updatedUsers = users.map((user) => {
      if (selectedRows.includes(user.id)) {
        return { ...user, isActive: action === "yes" ? "Yes" : "No" };
      }
      return user;
    });
    setUsers(updatedUsers);
    setSelectedRows([]);
  };

  const handleActionButtonClick = (action: string) => {
    setSelectedAction(action);
    if (action === "delete") {
      handleDeleteSelected();
    } else {
      handleStateChange(action);
    }
  };

  const handleDropdownAction = (action: string) => {
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
      if (
        filters[key as keyof User] !== undefined &&
        filters[key as keyof User] !== ""
      ) {
        filtered = filtered.filter((user) => {
          const userValue = (user[key as keyof User] ?? "")
            .toString()
            .toLowerCase();
          const filterValue =
            filters[key as keyof User]!.toString().toLowerCase();
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

    // Assuming SortConfig is properly defined

    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const key = sortConfig.key as keyof User; // Type assertion here
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
                className="flex flex-col md:flex-row md:items-center md:space-x-4 w-full md:w-auto"
              >
                <label className="text-center">{column.name}</label>
                {column.uid === "inSession" ? (
                  <Input
                    type="text"
                    placeholder="Filter By Session ID"
                    value={filters.id || ""}
                    onChange={(e) => handleFilterChange("id", e.target.value)}
                    className="p-2 rounded w-full"
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
                    <SelectItem key={""} value="">
                      Select {column.name}
                    </SelectItem>
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

      <div className="overflow-x-auto">
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
                      <RenderCell
                        user={item}
                        columnKey={columnKey}
                        columnData={columns}
                      />
                    )}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-end">
        <Pagination
          total={totalPages}
          initialPage={currentPage}
          onChange={(page: number) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default Tablebots;
