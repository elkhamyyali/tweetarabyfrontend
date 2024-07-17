interface Column {
  name: string;
  uid: string;
  filterOptions?: string[]; // Make sure filterOptions is optional if not needed everywhere
}

export const columns: Column[] = [
  { name: "", uid: "selectAll" },
  { name: "ID", uid: "id" },
  { name: "BOTIP", uid: "botIp" },
  { name: "BOTID", uid: "botId" },
  { name: "CHECK BOT OFFLINE", uid: "checkBotOffline" },
  {
    name: "BOT TYPE",
    uid: "botType",
    filterOptions: ["Auto", "Burn", "Explore"],
  },
  { name: "IS ACTIVE", uid: "isActive", filterOptions: ["Yes", "No"] },
  {
    name: "BOT DATA STATE",
    uid: "botDataState",
    filterOptions: ["Online", "Busy", "Offline"],
  },
  { name: "IN SESSION", uid: "inSession" },
];

// Example of initial data
export const initialUsers = [
  {
    id: 1,
    botIp: "192.168.1.1",
    botId: "BOT001",
    checkBotOffline: "Yes",
    botType: "Burn",
    isActive: "No",
    botDataState: "Busy",
    inSession: "12341",
  },
];
