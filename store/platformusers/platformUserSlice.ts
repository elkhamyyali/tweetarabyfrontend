import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { PlatformUser } from "@/types/platform-users"
import type { RootState } from "../store"
import { getPlatformUser } from "@/lib/platform-users/platform-users-api"

interface PlatformUsersState {
  groups: PlatformUser[]
  loading: boolean
  error: string | null
}

const initialState: PlatformUsersState = {
  groups: [],
  loading: false,
  error: null,
}

export const fetchPlatformUsers = createAsyncThunk<PlatformUser[], void, { state: RootState }>(
  "platformUsers/fetchAll",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState()
      const client = state.api.client
      if (!client) {
        throw new Error("API client not initialized")
      }
      const response: PlatformUser = await getPlatformUser(client)
      return response // Return the entire response
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "An unknown error occurred")
    }
  },
)

const platformUsersSlice = createSlice({
  name: "platformUsers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlatformUsers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPlatformUsers.fulfilled, (state, action) => {
        state.loading = false
        state.groups = action.payload // Directly assign the payload to groups
      })
      .addCase(fetchPlatformUsers.rejected, (state, action) => {
        state.loading = false
        state.error = (action.payload as string) || "Failed to fetch account groups"
      })
  },
})

export default platformUsersSlice.reducer

