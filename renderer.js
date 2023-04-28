const { BrowserWindow, getCurrentWindow } = require("@electron/remote");

const currentWindow = getCurrentWindow();

document.getElementById("dev-console").addEventListener("click", () => {
  currentWindow.webContents.toggleDevTools();
});

document.getElementById("reload").addEventListener("click", () => {
  currentWindow.reload();
});

document.getElementById("close").addEventListener("click", () => {
  currentWindow.close();
});
