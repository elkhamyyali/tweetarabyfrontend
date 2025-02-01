import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { SiteContext } from "@/types/api"
import type { ApiClient } from "@/lib/api-client"

interface ApiState {
  client: ApiClient | null
  siteContext: SiteContext | null
  loading: boolean
  error: string | null
}

const initialState: ApiState = {
  client: null,
  siteContext: null,
  loading: false,
  error: null,
}

export const fetchSiteContext = createAsyncThunk<SiteContext, void, { state: { api: ApiState } }>(
  "api/fetchSiteContext",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState()
      const client = state.api.client
      if (!client) {
        throw new Error("API client not initialized")
      }
      return await client.getSiteContext()
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "An unknown error occurred")
    }
  },
)

const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSiteContext.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchSiteContext.fulfilled, (state, action) => {
        state.loading = false
        state.siteContext = action.payload
      })
      .addCase(fetchSiteContext.rejected, (state, action) => {
        state.loading = false
        state.error = (action.payload as string) || "Failed to fetch site context"
      })
  },
})

export default apiSlice.reducer

