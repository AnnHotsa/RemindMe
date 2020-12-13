/* eslint global-require: off, no-console: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, Notification, Menu, Tray } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;
let trayWindow: BrowserWindow | null = null;
let isQuiting: boolean;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};


app.on('before-quit', function () {
  isQuiting = true;
});


const createWindow = async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    minWidth: 1024,
    minHeight: 728,
    webPreferences:
      process.env.NODE_ENV === 'development' || process.env.E2E_BUILD === 'true'
        ? {
            nodeIntegration: true
          }
        : {
            preload: path.join(__dirname, 'dist/renderer.prod.js')
          }
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
    mainWindow.webContents.closeDevTools();

    // const myNotification = new Notification({
    //   title: 'RemindMe',
    //   body: 'Hello! Do not forget to Send invoice today :)'
    // });

    // myNotification.show();
  });

  // mainWindow.on('closed', () => {
  //   mainWindow = null;
  // });

  
  mainWindow.on('close', function (event: any) {
    console.log("is quiting ===> ", isQuiting);
    if (!isQuiting) {
      event.preventDefault();
      (mainWindow as BrowserWindow).hide();
      event.returnValue = false;
    }
  });


  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

// app.on('window-all-closed', () => {
//   // Respect the OSX convention of having the application in memory even
//   // after all windows have been closed
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });

// app.on('ready', createWindow);

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});


let tray = null;

const createTrayWindow = async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  trayWindow = new BrowserWindow({
    show: false,
    width: 300,
    height: 420,
    minWidth: 300,
    minHeight: 420,
    frame: false,
    movable: false,
    x: 1050,
    y: 400
  });

  trayWindow.loadURL(`file://${__dirname}/../app/tray/tray.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  trayWindow.webContents.on('did-finish-load', () => {
    if (!trayWindow) {
      throw new Error('"trayWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      trayWindow.minimize();
    } else {
      trayWindow.show();
      trayWindow.focus();
    }
    trayWindow.webContents.closeDevTools();

  });

  trayWindow.on('closed', () => {
    trayWindow = null;
  });
};


app.on('ready', () => {

  createWindow();

  tray = new Tray(path.join(__dirname, '../resources/tray.png'));
  console.log("create Tray ==>", tray);
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Open app', click: () => {
        if (mainWindow) mainWindow.show()
      } 
    },
    {
      label: 'Quit', click: function () {
        isQuiting = true;
        app.quit();
      }
    }
  ])
  tray.setToolTip('RemindeMe');
  tray.setContextMenu(contextMenu);

  tray.on('click', () => {
    if (trayWindow) {
      trayWindow.isVisible() ? trayWindow.hide() : trayWindow.show();
    } else { 
      createTrayWindow();
    }
  });

  tray.on('double-click', () => {
    if (mainWindow) mainWindow.show()
  });

});
