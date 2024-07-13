import React from "react";
import { Tooltip, Chip } from "@nextui-org/react";
import { DeleteIcon } from "../icons/table/delete-icon";
import { EditIcon } from "../icons/table/edit-icon";
import { EyeIcon } from "../icons/table/eye-icon";
interface Column {
  uid: string;
  name: string;
  filterOptions?: string[];
}

interface Props {
  user: Record<string, any>;
  columnKey: string | number;
  columnData: Column[];
}

export const RenderCell: React.FC<Props> = ({
  user,
  columnKey,
  columnData,
}) => {
  const cellValue = user[columnKey];

  switch (columnKey) {
    case "botType":
      return (
        <Chip
          size="sm"
          variant="flat"
          color={
            cellValue === "Auto"
              ? "success"
              : cellValue === "Burn"
              ? "warning"
              : "default"
          }
        >
          <span className="capitalize text-xs">{cellValue}</span>
        </Chip>
      );
    case "isActive":
      return (
        <Chip
          size="sm"
          variant="flat"
          color={cellValue === "Yes" ? "success" : "danger"}
        >
          <span className="capitalize text-xs">{cellValue}</span>
        </Chip>
      );
    case "botDataState":
      return (
        <Chip
          size="sm"
          variant="flat"
          color={
            cellValue === "Online"
              ? "success"
              : cellValue === "Busy"
              ? "warning"
              : "danger"
          }
        >
          <span className="capitalize text-xs">{cellValue}</span>
        </Chip>
      );
    case "inSession":
      return (
        <div>
          <span>{cellValue}</span>
        </div>
      );
    case "actions":
      return (
        <div className="flex items-center gap-4">
          <Tooltip content="Details">
            <button onClick={() => console.log("View user", user.id)}>
              <EyeIcon size={20} fill="#979797" />
            </button>
          </Tooltip>
          <Tooltip content="Edit user" color="secondary">
            <button onClick={() => console.log("Edit user", user.id)}>
              <EditIcon size={20} fill="#979797" />
            </button>
          </Tooltip>
          <Tooltip content="Delete user" color="danger">
            <button onClick={() => console.log("Delete user", user.id)}>
              <DeleteIcon size={20} fill="#FF0080" />
            </button>
          </Tooltip>
        </div>
      );
    default:
      return <span>{cellValue}</span>;
  }
};
