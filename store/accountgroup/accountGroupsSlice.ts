import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { AccountGroup, AccountGroupsResponse } from "@/types/account-groups"
import type { RootState } from "../store"
import { getAccountGroups } from "@/lib/accountsgroup/account-groups-api"

interface AccountGroupsState {
  groups: AccountGroup[]
  loading: boolean
  error: string | null
}

const initialState: AccountGroupsState = {
  groups: [],
  loading: false,
  error: null,
}

export const fetchAccountGroups = createAsyncThunk<AccountGroup[], void, { state: RootState }>(
  "accountGroups/fetchAll",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState()
      const client = state.api.client
      if (!client) {
        throw new Error("API client not initialized")
      }
      const response: AccountGroupsResponse = await getAccountGroups(client)
      return response // Return the entire response
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "An unknown error occurred")
    }
  },
)

const accountGroupsSlice = createSlice({
  name: "accountGroups",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccountGroups.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAccountGroups.fulfilled, (state, action) => {
        state.loading = false
        state.groups = action.payload // Directly assign the payload to groups
      })
      .addCase(fetchAccountGroups.rejected, (state, action) => {
        state.loading = false
        state.error = (action.payload as string) || "Failed to fetch account groups"
      })
  },
})

export default accountGroupsSlice.reducer

