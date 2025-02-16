"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import {
  fetchAccountGroupDetail,
  deleteAccountGroupAction,
} from "@/store/accountgroup/accountGroupDetailSlice";

const AccountGroupDetail = () => {
  const params = useParams();
  const id = params.slug;
  const router = useRouter();

  const dispatch = useDispatch();
  const { detail, loading, error } = useSelector(
    (state) => state.accountGroupDetail
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchAccountGroupDetail(id));
    }
  }, [id, dispatch]);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this account group?")) {
      await dispatch(deleteAccountGroupAction(id));
    }
  };

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
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete Account Group
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountGroupDetail;
