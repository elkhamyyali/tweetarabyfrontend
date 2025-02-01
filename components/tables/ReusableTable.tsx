"use client";

import React, { useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@nextui-org/react";

const withTable =
  (Component) =>
  ({ data, columns }) => {
    const [page, setPage] = useState(1);
    const rowsPerPage = 10;
    const totalPages = Math.ceil(data.length / rowsPerPage);

    // Paginate the data
    const paginatedData = useMemo(() => {
      const start = (page - 1) * rowsPerPage;
      return data.slice(start, start + rowsPerPage);
    }, [page, data]);

    return (
      <div className="w-full">
        <Table aria-label="Reusable Table" selectionMode="multiple">
          <TableHeader>
            {columns.map((col) => (
              <TableColumn key={col.key}>{col.label}</TableColumn>
            ))}
          </TableHeader>
          <TableBody>
            {paginatedData.map((row) => (
              <TableRow key={row.pk}>
                {columns.map((col) => (
                  <TableCell key={col.key}>
                    {col.render ? col.render(row) : row[col.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-4">
          <Pagination
            total={totalPages}
            page={page}
            onChange={setPage}
            color="primary"
            showControls
          />
        </div>
      </div>
    );
  };

export default withTable;
