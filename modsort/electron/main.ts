import { app, BrowserWindow, ipcMain } from 'electron';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Use the absolute path to the preload script
const PRELOAD_PATH = app.isPackaged
  ? path.join(process.resourcesPath, 'preload.cjs')
  : path.join(__dirname, '../electron/preload.cjs');

console.log('Preload script path:', PRELOAD_PATH);
console.log('Does preload script exist?', fs.existsSync(PRELOAD_PATH)); // Debug info

let win: BrowserWindow | null;

function createWindow() {
  win = new BrowserWindow({
    width: 1600,
    height: 600,
    icon: app.isPackaged 
      ? path.join(process.resourcesPath, 'resources/icon.png')  // For Mac/Linux
      : path.join(__dirname, '../resources/icon.png'),          // For development
    webPreferences: {
      preload: PRELOAD_PATH,
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
    },
  });

  // Add error handling for preload
  win.webContents.on('did-fail-load', (_event, errorCode, errorDescription) => {
    console.error('Page failed to load:', errorCode, errorDescription);
  });

  win.webContents.on('did-finish-load', () => {
    const message = (new Date()).toLocaleString();
    console.log('Page loaded successfully');
    win?.webContents.send('main-process-message', 'Hello from main process: ' + message);
  });

  // For production, load from file
  if (app.isPackaged) {
    win.loadFile(path.join(__dirname, '../dist/index.html'));
  } else {
    // For development
    if (process.env.VITE_DEV_SERVER_URL) {
      win.loadURL(process.env.VITE_DEV_SERVER_URL);
    } else {
      win.loadFile(path.join(__dirname, '../dist/index.html'));
    }
    win.webContents.openDevTools();
  }
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
    win = null;
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Add this to detect uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
});

app.whenReady().then(createWindow);

// Add event handlers for the main process
app.on('web-contents-created', (_event, webContents) => {
  webContents.on('preload-error', (_event, preloadPath, error) => {
    console.error('Preload script error:', preloadPath, error);
  });
});

// Integrate logic from background.js
ipcMain.on("copyNii", (event, src, dst) => {
  console.log("calling copyNii");
  console.log("copying:", src, "to:", dst);
  
  fs.ensureDirSync(path.dirname(dst));
  
  fs.copyFile(src, dst, err => {
    if (err) throw err;
    console.log(src, "was copied to destination:", dst);
  });
  
  event.reply("copyNiiComplete", dst);
});

ipcMain.on("createFile", (event, dst) => {
  console.log("calling createFile");
  console.log("creating:", dst);

  // ensure folder existence
  fs.ensureDirSync(path.dirname(dst));

  fs.open(dst, "w", function(err, _file) {
    if (err) throw err;
    console.log("created:", dst);
  });

  event.reply("createFileComplete", dst);
});

// Add a listener for messages from the renderer
ipcMain.on('message-from-renderer', (_event, message) => {
  console.log('Received message from renderer:', message);
});
