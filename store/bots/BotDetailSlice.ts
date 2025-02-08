import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { getBotDetail } from "@/lib/bots/bots-api";
import type { Bot } from "@/types/bots";

interface BotDetailState {
  detail: Bot | null;
  loading: boolean;
  error: string | null;
}

const initialState: BotDetailState = {
  detail: null,
  loading: false,
  error: null,
};

export const fetchBotDetail = createAsyncThunk<
  Bot,
  string,
  { state: RootState }
>(
  "botDetail/fetchDetail",
  async (id, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const client = state.api.client;
      if (!client) {
        throw new Error("API client not initialized");
      }
      const response = await getBotDetail(id, client);
      console.log("API Response:", response);
      return response;
    } catch (error) {
      console.error("Error fetching bot details:", error);
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch bot details"
      );
    }
  }
);

const botDetailSlice = createSlice({
  name: "botDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBotDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBotDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.detail = action.payload;
        console.log("Updated state:", state.detail);
      })
      .addCase(fetchBotDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Failed to fetch bot details";
      });
  },
});

export default botDetailSlice.reducer;
