import React from "react";
import { Chip } from "@nextui-org/react";

const RenderCellNew = ({ data, columnKey }) => {
  const cellValue = data[columnKey];

  switch (columnKey) {
    case "sessionState":
      let chipColor = "primary";
      switch (cellValue) {
        case "Pending":
          chipColor = "warning";
          break;
        case "Start":
        case "Started":
          chipColor = "success";
          break;
        case "Stop":
          chipColor = "danger";
          break;
        case "Finished":
          chipColor = "secondary";
          break;
        default:
          chipColor = "default";
          break;
      }
      return (
        <Chip size="sm" color={chipColor} variant="flat">
          {cellValue}
        </Chip>
      );

    case "sessionType":
      let chipType = "default";
      switch (cellValue) {
        case "Burn":
          chipType = "warning";
          break;
        case "Premium":
          chipType = "success";
          break;
        default:
          chipType = "primary";
          break;
      }
      return (
        <Chip size="sm" color={chipType} variant="flat">
          {cellValue}
        </Chip>
      );

    default:
      return <span>{cellValue}</span>;
  }
};

export default RenderCellNew;
