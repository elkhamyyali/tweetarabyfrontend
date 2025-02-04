import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { BurnerAccount } from "@/types/burner-account"
import type { RootState } from "../store"
import { getPremiumGroups } from "@/lib/premiumaccount/premium-account-api"

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

export const fetchPremiumAccounts = createAsyncThunk<BurnerAccount[], void, { state: RootState }>(
  "burnerAccounts/fetchAll",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState()
      const client = state.api.client
      if (!client) {
        throw new Error("API client not initialized")
      }
      const response: BurnerAccount = await getPremiumGroups(client)
      return response // Return the entire response
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "An unknown error occurred")
    }
  },
)

const premiumAccountsSlice = createSlice({
  name: "premiumAccounts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPremiumAccounts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPremiumAccounts.fulfilled, (state, action) => {
        state.loading = false
        state.groups = action.payload // Directly assign the payload to groups
      })
      .addCase(fetchPremiumAccounts.rejected, (state, action) => {
        state.loading = false
        state.error = (action.payload as string) || "Failed to fetch account groups"
      })
  },
})

export default premiumAccountsSlice.reducer

