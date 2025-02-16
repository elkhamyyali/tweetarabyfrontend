import type { SiteContext } from "@/types/api";

const BASE_URL = "https://tweetaraby.xyz";

interface ApiClientConfig {
  username: string;
  password: string;
}

export class ApiClient {
  private csrfToken: string | null = null;
  private auth: string | null = null;
  private csrfTokenPromise: Promise<string | null> | null = null;

  constructor(config?: ApiClientConfig) {
    if (config) {
      this.setConfig(config);
    }
  }

  setConfig(config: ApiClientConfig) {
    this.auth = btoa(`${config.username}:${config.password}`);
  }

async getHeaders(): Promise<Headers> {
    if (!this.auth) {
        throw new Error("API client not configured. Call setConfig() first.");
    }

    if (!this.csrfToken) {
        await this.fetchCsrfToken();
    }

    console.log("CSRF Token Before Sending Request:", this.csrfToken);

    return new Headers({
        'Authorization': `Basic ${this.auth}`,
        'X-CSRFToken': this.csrfToken || '',
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Referer': 'https://tweetaraby.xyz',
        'Cookie': `csrftoken=${this.csrfToken}`
    });
}


private async fetchCsrfToken(): Promise<void> {
  if (!this.auth) {
    throw new Error("API client not configured. Call setConfig() first.");
  }

  try {
    const response = await fetch(`${BASE_URL}/api_admin/csrf_token/`, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${this.auth}`,
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Referer': 'https://tweetaraby.xyz'
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch CSRF token");
    }

    const data = await response.json();
    this.csrfToken = data?.csrftoken || null;

    // ✅ LOG CSRF TOKEN
    console.log("Fetched CSRF Token:", this.csrfToken);

    // Store the token in a cookie
    document.cookie = `csrftoken=${this.csrfToken}; path=/; domain=tweetaraby.xyz`;
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
    throw error;
  }
}



  async getSiteContext(): Promise<SiteContext> {
    const headers = await this.getHeaders();
    const response = await fetch(`${BASE_URL}/api_admin/site_context/`, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch site context");
    }

    return response.json();
  }

  getBaseUrl(): string {
    return BASE_URL;
  }
}

// Create a singleton instance of ApiClient
export const apiClient = new ApiClient();
