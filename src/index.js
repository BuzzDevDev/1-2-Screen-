const { app, BrowserWindow, dialog } = require('electron');
const path = require('path');


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1400,
    height: 1200,
    resizable: false,
    fullscreen: false,
    focusable: true,
    webPreferences: {
      nodeIntegration: true,
      devTools: true,
      disableHtmlFullscreenWindowResize: true,
      enableRemoteModule: true
    }
  });

  // create watermark window
  const watermarkWindow = new BrowserWindow({
    width: 200,
    height: 100,
    alwaysOnTop: true,
    movable: false,
    minimizable: false,
    maximizable: false,
    resizable: false,
    focusable: true,
    closable: false,
    opacity: 0.5,
    skipTaskbar: true,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: true,
      devTools: false,
      disableHtmlFullscreenWindowResize: true,
      enableRemoteModule: true
    }
  })


  // remove menufor all

  //mainWindow.removeMenu()

  watermarkWindow.removeMenu()

  // load watermark window

  watermarkWindow.loadFile(path.join(__dirname, 'watermark.html'))

  // position it

  watermarkWindow.setPosition(1720,920)

  // disable maximize
  mainWindow.on('maximize', () => {
    mainWindow.unmaximize()
  })

  watermarkWindow.on('maximize', () => {
    watermarkWindow.unmaximize()
    watermarkWindow.width = 200
    watermarkWindow.height = 100
  })

  watermarkWindow.on('minimize', () => {
    watermarkWindow.width = 200
    watermarkWindow.height = 100
  })

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // export watermark

  module.exports = {
    watermarkWindow,
    mainWindow
  }

};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

