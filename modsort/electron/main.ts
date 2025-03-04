import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import fs from 'fs-extra';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Use the absolute path to the preload script
const PRELOAD_PATH = path.join(__dirname, '..', 'preload.cjs');

console.log('Preload script path:', PRELOAD_PATH);
console.log('Does preload script exist?', fs.existsSync(PRELOAD_PATH)); // Debug info

let win: BrowserWindow | null;

function createWindow() {
  win = new BrowserWindow({
    width: 1600,
    height: 600,
    webPreferences: {
      preload: PRELOAD_PATH,
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false, // Required for older versions of Electron with CommonJS
    },
  });

  // Add error handling for preload
  win.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error('Page failed to load:', errorCode, errorDescription);
  });

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    const message = (new Date()).toLocaleString();
    console.log('Sending message to renderer:', message, typeof message);
    
    // Try with a simple string message
    win?.webContents.send('main-process-message', 'Hello from main process: ' + message);
    
    // Also try with a different approach
    setTimeout(() => {
      console.log('Sending delayed test message');
      win?.webContents.send('main-process-message', 'Delayed test message');
    }, 3000);
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
    win.webContents.openDevTools(); // Open DevTools by default
  } else {
    win.loadFile(path.join(__dirname, '..', 'dist', 'index.html'));
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
    win = null;
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
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
app.on('web-contents-created', (event, webContents) => {
  webContents.on('preload-error', (event, preloadPath, error) => {
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

  fs.open(dst, "w", function(err, file) {
    if (err) throw err;
    console.log("created:", dst);
  });

  event.reply("createFileComplete", dst);
});

// Add a listener for messages from the renderer
ipcMain.on('message-from-renderer', (event, message) => {
  console.log('Received message from renderer:', message);
});
