import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { BurnerAccount } from "@/types/burner-account"
import type { RootState } from "../store"
import { getBurnerGroups } from "@/lib/burneraccount/burner-account-api"

interface BurnerAccountState {
  groups: BurnerAccount[]
  loading: boolean
  error: string | null
}

const initialState: BurnerAccountState = {
  groups: [],
  loading: false,
  error: null,
}

export const fetchBurnerAccounts = createAsyncThunk<BurnerAccount[], void, { state: RootState }>(
  "burnerAccounts/fetchAll",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState()
      const client = state.api.client
      if (!client) {
        throw new Error("API client not initialized")
      }
      const response: BurnerAccount = await getBurnerGroups(client)
      return response // Return the entire response
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "An unknown error occurred")
    }
  },
)

const burnerAccountsSlice = createSlice({
  name: "burnerAccounts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBurnerAccounts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchBurnerAccounts.fulfilled, (state, action) => {
        state.loading = false
        state.groups = action.payload // Directly assign the payload to groups
      })
      .addCase(fetchBurnerAccounts.rejected, (state, action) => {
        state.loading = false
        state.error = (action.payload as string) || "Failed to fetch account groups"
      })
  },
})

export default burnerAccountsSlice.reducer

