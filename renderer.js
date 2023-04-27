const { BrowserWindow, getCurrentWindow } = require("@electron/remote");

const currentWindow = getCurrentWindow();

document.getElementById("dev-console").addEventListener("click", () => {
  currentWindow.webContents.toggleDevTools();
});

document.getElementById("reload").addEventListener("click", () => {
  currentWindow.reload();
});

document.getElementById("minimize").addEventListener("click", () => {
  currentWindow.minimize();
});

document.getElementById("maximize").addEventListener("click", () => {
  if (!currentWindow.isMaximized()) {
    currentWindow.maximize();
  } else {
    currentWindow.unmaximize();
  }
});

document.getElementById("close").addEventListener("click", () => {
  currentWindow.close();
});
