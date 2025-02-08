import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { getBots } from "@/lib/bots/bots-api";
import type { Bot } from "@/types/bots";

interface BotsState {
  bots: Bot[];
  loading: boolean;
  error: string | null;
}

const initialState: BotsState = {
  bots: [],
  loading: false,
  error: null,
};

export const fetchBots = createAsyncThunk<Bot[], void, { state: RootState }>(
  "bots/fetchAll",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const client = state.api.client;
      if (!client) {
        throw new Error("API client not initialized");
      }
      const response: Bot[] = await getBots(client);
      return response;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "An unknown error occurred");
    }
  }
);

const botsSlice = createSlice({
  name: "bots",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBots.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBots.fulfilled, (state, action) => {
        state.loading = false;
        state.bots = action.payload;
      })
      .addCase(fetchBots.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch bots";
      });
  },
});

export default botsSlice.reducer;
