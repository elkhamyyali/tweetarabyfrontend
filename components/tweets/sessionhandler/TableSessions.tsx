import React, { useState, useMemo, ChangeEvent } from "react";
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
import { columns, initialSessions } from "./data";
import RenderCellNew from "./RenderCell";

// Define types
type Filters = {
  [key: string]: string | undefined;
};

type SortConfig = {
  key: string;
  direction: "ascending" | "descending" | "";
};

type Session = {
  id: number;
  [key: string]: string | number | boolean;
};

const TableSessions: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>(initialSessions);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "",
    direction: "",
  });
  const [filters, setFilters] = useState<Filters>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectAllChecked, setSelectAllChecked] = useState<boolean>(false);

  const rowsPerPage: number = 5;

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
    id: number
  ) => {
    if (event.target) {
      const isChecked: boolean = event.target.checked;
      if (isChecked) {
        setSelectedRows((prevSelected) => [...prevSelected, id]);
      } else {
        setSelectedRows((prevSelected) =>
          prevSelected.filter((selectedId) => selectedId !== id)
        );
      }
    }
  };

  const handleSelectAllChange = (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked: boolean = event.target.checked;
    setSelectAllChecked(isChecked);
    if (isChecked) {
      const allIds: number[] = sessions.map((session) => session.id);
      setSelectedRows(allIds);
    } else {
      setSelectedRows([]);
    }
  };

  const handleDeleteSelected = () => {
    const updatedSessions: Session[] = sessions.filter(
      (session) => !selectedRows.includes(session.id)
    );
    setSessions(updatedSessions);
    setSelectedRows([]);
    setSelectAllChecked(false);
  };

  const filteredSessions: Session[] = useMemo(() => {
    let filtered: Session[] = [...sessions];

    // Apply filters
    Object.keys(filters).forEach((key) => {
      if (key === "sessionState" || key === "sessionType") {
        if (filters[key] !== undefined && filters[key] !== "") {
          filtered = filtered.filter(
            (session) => session[key] === filters[key]
          );
        }
      } else if (key === "isActive") {
        if (filters[key] === "Yes") {
          filtered = filtered.filter((session) => session[key]);
        } else if (filters[key] === "No") {
          filtered = filtered.filter((session) => !session[key]);
        }
      } else if (filters[key] !== undefined && filters[key] !== "") {
        filtered = filtered.filter((session) => {
          const sessionValue: string =
            session[key]?.toString().toLowerCase() || "";
          const filterValue: string =
            filters[key]?.toString().toLowerCase() || "";
          return sessionValue.includes(filterValue);
        });
      }
    });

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter((session) =>
        session.id.toString().toLowerCase().includes(searchTerm.toLowerCase())
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
  }, [searchTerm, sortConfig, filters, sessions]);

  const paginatedSessions: Session[] = useMemo(() => {
    const startIndex: number = (currentPage - 1) * rowsPerPage;
    const endIndex: number = startIndex + rowsPerPage;
    return filteredSessions.slice(startIndex, endIndex);
  }, [filteredSessions, currentPage]);

  const totalPages: number = Math.ceil(filteredSessions.length / rowsPerPage);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-wrap gap-4 mb-4 justify-center">
        <Input
          type="text"
          placeholder="Search by Session ID..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 rounded w-full md:w-auto"
        />
        {columns.map(
          (column) =>
            column.uid !== "checkbox" && (
              <div
                key={column.uid}
                className="flex flex-col w-full md:w-auto items-center"
              >
                {column.uid === "isActive" ||
                column.uid === "sessionState" ||
                column.uid === "sessionType" ? (
                  <Select
                    value={filters[column.uid] || ""}
                    onChange={(e) =>
                      handleFilterChange(column.uid, e.target.value)
                    }
                    className="rounded w-2/3 md:w-40" // Adjust width for mobile and desktop
                    label={column.name}
                  >
                    <SelectItem value="" key={""}>
                      Select {column.name}
                    </SelectItem>
                    {column.filterOptions?.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </Select>
                ) : null}
              </div>
            )
        )}
      </div>

      <Table
        aria-label="Sessions table with custom cells"
        className="p-5 md:p-0"
      >
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
                  checked={selectAllChecked}
                  onChange={handleSelectAllChange}
                />
              ) : (
                column.name
              )}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={paginatedSessions}>
          {(session) => (
            <TableRow
              key={session.id}
              className="border-b border-dashed border-[#F1F1F4] dark:border-[#26272F]"
            >
              {columns.map((column) => (
                <TableCell key={column.uid}>
                  {column.uid === "selectAll" ? (
                    <Checkbox
                      checked={selectedRows.includes(session.id)}
                      onChange={(e) => handleCheckboxChange(e, session.id)}
                    />
                  ) : (
                    <RenderCellNew data={session} columnKey={column.uid} />
                  )}
                </TableCell>
              ))}
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

export default TableSessions;
