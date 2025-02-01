import {
  getAccountGroups,
  getAccountGroupDetail,
} from "@/lib/accountsgroup/account-groups-api";
import { apiClient } from "@/lib/api-client";

// This function should be called once when your app initializes,
// for example in a layout component or in your main app file
export async function initializeApiClient() {
  // You should get these values from environment variables
  const username = process.env.NEXT_PUBLIC_API_USERNAME;
  const password = process.env.NEXT_PUBLIC_API_PASSWORD;

  if (!username || !password) {
    throw new Error("API credentials not found in environment variables");
  }

  apiClient.setConfig({ username, password });
}

export default async function AccountGroupDetail({
  params,
}: {
  params: { slug: string };
}) {
  await initializeApiClient(); // Ensure API client is initialized
  const detail = await getAccountGroupDetail(params.slug, apiClient);

  if (!detail) {
    return <div>Error: Account group not found</div>;
  }

  return (
    <div>
      <h1>Account Group Detail</h1>
      <div>
        <p>Name: {detail.name}</p>
        <p>Campaign: {detail.campaign}</p>
        <p>Group Type: {detail.group_main_type}</p>
        <p>Sub Type: {detail.group_sub_type}</p>
        {/* Render other details as needed */}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  await initializeApiClient(); // Ensure API client is initialized
  const accountGroups = await getAccountGroups(apiClient);

  return accountGroups.map((group) => ({
    slug: group.pk.toString(),
  }));
}
