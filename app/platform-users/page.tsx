"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPlatformUsers } from "@/store/platformusers/platformUserSlice";
import type { RootState, AppDispatch } from "@/store/store";
import withTable from "@/components/tables/ReusableTable";
import Link from "next/link";
import { Check, X } from "lucide-react";
import DynamicFilterComponent from "@/components/platform-users/PlatformFilter";

const columns = [
  {
    key: "username",
    label: "USERNAME",
    render: (row: any) => (
      <Link
        href={`/platform-users/${row.pk}`}
        className="text-blue-500 underline"
      >
        {row.username}
      </Link>
    ),
  },
  {
    key: "user_type",
    label: "USER TYPE",
    render: (row: any) => row.user_type,
  },
  {
    key: "is_active",
    label: "IS ACTIVE",
    render: (row: any) =>
      row.is_active ? (
        <Check className="text-green-500" />
      ) : (
        <X className="text-red-500" />
      ),
  },
  {
    key: "is_director",
    label: "IS DIRECTOR",
    render: (row: any) =>
      row.is_director ? (
        <Check className="text-green-500" />
      ) : (
        <X className="text-red-500" />
      ),
  },
];

const BaseTable = ({ data }: { data: any[] }) => {
  return <ReusableTable data={data} columns={columns} />;
};

const ReusableTable = withTable(BaseTable);

export default function PlatformUsersTable() {
  const dispatch = useDispatch<AppDispatch>();
  const { groups, loading, error } = useSelector(
    (state: RootState) => state.platformUsers
  );
  const [filteredData, setFilteredData] = useState(groups);

  useEffect(() => {
    dispatch(fetchPlatformUsers());
  }, [dispatch]);

  useEffect(() => {
    setFilteredData(groups);
  }, [groups]);

  if (loading) {
    return <div>Loading Platform Users...</div>;
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
    <div className="flex flex-col-reverse lg:flex-row-reverse gap-4">
      <div className="w-full md:w-1/4 order-1 md:order-none">
        <DynamicFilterComponent data={groups} onFilter={setFilteredData} />
      </div>
      <div className="w-full md:w-3/4 rounded-lg">
        <ReusableTable data={filteredData} columns={columns} />
      </div>
    </div>
  );
}
