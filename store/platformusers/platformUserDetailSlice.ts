import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { getPlatformUserDetail } from "@/lib/platform-users/platform-users-api";
import type { PlatformUser } from "@/types/platform-users";

interface PlatformUserDetailState {
  detail: PlatformUser | null;
  loading: boolean;
  error: string | null;
}

const initialState: PlatformUserDetailState = {
  detail: null,
  loading: false,
  error: null,
};

export const fetchPlatformUserDetail = createAsyncThunk<
  PlatformUser,
  string,
  { state: RootState }
>(
  "platformUserDetail/fetchDetail",
  async (id, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const client = state.api.client;
      if (!client) {
        throw new Error("API client not initialized");
      }
      const response = await getPlatformUserDetail(id, client);
      console.log("API Response:", response);
      return response;
    } catch (error) {
      console.error("Error fetching user details:", error);
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch user details"
      );
    }
  }
);

const platformUserDetailSlice = createSlice({
  name: "platformUserDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlatformUserDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlatformUserDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.detail = action.payload;
        console.log("Updated state:", state.detail);
      })
      .addCase(fetchPlatformUserDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Failed to fetch user details";
      });
  },
});

export default platformUserDetailSlice.reducer;