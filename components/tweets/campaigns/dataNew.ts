// dataNew.ts
export const initialData: any = [
  {
    id: 1,
    campaignName: "Campaign 1",
    sessionNiche: "Premium",
    burnerBots: "Top",
    isActive: true,
    mainType: "Premium",
    subType: "Top",
    limitedRepeatance: true,
    inSession: "Session 1",
  },
  {
    id: 2,
    campaignName: "Campaign 2",
    sessionNiche: "Burn",
    burnerBots: "Latest",
    isActive: false,
    mainType: "Burn",
    subType: "Latest",
    limitedRepeatance: false,
    inSession: "Session 2",
  },
  // Add more objects as needed
];

export const columns = [
  { name: "ID", uid: "id" },
  { name: "Campaign", uid: "campaign" },
  { name: "Main Type", uid: "mainType", filterOptions: ["Premium", "Burn"] },
  { name: "Sub Type", uid: "subType", filterOptions: ["Top", "Latest"] },
  { name: "Limited Repeatance", uid: "limitedRepeatance" },
  { name: "In Session", uid: "inSession" },
  { name: "Session Handler", uid: "sessionHandler" },
];