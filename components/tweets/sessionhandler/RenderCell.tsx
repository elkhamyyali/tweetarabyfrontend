import React from "react";
import { Chip } from "@nextui-org/react";

interface Props {
  data: any; // Replace 'any' with the type of your data object if possible
  columnKey: string; // Adjust the type of columnKey as needed
}

const RenderCellNew: React.FC<Props> = ({ data, columnKey }) => {
  const cellValue = data[columnKey];

  switch (columnKey) {
    case "sessionState":
      let chipColor:
        | "danger"
        | "default"
        | "primary"
        | "secondary"
        | "success"
        | "warning"
        | undefined = "primary";
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
      let chipType:
        | "danger"
        | "default"
        | "primary"
        | "secondary"
        | "success"
        | "warning"
        | undefined = "default";
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
