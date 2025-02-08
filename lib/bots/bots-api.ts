import type { Bot } from "@/types/bots"
import type { ApiClient } from "../api-client"

export async function getBots(apiClient: ApiClient): Promise<Bot> {
  const headers = await apiClient.getHeaders()
  const response = await fetch(`${apiClient.getBaseUrl()}/api_admin/bots/bot/list/`, {
    headers,
    cache: "no-store", // This ensures fresh data is fetched every time
  })

  if (!response.ok) {
    throw new Error("Failed to fetch account groups")
  }

  return response.json()
}

export async function getBotDetail(id: string, apiClient: ApiClient): Promise<Bot> {
  const headers = await apiClient.getHeaders()
  const response = await fetch(`${apiClient.getBaseUrl()}/api_admin/bots/bot/${id}/detail/`, {
    headers,
    cache: "no-store", // This ensures fresh data is fetched every time
  })

  console.log(response);
  
  if (!response.ok) {
    throw new Error("Failed to fetch account group details")
  }

  return response.json()
}

