"use client";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

import TableWithCheckbox from "../medias/mediafolder/FirstMedia";
import CheckboxTable from "../medias/niches/NichesTable";
import TweetTable from "../medias/tweets/TweetsTable";
import DataTable from "../medias/tweetsformulas/Formula";
import TableExample from "../medias/words/WordText";
// import UploadForm from "../medias/words/UploadForm";

export const Media = () => {
  return (
    <div className="my-14 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <h3 className="text-xl font-semibold">All Accounts</h3>
      {/* <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
          <Input
            classNames={{
              input: "w-full",e
              mainWrapper: "w-full",
            }}
            placeholder="Search users"
          />
          <SettingsIcon />
          <TrashIcon />
          <InfoIcon />
          <DotsIcon />
        </div>
        <div className="flex flex-row gap-3.5 flex-wrap">
          <Button color="primary" startContent={<ExportIcon />}>
            Export to CSV
          </Button>
        </div>
      </div> */}
      <div className="max-w-[95rem] mx-auto w-full">
        <TableWithCheckbox />
      </div>
      <div className="max-w-[95rem] mx-auto w-full">
        <CheckboxTable />
      </div>
      <div className="max-w-[95rem] mx-auto w-full">
        <TweetTable />
      </div>
      <div className="max-w-[95rem] mx-auto w-full">
        <DataTable />
      </div>
      <div className="max-w-[95rem] mx-auto w-full">
        <TableExample />
      </div>
      <div className="max-w-[95rem] mx-auto w-full">{/* <UploadForm /> */}</div>
    </div>
  );
};
