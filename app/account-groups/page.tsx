"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAccountGroups } from "@/store/accountgroup/accountGroupsSlice";
import type { RootState, AppDispatch } from "@/store/store";
import withTable from "@/components/tables/ReusableTable";
import Link from "next/link";
import { Chip } from "@nextui-org/react";
import DynamicFilterComponent from "@/components/accountgroup/DynamicFilterComponent";
import { X } from "lucide-react";

const columns = [
  {
    key: "name",
    label: "NAME",
    render: (row) => (
      <Link
        href={`/account-groups/${row.pk}`}
        className="text-blue-500 underline"
      >
        {row.name}
      </Link>
    ),
  },
  {
    key: "campaign",
    label: "CAMPAIGN",
    render: (row) =>
      row.campaign ? ( // Render Chip only if campaign is not null
        <Chip color={row.in_campaign ? "success" : "default"} variant="flat">
          {row.campaign}
        </Chip>
      ) : (
        <span className="text-red-400 ">
          <X />
        </span> // Show text when null
      ),
  },
  {
    key: "in_campaign",
    label: "IN CAMPAIGN",
    render: (row) => (
      <Chip color={row.in_campaign ? "success" : "danger"} variant="flat">
        {row.in_campaign ? "Yes" : "No"}
      </Chip>
    ),
  },
  { key: "group_main_type", label: "MAIN TYPE" },
  { key: "group_sub_type", label: "SUB TYPE" },
  {
    key: "group_add",
    label: "STATUS",
    render: (row) => (
      <Chip color={row.group_add ? "success" : "danger"} variant="flat">
        {row.group_add ? "Active" : "Inactive"}
      </Chip>
    ),
  },
];

const BaseTable = ({ data }) => {
  return <ReusableTable data={data} columns={columns} />;
};

const ReusableTable = withTable(BaseTable);

export default function AccountGroupsTable() {
  const dispatch = useDispatch<AppDispatch>();
  const { groups, loading, error } = useSelector(
    (state: RootState) => state.accountGroups
  );
  const [filteredData, setFilteredData] = useState(groups);

  useEffect(() => {
    dispatch(fetchAccountGroups());
  }, [dispatch]);

  useEffect(() => {
    setFilteredData(groups);
  }, [groups]);

  // Simplified filter handler - just sets the filtered data directly
  const handleFilter = (filteredResults) => {
    setFilteredData(filteredResults);
  };

  if (loading) {
    return <div>Loading account groups...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500">
        <h2>Error:</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="flex gap-4">
      {/* Filters Section */}
      <div className="w-3/4  rounded-lg ">
        <ReusableTable data={filteredData} columns={columns} />
      </div>

      {/* Table Section */}
      <div className="w-1/4">
        <DynamicFilterComponent data={groups} onFilter={handleFilter} />
      </div>
    </div>
  );
}
