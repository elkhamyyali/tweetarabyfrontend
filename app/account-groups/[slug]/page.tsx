import { Suspense } from "react";
import {
  getAccountGroups,
  getAccountGroupDetail,
} from "@/lib/accountsgroup/account-groups-api";
import { apiClient } from "@/lib/api-client";

// This function should be called once when your app initializes
export async function initializeApiClient() {
  const username = process.env.NEXT_PUBLIC_API_USERNAME;
  const password = process.env.NEXT_PUBLIC_API_PASSWORD;

  if (!username || !password) {
    throw new Error("API credentials not found in environment variables");
  }

  apiClient.setConfig({ username, password });
}

// Generate static params at build time
export async function generateStaticParams() {
  await initializeApiClient();
  try {
    const accountGroups = await getAccountGroups(apiClient);
    return accountGroups.map((group) => ({
      slug: group.pk.toString(),
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

interface AccountGroupDetailProps {
  params: { slug: string };
}

async function AccountGroupDetailContent({ slug }: { slug: string }) {
  await initializeApiClient();
  const detail = await getAccountGroupDetail(slug, apiClient);

  if (!detail) {
    return (
      <div className="p-4 text-red-600">Error: Account group not found</div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Account Group Detail</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <dl className="grid grid-cols-1 gap-4">
          <div>
            <dt className="text-sm font-medium text-gray-500">Name</dt>
            <dd className="mt-1 text-lg text-gray-900">{detail.name}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Campaign</dt>
            <dd className="mt-1 text-lg text-gray-900">{detail.campaign}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Group Type</dt>
            <dd className="mt-1 text-lg text-gray-900">
              {detail.group_main_type}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Sub Type</dt>
            <dd className="mt-1 text-lg text-gray-900">
              {detail.group_sub_type}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

export default function AccountGroupDetail({
  params,
}: AccountGroupDetailProps) {
  return (
    <Suspense
      fallback={<div className="p-4">Loading account group details...</div>}
    >
      <AccountGroupDetailContent slug={params.slug} />
    </Suspense>
  );
}
