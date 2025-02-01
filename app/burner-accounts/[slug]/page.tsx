"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { fetchBurnerAccountDetail } from "@/store/burneraccount/burnerAccountDetailSlice";
import { BurnerAccount } from "@/types/burner-account";

const BurnerAccountDetail = () => {
  // Get dynamic route parameter `slug`
  const params = useParams();
  const id = params.slug; // Use the 'slug' param from the URL

  const dispatch = useDispatch();
  const { detail, loading, error } = useSelector(
    (state: any) => state.burnerAccountDetail
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchBurnerAccountDetail(id));
    }
  }, [id, dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Cast the detail as BurnerAccount for type safety
  const account = detail as BurnerAccount;

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Burner Account Detail</h1>
      {account && (
        <div style={{ lineHeight: 1.6 }}>
          <h2>Basic Information</h2>
          <p>
            <strong>PK:</strong> {account.pk}
          </p>
          <p>
            <strong>Name:</strong> {account.name}
          </p>
          <p>
            <strong>Username:</strong> {account.username}
          </p>
          <p>
            <strong>Password:</strong> {account.password}
          </p>
          <p>
            <strong>Email:</strong> {account.email}
          </p>
          <p>
            <strong>Email Password:</strong> {account.email_password}
          </p>
          <p>
            <strong>Auth Token:</strong> {account.auth_token}
          </p>
          {/* <p>
            <strong>CT0:</strong> {account.ct0}
          </p> */}
          <p>
            <strong>Twitter ID:</strong> {account.twitter_id}
          </p>
          <p>
            <strong>Twitter String ID:</strong> {account.twitter_str_id}
          </p>
          <p>
            <strong>Phone Number:</strong> {account.phone_number || "N/A"}
          </p>
          <p>
            <strong>OTP Secret Key:</strong> {account.otp_secret_key}
          </p>
          <p>
            <strong>OTP Recovery Key:</strong>{" "}
            {account.otp_recovery_key || "N/A"}
          </p>

          <h2>Cookies</h2>
          {/* <p>
            <strong>att:</strong> {account.cookies.att}
          </p>
          <p>
            <strong>ct0:</strong> {account.cookies.ct0}
          </p>
          <p>
            <strong>kdt:</strong> {account.cookies.kdt}
          </p> */}
          <p>
            <strong>auth_token:</strong> {account.cookies.auth_token}
          </p>
          {/* <p>
            <strong>_twitter_sess:</strong> {account.cookies._twitter_sess}
          </p> */}

          <h2>Birthdate & Visibility</h2>
          <p>
            <strong>Birthdate Day:</strong> {account.birthdate_day}
          </p>
          <p>
            <strong>Birthdate Month:</strong> {account.birthdate_month}
          </p>
          <p>
            <strong>Birthdate Year:</strong> {account.birthdate_year}
          </p>
          <p>
            <strong>Birthdate Visibility:</strong>{" "}
            {account.birthdate_visibility}
          </p>
          <p>
            <strong>Birthdate Year Visibility:</strong>{" "}
            {account.birthdate_year_visibility}
          </p>

          <h2>Social & Account Metrics</h2>
          <p>
            <strong>Followers:</strong> {account.followers}
          </p>
          <p>
            <strong>Following:</strong> {account.following}
          </p>
          <p>
            <strong>Statuses Count:</strong> {account.statuses_count}
          </p>
          <p>
            <strong>Fast Followers Count:</strong>{" "}
            {account.fast_followers_count}
          </p>
          <p>
            <strong>Normal Followers Count:</strong>{" "}
            {account.normal_followers_count}
          </p>
          <p>
            <strong>Has Graduated Access:</strong>{" "}
            {account.has_graduated_access ? "Yes" : "No"}
          </p>
          <p>
            <strong>Want Retweets:</strong>{" "}
            {account.want_retweets ? "Yes" : "No"}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(account.created_at).toLocaleString()}
          </p>
          <p>
            <strong>Is Blue Verified:</strong>{" "}
            {account.is_blue_verified ? "Yes" : "No"}
          </p>
          <p>
            <strong>Blocked By:</strong> {account.blocked_by ? "Yes" : "No"}
          </p>
          <p>
            <strong>Possibly Sensitive:</strong>{" "}
            {account.possibly_sensitive ? "Yes" : "No"}
          </p>
          <p>
            <strong>Withheld In Countries:</strong>{" "}
            {account.withheld_in_countries}
          </p>
          <p>
            <strong>Needs Phone Verification:</strong>{" "}
            {account.needs_phone_verification ? "Yes" : "No"}
          </p>
          <p>
            <strong>In Group:</strong> {account.in_group ? "Yes" : "No"}
          </p>
          <p>
            <strong>Group:</strong>{" "}
            {account.group ? JSON.stringify(account.group) : "N/A"}
          </p>
          <p>
            <strong>Campaign State:</strong> {account.campaign_state}
          </p>
          <p>
            <strong>Is Active:</strong> {account.is_active ? "Yes" : "No"}
          </p>
          <p>
            <strong>Working In Campaign:</strong>{" "}
            {account.working_in_campaign ? "Yes" : "No"}
          </p>
          <p>
            <strong>State:</strong> {account.state}
          </p>
          <p>
            <strong>Account Type:</strong> {account.account_type}
          </p>
          <p>
            <strong>Category:</strong> {account.category}
          </p>
          <p>
            <strong>Data State:</strong>{" "}
            {account.data_state ? JSON.stringify(account.data_state) : "N/A"}
          </p>
          <p>
            <strong>Login With:</strong>{" "}
            {account.login_with ? JSON.stringify(account.login_with) : "N/A"}
          </p>
        </div>
      )}
    </div>
  );
};

export default BurnerAccountDetail;
