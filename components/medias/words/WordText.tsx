import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Button,
  Checkbox,
  Dropdown,
  DropdownItem,
} from "@nextui-org/react";

const initialData = [
  { id: 1, wordText: "Word 1" },
  { id: 2, wordText: "Word 2" },
  { id: 3, wordText: "Word 3" },
  { id: 4, wordText: "Word 4" },
  { id: 5, wordText: "Word 5" },
];

const TableExample = () => {
  const [items, setItems] = useState(initialData);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [filter, setFilter] = useState("");

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    if (event.target.checked) {
      setSelectedRows((prevSelected) => [...prevSelected, id]);
    } else {
      setSelectedRows((prevSelected) =>
        prevSelected.filter((selectedId) => selectedId !== id)
      );
    }
  };

  const handleSelectAllChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const isChecked = event.target.checked;
    setSelectAllChecked(isChecked);
    if (isChecked) {
      const allIds = items.map((item) => item.id);
      setSelectedRows(allIds);
    } else {
      setSelectedRows([]);
    }
  };

  const handleDeleteSelected = () => {
    const updatedItems = items.filter(
      (item) => !selectedRows.includes(item.id)
    );
    setItems(updatedItems);
    setSelectedRows([]);
    setSelectAllChecked(false);
  };

  const filteredItems = useMemo(() => {
    if (!filter) return items;
    return items.filter((item) =>
      item.wordText.toLowerCase().includes(filter.toLowerCase())
    );
  }, [items, filter]);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex justify-start mt-4">
        <Button
          disabled={selectedRows.length === 0}
          color="danger"
          onClick={handleDeleteSelected}
          className="md:p-2 ml-3"
        >
          Delete Selected
        </Button>
      </div>

      <Table
        aria-label="Example table with custom cells"
        className="p-5 md:p-0"
      >
        <TableHeader>
          <TableColumn>
            <Checkbox
              checked={selectAllChecked}
              onChange={handleSelectAllChange}
            />
          </TableColumn>
          <TableColumn>ID</TableColumn>
          <TableColumn>Word Text</TableColumn>
        </TableHeader>
        <TableBody>
          {filteredItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Checkbox
                  checked={selectedRows.includes(item.id)}
                  onChange={(e) => handleCheckboxChange(e, item.id)}
                />
              </TableCell>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.wordText}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableExample;
