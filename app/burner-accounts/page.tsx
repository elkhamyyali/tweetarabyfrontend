"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBurnerAccounts } from "@/store/burneraccount/burnerAccountSlice";
import type { RootState, AppDispatch } from "@/store/store";
import withTable from "@/components/tables/ReusableTable";
import Link from "next/link";
import { Chip } from "@nextui-org/react";
import { X } from "lucide-react";

// Define 11 columns matching the image layout.
// Adjust labels and render functions as needed.
const columns = [
  {
    key: "name",
    label: "NAME",
    render: (row) => (
      <Link
        href={`/burner-accounts/${row.pk}`}
        className="text-blue-500 underline"
      >
        {row.name}
      </Link>
    ),
  },
  {
    key: "username",
    label: "USERNAME",
    render: (row) => row.username,
  },
  {
    key: "email",
    label: "EMAIL",
    render: (row) => row.email,
  },
  {
    key: "twitter_id",
    label: "TWITTER ID",
    render: (row) => row.twitter_id,
  },
  {
    key: "phone_number",
    label: "PHONE NUMBER",
    render: (row) => row.phone_number || "-",
  },
  {
    key: "created_at",
    label: "CREATED AT",
    render: (row) => new Date(row.created_at).toLocaleString(),
  },
  {
    key: "is_active",
    label: "STATUS",
    render: (row) => (
      <Chip color={row.is_active ? "success" : "danger"} variant="flat">
        {row.is_active ? "Active" : "Inactive"}
      </Chip>
    ),
  },
  {
    key: "campaign_state",
    label: "CAMPAIGN STATE",
    render: (row) => row.campaign_state,
  },
  {
    key: "account_type",
    label: "ACCOUNT TYPE",
    render: (row) => row.account_type,
  },
  {
    key: "category",
    label: "CATEGORY",
    render: (row) => row.category,
  },
  {
    key: "is_blue_verified",
    label: "VERIFIED",
    render: (row) =>
      row.is_blue_verified ? (
        <Chip color="success" variant="flat">
          Yes
        </Chip>
      ) : (
        <Chip color="default" variant="flat">
          No
        </Chip>
      ),
  },
];

const BaseTable = ({ data }: { data: any[] }) => {
  return <ReusableTable data={data} columns={columns} />;
};

const ReusableTable = withTable(BaseTable);

export default function BurnerAccountTable() {
  const dispatch = useDispatch<AppDispatch>();
  const { groups, loading, error } = useSelector(
    (state: RootState) => state.burnerAccounts
  );
  const [filteredData, setFilteredData] = useState(groups);

  useEffect(() => {
    dispatch(fetchBurnerAccounts());
  }, [dispatch]);

  useEffect(() => {
    setFilteredData(groups);
  }, [groups]);

  if (loading) {
    return <div>Loading burner accounts...</div>;
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
      {/* Table Section */}
      <div className="w-full rounded-lg">
        <ReusableTable data={filteredData} columns={columns} />
      </div>
      {/* Uncomment below if you want to add a dynamic filter component */}
      {/*
      <div className="w-1/4">
        <DynamicFilterComponent data={groups} onFilter={setFilteredData} />
      </div>
      */}
    </div>
  );
}
