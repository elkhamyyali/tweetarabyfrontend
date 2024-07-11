import React from "react";
import { Tooltip, Chip } from "@nextui-org/react";

interface Props {
  user: any; // Adjust type as per your data structure
  columnKey: string | React.Key;
}

export const RenderCell = ({ user, columnKey }: Props) => {
  const cellValue = user[columnKey];

  switch (columnKey) {
    case "username":
      return (
        <div>
          <span>{cellValue}</span>
        </div>
      );
    case "accountState":
      let chipColorClass = "bg-gray-100 text-gray-600"; // Default Tailwind classes
      switch (cellValue) {
        case "New":
          chipColorClass = "bg-green-100 text-green-600";
          break;
        case "Checked":
          chipColorClass = "bg-yellow-100 text-yellow-600";
          break;
        case "To Check":
          chipColorClass = "bg-blue-100 text-blue-600";
          break;
        case "Old":
          chipColorClass = "bg-gray-100 text-gray-600";
          break;
        case "BackUse":
          chipColorClass = "bg-yellow-200 text-yellow-900";
          break;
        case "In Session":
          chipColorClass = "bg-purple-100 text-purple-600";
          break;
        case "Used Recheck":
          chipColorClass = "bg-blue-100 text-blue-600";
          break;
        case "Recheck":
          chipColorClass = "bg-orange-100 text-orange-600";
          break;
        case "Wrong Auth":
          chipColorClass = "bg-red-100 text-red-600";
          break;
        case "Suspended":
          chipColorClass = "bg-brown-100 text-brown-600";
          break;
        default:
          chipColorClass = "bg-gray-100 text-gray-600";
          break;
      }
      return (
        <Chip
          size="sm"
          variant="flat"
          className={`${chipColorClass} capitalize text-xs`}
        >
          <span>{cellValue}</span>
        </Chip>
      );
    case "isActive":
      const isActiveColorClass =
        cellValue === "Yes"
          ? "bg-green-100 text-green-600"
          : "bg-red-100 text-red-600";
      return (
        <Chip
          size="sm"
          variant="flat"
          className={`${isActiveColorClass} capitalize text-xs`}
        >
          <span>{cellValue}</span>
        </Chip>
      );
    case "accountType":
      return <div>{cellValue}</div>;
    case "actions":
      return (
        <div className="flex items-center gap-4">
          <Tooltip content="Details">
            <button onClick={() => console.log("View user", user.id)}>
              View
            </button>
          </Tooltip>
          <Tooltip content="Edit user">
            <button onClick={() => console.log("Edit user", user.id)}>
              Edit
            </button>
          </Tooltip>
          <Tooltip content="Delete user">
            <button onClick={() => console.log("Delete user", user.id)}>
              Delete
            </button>
          </Tooltip>
        </div>
      );
    default:
      return cellValue;
  }
};
