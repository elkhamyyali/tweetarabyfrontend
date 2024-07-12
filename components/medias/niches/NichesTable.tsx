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

interface DataItem {
  id: number;
  name: string;
}

const CheckboxTableWithDeleteButton: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
    { id: 4, name: "Item 4" },
    { id: 5, name: "Item 5" },
  ]);

  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const handleCheckboxChange = (id: number) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleSelectAllChange = () => {
    setSelectedRows(
      selectedRows.length === data.length ? [] : data.map((item) => item.id)
    );
  };

  const handleDeleteSelected = () => {
    const updatedData = data.filter((item) => !selectedRows.includes(item.id));
    setData(updatedData);
    setSelectedRows([]);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex justify-start">
        <Button
          disabled={selectedRows.length === 0}
          color="danger"
          onClick={handleDeleteSelected}
        >
          Delete Selected
        </Button>
      </div>
      <Table aria-label="Checkbox Table Example">
        <TableHeader>
          <TableColumn>
            <Checkbox
              isIndeterminate={
                selectedRows.length > 0 && selectedRows.length < data.length
              }
              checked={selectedRows.length === data.length}
              onChange={handleSelectAllChange}
            />
          </TableColumn>
          <TableColumn>ID</TableColumn>
          <TableColumn>Name</TableColumn>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Checkbox
                  checked={selectedRows.includes(item.id)}
                  onChange={() => handleCheckboxChange(item.id)}
                />
              </TableCell>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CheckboxTableWithDeleteButton;
