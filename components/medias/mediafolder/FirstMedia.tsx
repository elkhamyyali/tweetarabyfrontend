import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Checkbox,
  Button,
} from "@nextui-org/react";

const initialData = [
  { id: 1, folderName: "Folder A" },
  { id: 2, folderName: "Folder B" },
  { id: 3, folderName: "Folder C" },
  { id: 4, folderName: "Folder D" },
  { id: 5, folderName: "Folder E" },
];

const TableWithCheckboxInHeader = () => {
  const [items, setItems] = useState(initialData);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleCheckboxChange = (event, id) => {
    if (event.target.checked) {
      setSelectedRows((prevSelected) => [...prevSelected, id]);
    } else {
      setSelectedRows((prevSelected) =>
        prevSelected.filter((selectedId) => selectedId !== id)
      );
    }
  };

  const handleSelectAllChange = (event) => {
    if (event.target.checked) {
      setSelectedRows(initialData.map((item) => item.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleDeleteSelected = () => {
    const updatedData = items.filter((item) => !selectedRows.includes(item.id));
    setItems(updatedData); // Update your state with filtered data
    setSelectedRows([]);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex justify-start">
        <Button
          disabled={selectedRows.length === 0}
          onClick={handleDeleteSelected}
          color="danger"
        >
          Delete Selected
        </Button>
      </div>
      <Table aria-label="Table with checkboxes in header">
        <TableHeader>
          <TableColumn>
            <Checkbox
              checked={selectedRows.length === initialData.length}
              onChange={(e) => handleSelectAllChange(e)}
            />
          </TableColumn>
          <TableColumn>ID</TableColumn>
          <TableColumn>Folder Name</TableColumn>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Checkbox
                  checked={selectedRows.includes(item.id)}
                  onChange={(e) => handleCheckboxChange(e, item.id)}
                />
              </TableCell>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.folderName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableWithCheckboxInHeader;
