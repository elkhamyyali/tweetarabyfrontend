"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { fetchBotDetail } from "@/store/bots/BotDetailSlice";
import type { RootState } from "@/store/store";

const PlatformUserDetail = () => {
  const params = useParams();
  const id = params.slug;
  const dispatch = useDispatch();

  const { detail, loading, error } = useSelector((state: RootState) => {
    console.log("Current Redux State:", state.botDetail);
    return state.botDetail;
  });

  useEffect(() => {
    if (id) {
      console.log("Fetching user with ID:", id);
      dispatch(fetchBotDetail(id));
    }
  }, [id, dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!detail) return <div>No user found</div>;

  return (
    <div style={{ padding: "1rem" }}>
      <h1>User Details</h1>
      <div className="bot-info">
        <p>
          <strong>Bot IP:</strong> {detail.bot_ip}
        </p>
        <p>
          <strong>Process ID:</strong> {detail.process_id}
        </p>
        <p>
          <strong>Is Active:</strong> {detail.is_active ? "Yes" : "No"}
        </p>
        <p>
          <strong>Type:</strong> {detail.type}
        </p>
        <p>
          <strong>State:</strong> {detail.state}
        </p>
        <p>
          <strong>Data State:</strong> {detail.data_state}
        </p>
        <p>
          <strong>In Campaign:</strong> {detail.in_campaign ? "Yes" : "No"}
        </p>
        <p>
          <strong>Prepared for Campaign:</strong>{" "}
          {detail.prepared_campaign ? "Yes" : "No"}
        </p>
        <p>
          <strong>Campaign:</strong> {detail.campaign || "None"}
        </p>
        <p>
          <strong>Minutes Expiry:</strong> {detail.minutes_expiry ?? "N/A"}
        </p>
        <p>
          <strong>Primary Key:</strong> {detail.pk}
        </p>
        <p>
          <strong>Detail URL:</strong>{" "}
          <a href={detail.detail_url} target="_blank" rel="noopener noreferrer">
            {detail.detail_url}
          </a>
        </p>
      </div>
    </div>
  );
};

export default PlatformUserDetail;
