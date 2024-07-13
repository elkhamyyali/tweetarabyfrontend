import React from "react";
import { Chip } from "@nextui-org/react";

// Define the User interface if not already defined
interface User {
  id: number;
  campaignName: string;
  sessionNiche: string;
  burnerBots: string;
  isActive: boolean;
  mainType: string;
  subType: string;
  limitedRepeatance: boolean;
  inSession: string;
  // Add other properties as needed
}

// Define Props interface for RenderCellNew component
interface Props {
  data: User;
  columnKey: keyof User;
}

const RenderCellNew: React.FC<Props> = ({ data, columnKey }) => {
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
      return cellValue ? <span>Yes</span> : <span>No</span>;
    case "inSession":
      return <span>{cellValue}</span>;
    default:
      // Handle other cases if necessary
      return <span>{String(cellValue)}</span>; // Convert to string if not JSX
  }
};

export default RenderCellNew;
