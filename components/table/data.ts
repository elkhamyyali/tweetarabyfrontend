// data.js
export const columns = [
  { name: "ID", uid: "id" },
  { name: "Username", uid: "username" },
  { name: "Account State", uid: "accountState", filterOptions: ["New", "Checked", "To Check", "Old", "BackUse", "In Session", "Used Recheck", "Recheck", "Wrong Auth", "Suspended"] },
  { name: "Is Active", uid: "isActive", filterOptions: ["Yes", "No"] },
  { name: "Account Type", uid: "accountType", filterOptions: ["Tweeter", "Reactor", "Browser"] },
];

export const users = [
  { id: 1, username: "user1", accountState: "New", isActive: "Yes", accountType: "Tweeter", inSession: "Yes" },
  { id: 2, username: "user2", accountState: "Checked", isActive: "No", accountType: "Reactor", inSession: "No" },
  { id: 3, username: "user3", accountState: "To Check", isActive: "Yes", accountType: "Browser", inSession: "Yes" },
  { id: 4, username: "user4", accountState: "Old", isActive: "Yes", accountType: "Tweeter", inSession: "No" },
  { id: 5, username: "user5", accountState: "BackUse", isActive: "No", accountType: "Reactor", inSession: "Yes" },
  { id: 6, username: "user6", accountState: "In Session", isActive: "Yes", accountType: "Browser", inSession: "Yes" },
  { id: 7, username: "user7", accountState: "Used Recheck", isActive: "Yes", accountType: "Tweeter", inSession: "No" },
  { id: 8, username: "user8", accountState: "Recheck", isActive: "No", accountType: "Reactor", inSession: "Yes" },
  { id: 9, username: "user9", accountState: "Wrong Auth", isActive: "Yes", accountType: "Browser", inSession: "No" },
  { id: 10, username: "user10", accountState: "Suspended", isActive: "No", accountType: "Tweeter", inSession: "Yes" },
  { id: 11, username: "user11", accountState: "New", isActive: "Yes", accountType: "Reactor", inSession: "Yes" },
  { id: 12, username: "user12", accountState: "Checked", isActive: "Yes", accountType: "Browser", inSession: "No" },
];