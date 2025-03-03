import { app, BrowserWindow } from "electron";
import path from "path";
import { getPreloadPath, isDev } from "./utils.js";

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
    },
  });

  mainWindow.setMinimumSize(1280, 720);
  mainWindow.setMenuBarVisibility(false);
  mainWindow.setTitle("City-Furshet Backoffice");

  if (isDev()) {
    mainWindow.maximize();
    mainWindow.webContents.openDevTools();
    mainWindow.loadURL("http://localhost:5123/");
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), "dist-react/index.html"));
  }
});
