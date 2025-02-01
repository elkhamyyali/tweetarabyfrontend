"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

const withTable =
  (Component) =>
  ({ data, columns }) => {
    return (
      <div className="w-full ">
        <Table aria-label="Reusable Table" selectionMode="multiple">
          <TableHeader>
            {columns.map((col) => (
              <TableColumn key={col.key}>{col.label}</TableColumn>
            ))}
          </TableHeader>
          <TableBody>
            {data.map((row) => (
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
      </div>
    );
  };

export default withTable;
