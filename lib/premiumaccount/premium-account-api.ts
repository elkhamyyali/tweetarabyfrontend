import type { BurnerAccount } from "@/types/burner-account"
import type { ApiClient } from "../api-client"

export async function getPremiumGroups(apiClient: ApiClient): Promise<BurnerAccount> {
  const headers = await apiClient.getHeaders()
  const response = await fetch(`${apiClient.getBaseUrl()}/api_admin/accounts/premiumaccount/list/`, {
    headers,
    cache: "no-store", // This ensures fresh data is fetched every time
  })

  if (!response.ok) {
    throw new Error("Failed to fetch account groups")
  }

  return response.json()
}

export async function getPremiumGroupDetail(id: string, apiClient: ApiClient): Promise<BurnerAccount> {
  const headers = await apiClient.getHeaders()
  const response = await fetch(`${apiClient.getBaseUrl()}/api_admin/accounts/premiumaccount/${id}/detail/`, {
    headers,
    cache: "no-store", // This ensures fresh data is fetched every time
  })

  if (!response.ok) {
    throw new Error("Failed to fetch account group details")
  }

  return response.json()
}

