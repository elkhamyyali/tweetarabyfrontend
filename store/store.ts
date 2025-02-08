import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "./apiSlice";
import accountGroupsReducer from "./accountgroup/accountGroupsSlice";
import accountGroupDetailReducer from "./accountgroup/accountGroupDetailSlice";
import burnerAccountsReducer from "./burneraccount/burnerAccountSlice";
import burnerAccountDetailReducer from "./burneraccount/burnerAccountDetailSlice";
import premiumAccountsReducer from "./premiumaccount/premiumAccountSlice";
import premiumAccountDetailReducer from "./premiumaccount/premiumAccountDetailSlice";
import platformUsersReducer from "./platformusers/platformUserSlice";
import platformUserDetailReducer from "./platformusers/platformUserDetailSlice";
import botsReducer from "./bots/BotSlice";
import botDetailReducer from "./bots/BotDetailSlice";
import type { ApiClient } from "@/lib/api-client";

export const createStore = (apiClient: ApiClient) => {
  return configureStore({
    reducer: {
      api: apiReducer,
      accountGroups: accountGroupsReducer,
      accountGroupDetail: accountGroupDetailReducer,
      burnerAccounts: burnerAccountsReducer,
      burnerAccountDetail: burnerAccountDetailReducer,
      premiumAccounts: premiumAccountsReducer,
      premiumAccountDetail: premiumAccountDetailReducer,
      platformUsers: platformUsersReducer,
      platformUserDetail: platformUserDetailReducer,
      bots: botsReducer,
      botDetail: botDetailReducer,
    },
    preloadedState: {
      api: { client: apiClient, siteContext: null, loading: false, error: null },
    },
  });
};

export type RootState = ReturnType<ReturnType<typeof createStore>["getState"]>;
export type AppDispatch = ReturnType<typeof createStore>["dispatch"];
