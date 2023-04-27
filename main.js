const { app, BrowserWindow, Menu } = require("electron");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 650,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadFile("index.html");

  const defaultMenu = Menu.getApplicationMenu();

  const newMenuItems = defaultMenu.items.filter(
    (menuItem) => menuItem.role !== "editmenu" && menuItem.role !== "help"
  );

  const newMenu = Menu.buildFromTemplate(newMenuItems);
  Menu.setApplicationMenu(newMenu);
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
