"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { fetchPlatformUserDetail } from "@/store/platformusers/platformUserDetailSlice";
import type { RootState } from "@/store/store";
import type { PlatformUser } from "@/types/platform-users";

const PlatformUserDetail = () => {
  const params = useParams();
  const id = params.slug;
  const dispatch = useDispatch();

  const { detail, loading, error } = useSelector((state: RootState) => {
    console.log("Current Redux State:", state.platformUserDetail);
    return state.platformUserDetail;
  });

  useEffect(() => {
    if (id) {
      console.log("Fetching user with ID:", id);
      dispatch(fetchPlatformUserDetail(id));
    }
  }, [id, dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!detail) return <div>No user found</div>;

  return (
    <div style={{ padding: "1rem" }}>
      <h1>User Details</h1>
      <div className="user-info">
        <p>
          <strong>Username:</strong> {detail.username}
        </p>
        <p>
          <strong>Name:</strong> {detail.name}
        </p>
        <p>
          <strong>Email:</strong> {detail.email}
        </p>
        <p>
          <strong>User Type:</strong> {detail.user_type}
        </p>
        <p>
          <strong>Is Active:</strong> {detail.is_active ? "Yes" : "No"}
        </p>
        <p>
          <strong>Is Staff:</strong> {detail.is_staff ? "Yes" : "No"}
        </p>
        <p>
          <strong>Is Superuser:</strong> {detail.is_superuser ? "Yes" : "No"}
        </p>
        <p>
          <strong>Is Director:</strong> {detail.is_director ? "Yes" : "No"}
        </p>
        <p>
          <strong>Last Login:</strong> {detail.last_login || "Never"}
        </p>
        <p>
          <strong>Date Joined:</strong> {detail.date_joined}
        </p>
      </div>
    </div>
  );
};

export default PlatformUserDetail;
