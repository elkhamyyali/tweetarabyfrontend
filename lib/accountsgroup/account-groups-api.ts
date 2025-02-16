import type { AccountGroupsResponse } from "@/types/account-groups"
import type { ApiClient } from "../api-client"

export async function getAccountGroups(apiClient: ApiClient): Promise<AccountGroupsResponse> {
  const headers = await apiClient.getHeaders()
  const response = await fetch(`${apiClient.getBaseUrl()}/api_admin/accounts/accountgroup/list/`, {
    headers,
    cache: "no-store", // This ensures fresh data is fetched every time
  })

  if (!response.ok) {
    throw new Error("Failed to fetch account groups")
  }

  return response.json()
}

export async function getAccountGroupDetail(id: string, apiClient: ApiClient): Promise<AccountGroupsResponse> {
  const headers = await apiClient.getHeaders()
  const response = await fetch(`${apiClient.getBaseUrl()}/api_admin/accounts/accountgroup/${id}/detail/`, {
    headers,
    cache: "no-store", // This ensures fresh data is fetched every time
  })

  if (!response.ok) {
    throw new Error("Failed to fetch account group details")
  }

  return response.json()
}

export async function deleteAccountGroup(id: string, apiClient: ApiClient): Promise<void> {
  const headers = await apiClient.getHeaders();

  // Convert Headers object to a plain object for logging
  const headersObj: Record<string, string> = {};
  headers.forEach((value, key) => {
    headersObj[key] = value;
  });

  console.log("Request Headers:", headersObj); // Log headers in a readable format

  try {
    const response = await fetch(`${apiClient.getBaseUrl()}/api_admin/accounts/accountgroup/${id}/delete/`, {
      method: "DELETE",
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error("Delete failed:", errorData);
      throw new Error(errorData?.detail || "Failed to delete account group");
    }
  } catch (error) {
    console.error("Delete request failed:", error);
    throw error;
  }
}

