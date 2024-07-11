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
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Input,
} from "@nextui-org/react";

interface Tweet {
  id: number;
  tweetName: string;
  tweetText: string;
}

const TweetTable: React.FC = () => {
  const [tweets, setTweets] = useState<Tweet[]>([
    { id: 1, tweetName: "User1", tweetText: "This is the first tweet." },
    { id: 2, tweetName: "User2", tweetText: "This is the second tweet." },
    { id: 3, tweetName: "User3", tweetText: "This is the third tweet." },
    { id: 4, tweetName: "User4", tweetText: "This is the fourth tweet." },
    { id: 5, tweetName: "User5", tweetText: "This is the fifth tweet." },
  ]);

  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentTweet, setCurrentTweet] = useState<Tweet | null>(null);
  const [isEditModalVisible, setEditModalVisible] = useState(false);

  const handleCheckboxChange = (id: number) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((rowId) => rowId !== id)
        : [...prevSelected, id]
    );
  };

  const handleDelete = (id: number) => {
    setTweets((prevTweets) => prevTweets.filter((tweet) => tweet.id !== id));
    setSelectedRows((prevSelected) =>
      prevSelected.filter((rowId) => rowId !== id)
    );
  };

  const handleDeleteSelected = () => {
    setTweets((prevTweets) =>
      prevTweets.filter((tweet) => !selectedRows.includes(tweet.id))
    );
    setSelectedRows([]);
  };

  return (
    <div>
      <Table aria-label="Tweet Table Example">
        <TableHeader>
          <TableColumn>
            <Checkbox
              indeterminate={
                selectedRows.length > 0 && selectedRows.length < tweets.length
              }
              checked={selectedRows.length === tweets.length}
              onChange={() =>
                setSelectedRows(
                  selectedRows.length === tweets.length
                    ? []
                    : tweets.map((tweet) => tweet.id)
                )
              }
            />
          </TableColumn>
          <TableColumn>ID</TableColumn>
          <TableColumn>Tweet Name</TableColumn>
          <TableColumn>Tweet Text</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {tweets.map((tweet) => (
            <TableRow key={tweet.id}>
              <TableCell>
                <Checkbox
                  checked={selectedRows.includes(tweet.id)}
                  onChange={() => handleCheckboxChange(tweet.id)}
                />
              </TableCell>
              <TableCell>{tweet.id}</TableCell>
              <TableCell>{tweet.tweetName}</TableCell>
              <TableCell>{tweet.tweetText}</TableCell>
              <TableCell>
                <Dropdown>
                  <DropdownTrigger>
                    <Button variant="bordered">Actions</Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Actions">
                    <DropdownItem
                      key="delete"
                      className="text-danger"
                      color="danger"
                      onClick={() => handleDelete(tweet.id)}
                    >
                      Delete
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TweetTable;
