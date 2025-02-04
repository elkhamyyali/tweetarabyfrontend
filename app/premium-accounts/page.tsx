"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPremiumAccounts } from "@/store/premiumaccount/premiumAccountSlice";
import type { RootState, AppDispatch } from "@/store/store";
import withTable from "@/components/tables/ReusableTable";
import Link from "next/link";
import { Chip } from "@nextui-org/react";
import { X } from "lucide-react";
import DynamicFilterComponent from "@/components/burneraccount/DynamicFilterComponent";
const stateClassMap = {
  All: {
    base: "bg-gray-300 border-gray-400 shadow-gray-400/30",
    content: "text-black",
  },
  new: {
    base: "bg-[#E1F0FF] border-blue-600 shadow-blue-500/30",
    content: "text-[#3B99FF]",
  },
  to_check: {
    base: "bg-yellow-500 border-yellow-600 shadow-yellow-500/30",
    content: "text-black",
  },
  checked: {
    base: "bg-[#CBEEDA] border-green-600 shadow-green-500/30",
    content: "text-green-500",
  },
  Old: {
    base: "bg-purple-500 border-purple-600 shadow-purple-500/30",
    content: "text-white",
  },
  backuse: {
    base: "bg-purple-400 border-purple-500 shadow-purple-400/30",
    content: "text-white",
  },
  in_session: {
    base: "bg-green-600 border-green-700 shadow-green-600/30",
    content: "text-white",
  },
  used_recheck: {
    base: "bg-orange-500 border-orange-600 shadow-orange-500/30",
    content: "text-white",
  },
  recheck: {
    base: "bg-[#FDEDD3] border-yellow-700 shadow-yellow-600/30",
    content: "text-[#F5A524]",
  },
  wrong_auth: {
    base: "bg-[#ffe2e5] border-red-600 shadow-red-500/30",
    content: "text-[#f75e98]",
  },
  capatcha_mail: {
    base: "bg-red-700 border-red-800 shadow-red-700/30",
    content: "text-white",
  },
  suspended: {
    base: "bg-gray-600 border-gray-700 shadow-gray-600/30",
    content: "text-white",
  },
};

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
    label: "ACCOUNT STATE",
    render: (row) => {
      const stateClasses = stateClassMap[row.state] || stateClassMap.All;

      return (
        <Chip
          classNames={{
            base: stateClasses.base,
            content: stateClasses.content,
          }}
        >
          {row.state || "Unknown"}
        </Chip>
      );
    },
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
    dispatch(fetchPremiumAccounts());
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
    <div className="flex flex-col-reverse lg:flex-row-reverse gap-4">
      {/* Filters Section (Above on Mobile, Left on Larger Screens) */}
      <div className="w-full md:w-1/4 order-1 md:order-none">
        <DynamicFilterComponent data={groups} onFilter={setFilteredData} />
      </div>

      {/* Table Section */}
      <div className="w-full md:w-3/4 rounded-lg">
        <ReusableTable data={filteredData} columns={columns} />
      </div>
    </div>
  );
}
