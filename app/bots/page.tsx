"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import type { RootState, AppDispatch } from "@/store/store";
import withTable from "@/components/tables/ReusableTable";
import Link from "next/link";
import { Check, Minus, X } from "lucide-react";
import { fetchBots } from "@/store/bots/BotSlice";
import DynamicFilterComponent from "@/components/Bots/BotsFilters";

const columns = [
  {
    key: "id",
    label: "ID",
    render: (row: any) => row.pk,
  },
  {
    key: "bot_ip",
    label: "BOT IP",
    render: (row: any) => row.bot_ip,
  },
  {
    key: "bot_id",
    label: "BOT ID",
    render: (row: any) => (
      <Link
        href={`/bots/${row.process_id}`}
        className="text-blue-500 underline"
      >
        {row.process_id}
      </Link>
    ),
  },
  {
    key: "bot_type",
    label: "BOT TYPE",
    render: (row: any) => row.type,
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
    key: "bot_state",
    label: "BOT STATE",
    render: (row: any) => row.state,
  },
  {
    key: "bot_data_state",
    label: "BOT DATA STATE",
    render: (row: any) => row.data_state,
  },
  {
    key: "in_campaign",
    label: "IN CAMPAIGN",
    render: (row: any) =>
      row.in_campaign ? (
        <Check className="text-green-500" />
      ) : (
        <X className="text-red-500" />
      ),
  },
  {
    key: "campaign",
    label: "CAMPAIGN",
    render: (row: any) =>
      row.campaign ? row.campaign : <Minus size={18} color="gray" />,
  },
];

const BaseTable = ({ data }: { data: any[] }) => {
  return <ReusableTable data={data} columns={columns} />;
};

const ReusableTable = withTable(BaseTable);

export default function BotsTable() {
  const dispatch = useDispatch<AppDispatch>();
  const { bots, loading, error } = useSelector(
    (state: RootState) => state.bots
  );
  const [filteredData, setFilteredData] = useState(bots);

  useEffect(() => {
    dispatch(fetchBots());
  }, [dispatch]);

  useEffect(() => {
    setFilteredData(bots);
  }, [bots]);

  if (loading) {
    return <div>Loading Bots...</div>;
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
        <DynamicFilterComponent data={bots} onFilter={setFilteredData} />
      </div>
      <div className="w-full md:w-3/4 rounded-lg">
        <ReusableTable data={filteredData} columns={columns} />
      </div>
    </div>
  );
}
