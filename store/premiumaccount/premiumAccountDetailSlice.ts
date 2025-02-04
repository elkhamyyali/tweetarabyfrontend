import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { getPremiumGroupDetail } from "@/lib/premiumaccount/premium-account-api";


interface PremiumAccountDetailState {
  detail: PremiumAccountDetailState | null;
  loading: boolean;
  error: string | null;
}

const initialState: PremiumAccountDetailState = {
  detail: null,
  loading: false,
  error: null,
};

// Async thunk to fetch account group details
export const fetchPremiumAccountDetail = createAsyncThunk<PremiumAccountDetailState, string, { state: RootState }>(
  "premiumAccountDetail/fetchDetail",
  async (id, { rejectWithValue, getState }) => {
    try {
      const state = getState()
      const client = state.api.client
      if (!client) {
        throw new Error("API client not initialized")
      }
      const response = await getPremiumGroupDetail(id, client); // Pass both id and apiClient to API function
      return response;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Failed to fetch account group details");
    }
  }
);

const premiumAccountDetailSlice = createSlice({
  name: "premiumAccountDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPremiumAccountDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPremiumAccountDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.detail = action.payload;
      })
      .addCase(fetchPremiumAccountDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Failed to fetch account group details";
      });
  },
});

export default premiumAccountDetailSlice.reducer;
