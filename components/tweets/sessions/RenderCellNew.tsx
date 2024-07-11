// RenderCellNew.tsx
import React from "react";
import { Chip } from "@nextui-org/react";

const RenderCellNew = ({ data, columnKey }) => {
  const cellValue = data[columnKey];

  switch (columnKey) {
    case "isActive":
      return (
        <Chip size="sm" color={cellValue ? "success" : "danger"} variant="flat">
          {cellValue ? "Yes" : "No"}
        </Chip>
      );
    default:
      return <span>{cellValue}</span>;
  }
};

export default RenderCellNew;
