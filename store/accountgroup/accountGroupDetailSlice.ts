import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { getAccountGroupDetail, deleteAccountGroup } from "@/lib/accountsgroup/account-groups-api";

interface AccountGroupDetailState {
  detail: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: AccountGroupDetailState = {
  detail: null,
  loading: false,
  error: null,
};

// Async thunk to fetch account group details
export const fetchAccountGroupDetail = createAsyncThunk<
  AccountGroupDetailState,
  string,
  { state: RootState }
>(
  "accountGroupDetail/fetchDetail",
  async (id, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const client = state.api.client;
      if (!client) {
        throw new Error("API client not initialized");
      }
      const response = await getAccountGroupDetail(id, client);
      return response;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch account group details"
      );
    }
  }
);

export const deleteAccountGroupAction = createAsyncThunk<
  void, 
  string, 
  { state: RootState }
>(
  "accountGroupDetail/delete",
  async (id, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const client = state.api.client;
      if (!client) {
        throw new Error("API client not initialized");
      }
      await deleteAccountGroup(id, client);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Failed to delete account group");
    }
  }
);

const accountGroupDetailSlice = createSlice({
  name: "accountGroupDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccountGroupDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAccountGroupDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.detail = action.payload;
      })
      .addCase(fetchAccountGroupDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Failed to fetch account group details";
      })
      .addCase(deleteAccountGroupAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAccountGroupAction.fulfilled, (state) => {
        state.loading = false;
        state.detail = null; // Clear detail on delete
      })
      .addCase(deleteAccountGroupAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Failed to delete account group";
      });
  },
});

export default accountGroupDetailSlice.reducer;
