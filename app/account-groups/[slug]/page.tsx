"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "next/navigation"; // Use next/navigation for getting route params
import { fetchAccountGroupDetail } from "@/store/accountgroup/accountGroupDetailSlice";

const AccountGroupDetail = () => {
  // Get dynamic route parameter `slug`
  const params = useParams();
  const id = params.slug; // Use the 'slug' param from the URL

  const dispatch = useDispatch();
  const { detail, loading, error } = useSelector(
    (state) => state.accountGroupDetail
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchAccountGroupDetail(id));
    }
  }, [id, dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Account Group Detail</h1>
      {detail && (
        <div>
          <p>Name: {detail.name}</p>
          <p>Campaign: {detail.campaign}</p>
          <p>Group Type: {detail.group_main_type}</p>
          <p>Sub Type: {detail.group_sub_type}</p>
          {/* Render other details as needed */}
        </div>
      )}
    </div>
  );
};

export default AccountGroupDetail;
