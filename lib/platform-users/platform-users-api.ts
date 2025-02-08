import type { PlatformUser } from "@/types/platform-users"
import type { ApiClient } from "../api-client"

export async function getPlatformUser(apiClient: ApiClient): Promise<PlatformUser> {
  const headers = await apiClient.getHeaders()
  const response = await fetch(`${apiClient.getBaseUrl()}/api_admin/authentication/user/list/`, {
    headers,
    cache: "no-store", // This ensures fresh data is fetched every time
  })

  if (!response.ok) {
    throw new Error("Failed to fetch account groups")
  }

  return response.json()
}

export async function getPlatformUserDetail(id: string, apiClient: ApiClient): Promise<PlatformUser> {
  const headers = await apiClient.getHeaders()
  const response = await fetch(`${apiClient.getBaseUrl()}/api_admin/authentication/user/${id}/detail/`, {
    headers,
    cache: "no-store", // This ensures fresh data is fetched every time
  })

  if (!response.ok) {
    throw new Error("Failed to fetch account group details")
  }

  return response.json()
}

