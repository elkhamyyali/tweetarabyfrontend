"use client";

import React from "react";
import TableNew from "../tweets/campaigns/TableNew";
import TableNewTwo from "../tweets/sessions/TableNew";
import TableSessions from "../tweets/sessionhandler/TableSessions";

export const Sessions = () => {
  return (
    <div className="my-14 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <h3 className="text-xl font-semibold">All Accounts</h3>

      <div className="max-w-[95rem] mx-auto w-full">
        <TableNew />
      </div>
      <div className="max-w-[95rem] mx-auto w-full mt-14">
        <TableNewTwo />
      </div>
      <div className="max-w-[95rem] mx-auto w-full mt-14">
        <TableSessions />
      </div>
    </div>
  );
};
