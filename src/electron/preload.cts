const electron = require("electron");

const writeBackupPrice = () => {
  console.log("[writeBackupPrice]");
};

electron.contextBridge.exposeInMainWorld("electron", { writeBackupPrice });
