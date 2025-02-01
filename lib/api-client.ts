import type { SiteContext } from "@/types/api"

const BASE_URL = "https://tweetaraby.xyz"

interface ApiClientConfig {
  username: string
  password: string
}

export class ApiClient {
  private csrfToken: string | null = null
  private auth: string

  constructor(config: ApiClientConfig) {
    this.auth = btoa(`${config.username}:${config.password}`)
  }

  async getHeaders(): Promise<Headers> {
    if (!this.csrfToken) {
      await this.fetchCsrfToken()
    }

    return new Headers({
      Authorization: `Basic ${this.auth}`,
      Cookie: `csrftoken=${this.csrfToken}`,
      "X-CSRFToken": this.csrfToken || "",
      "Content-Type": "application/json",
    })
  }

  private async fetchCsrfToken(): Promise<void> {
    const response = await fetch(`${BASE_URL}/api_admin/csrf_token/`, {
      headers: {
        Authorization: `Basic ${this.auth}`,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch CSRF token")
    }

    // Extract CSRF token from cookies
    const cookies = response.headers.get("set-cookie")
    if (cookies) {
      const match = cookies.match(/csrftoken=([^;]+)/)
      if (match) {
        this.csrfToken = match[1]
      }
    }
  }

  async getSiteContext(): Promise<SiteContext> {
    const headers = await this.getHeaders()
    const response = await fetch(`${BASE_URL}/api_admin/site_context/`, {
      headers,
    })

    if (!response.ok) {
      throw new Error("Failed to fetch site context")
    }

    return response.json()
  }

  getBaseUrl(): string {
    return BASE_URL
  }
}

