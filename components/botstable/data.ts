export const columns = [
  { name: "", uid: "selectAll" },
  { name: "ID", uid: "id" },
  { name: "BOTIP", uid: "botIp" },
  { name: "BOTID", uid: "botId" },
  { name: "CHECK BOT OFFLINE", uid: "checkBotOffline" },
  { name: "BOT TYPE", uid: "botType", filterOptions: ["Auto", "Burn", "Explore"] },
  { name: "IS ACTIVE", uid: "isActive", filterOptions: ["Yes", "No"] },
  { name: "BOT DATA STATE", uid: "botDataState", filterOptions: ["Online", "Busy", "Offline"] },
  { name: "IN SESSION", uid: "inSession" },
];

export const initialUsers = [
  { id: 1, botIp: "192.168.1.1", botId: "BOT001", checkBotOffline: "Yes", botType: "Burn", isActive: "No", botDataState: "Busy", inSession: "12341" },
  { id: 2, botIp: "192.168.1.2", botId: "BOT002", checkBotOffline: "No", botType: "Explore", isActive: "Yes", botDataState: "Offline", inSession: "12342" },
  { id: 3, botIp: "192.168.1.3", botId: "BOT003", checkBotOffline: "Yes", botType: "Auto", isActive: "No", botDataState: "Online", inSession: "12343" },
  { id: 4, botIp: "192.168.1.10", botId: "BOT010", checkBotOffline: "No", botType: "Burn", isActive: "Yes", botDataState: "Busy", inSession: "123410" },
  { id: 5, botIp: "192.168.1.5", botId: "BOT005", checkBotOffline: "Yes", botType: "Explore", isActive: "No", botDataState: "Offline", inSession: "12345" },
  { id: 6, botIp: "192.168.1.6", botId: "BOT006", checkBotOffline: "No", botType: "Auto", isActive: "Yes", botDataState: "Online", inSession: "12346" },
  { id: 7, botIp: "192.168.1.7", botId: "BOT007", checkBotOffline: "Yes", botType: "Burn", isActive: "No", botDataState: "Busy", inSession: "12347" },
  { id: 8, botIp: "192.168.1.8", botId: "BOT008", checkBotOffline: "No", botType: "Explore", isActive: "Yes", botDataState: "Offline", inSession: "12348" },
  { id: 9, botIp: "192.168.1.9", botId: "BOT009", checkBotOffline: "Yes", botType: "Auto", isActive: "No", botDataState: "Online", inSession: "12349" },
  { id: 10, botIp: "192.168.1.4", botId: "BOT004", checkBotOffline: "No", botType: "Burn", isActive: "Yes", botDataState: "Busy", inSession: "12344" },
  // Add more test data as needed
];
