const electron = require("electron");
const app = electron.app;

function createWindow() {
    const win = new electron.BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        webPreferences: {
            nodeIntegration: true
        }
    })

    win.loadFile("index.html").then(function() {
        win.maximize();
        win.show();
        win.webContents.openDevTools();
    })
}

app.whenReady().then(createWindow);

// for cross platforms
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
