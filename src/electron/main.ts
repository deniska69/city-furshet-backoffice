import { app, BrowserWindow } from "electron";
import path from "path";

app.on("ready", () => {
  const mainWindow = new BrowserWindow({});

  mainWindow.setMinimumSize(1280, 720);
  mainWindow.setMenuBarVisibility(false);
  mainWindow.setTitle("City-Furshet Backoffice");

  mainWindow.maximize(); // TODO dev mode
  mainWindow.webContents.openDevTools(); // TODO dev mode

  mainWindow.loadFile(path.join(app.getAppPath(), "dist-react/index.html"));
});
