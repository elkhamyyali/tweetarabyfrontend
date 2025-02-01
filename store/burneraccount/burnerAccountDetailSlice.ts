import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { getBurnerGroupDetail } from "@/lib/burneraccount/burner-account-api";


interface BurnerAccountDetailState {
  detail: BurnerAccountDetailState | null;
  loading: boolean;
  error: string | null;
}

const initialState: BurnerAccountDetailState = {
  detail: null,
  loading: false,
  error: null,
};

// Async thunk to fetch account group details
export const fetchBurnerAccountDetail = createAsyncThunk<BurnerAccountDetailState, string, { state: RootState }>(
  "burnerAccountDetail/fetchDetail",
  async (id, { rejectWithValue, getState }) => {
    try {
      const state = getState()
      const client = state.api.client
      if (!client) {
        throw new Error("API client not initialized")
      }
      const response = await getBurnerGroupDetail(id, client); // Pass both id and apiClient to API function
      return response;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Failed to fetch account group details");
    }
  }
);

const burnerAccountDetailSlice = createSlice({
  name: "burnerAccountDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBurnerAccountDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBurnerAccountDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.detail = action.payload;
      })
      .addCase(fetchBurnerAccountDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Failed to fetch account group details";
      });
  },
});

export default burnerAccountDetailSlice.reducer;
