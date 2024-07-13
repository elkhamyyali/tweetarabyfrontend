import React from "react";
import { Chip } from "@nextui-org/react";

interface User {
  id: number;
  campaignName: string;
  sessionNiche: string;
  burnerBots: string;
  isActive: boolean;
  // Add other properties as needed based on your User interface
}

interface Props {
  data: User;
  columnKey: keyof User; // columnKey should be a valid key of User
}

const RenderCellNew: React.FC<Props> = ({ data, columnKey }) => {
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
