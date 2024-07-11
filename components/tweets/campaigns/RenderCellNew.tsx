import React from "react";
import { Chip } from "@nextui-org/react";

const RenderCellNew = ({ data, columnKey }) => {
  const cellValue = data[columnKey];

  switch (columnKey) {
    case "mainType":
      return (
        <Chip
          size="sm"
          variant="flat"
          color={
            cellValue === "Premium"
              ? "success"
              : cellValue === "Burn"
              ? "warning"
              : "default"
          }
        >
          <span className="capitalize text-xs">{cellValue}</span>
        </Chip>
      );
    case "subType":
      return (
        <Chip
          size="sm"
          variant="flat"
          color={
            cellValue === "Top"
              ? "success"
              : cellValue === "Latest"
              ? "warning"
              : "default"
          }
        >
          <span className="capitalize text-xs">{cellValue}</span>
        </Chip>
      );
    case "limitedRepeatance":
      return cellValue ? "Yes" : "No";
    case "inSession":
      return <span>{cellValue}</span>;
    default:
      return cellValue;
  }
};

export default RenderCellNew;
