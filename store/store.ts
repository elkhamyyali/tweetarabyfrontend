import { configureStore } from "@reduxjs/toolkit"
import apiReducer from "./apiSlice"
import accountGroupsReducer from "./accountgroup/accountGroupsSlice"
import accountGroupDetailReducer from "./accountgroup/accountGroupDetailSlice";
import type { ApiClient } from "@/lib/api-client"

export const createStore = (apiClient: ApiClient) => {
  return configureStore({
    reducer: {
      api: apiReducer,
      accountGroups: accountGroupsReducer,
      accountGroupDetail: accountGroupDetailReducer,
    },
    preloadedState: {
      api: { client: apiClient, siteContext: null, loading: false, error: null },
    },
  })
}

export type RootState = ReturnType<ReturnType<typeof createStore>["getState"]>
export type AppDispatch = ReturnType<typeof createStore>["dispatch"]

