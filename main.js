const { app, BrowserWindow } = require("electron");
const { initialize, enable } = require("@electron/remote/main");

initialize();

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 650,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  enable(mainWindow.webContents);

  mainWindow.loadFile("index.html");

  mainWindow.on("resize", () => {
    let size = mainWindow.getBounds();

    if (size.width < 600) {
      size.width = 600;
    }

    if (size.height < 600) {
      size.height = 600;
    }

    mainWindow.setBounds(size);
  });
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
