import type { AccountGroupsResponse } from "@/types/account-groups";
import type { ApiClient } from "../api-client";

export async function getAccountGroups(apiClient: ApiClient): Promise<AccountGroupsResponse> {
  const headers = await apiClient.getHeaders();
  const response = await fetch(`${apiClient.getBaseUrl()}/api_admin/accounts/accountgroup/list/`, {
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch account groups");
  }

  return response.json();
}

export async function getAccountGroupDetail(id: string, apiClient: ApiClient): Promise<AccountGroupsResponse> {
  const headers = await apiClient.getHeaders();
  const response = await fetch(`${apiClient.getBaseUrl()}/api_admin/accounts/accountgroup/${id}/detail/`, {
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch account group details");
  }

  return response.json();
}
