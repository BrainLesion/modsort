import { app, BrowserWindow, ipcMain } from 'electron'
import fs from 'fs-extra'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

// Use the absolute path to the preload script
const PRELOAD_PATH = path.join(__dirname, '..', 'preload.cjs');

console.log('Preload script path:', PRELOAD_PATH);
console.log('Does preload script exist?', fs.existsSync(PRELOAD_PATH)); // Debug info

function createWindow() {
  win = new BrowserWindow({
    width: 1600,
    height: 600,
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: PRELOAD_PATH,
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false, // Required for older versions of Electron with CommonJS
    },
  })

  // Add error handling for preload
  win.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error('Page failed to load:', errorCode, errorDescription);
  });

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
    win.webContents.openDevTools(); // Open DevTools by default
  } else {
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(createWindow)

// Add this to detect uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
});

// Integrate logic from background.jsith the preload script
ipcMain.on("copyNii", (event, src, dst) => {
  console.log("calling copyNii")
  console.log("coping:", src, "to:", dst)
  fs.ensureDirSync(path.dirname(dst))
  fs.copyFile(src, dst, err => {
    if (err) throw err
    console.log(src, "was copied to destination:", dst)
  })
  event.reply("copyNiiComplete", dst)
})

ipcMain.on("createFile", (event, dst) => {
  console.log("calling createFile")
  console.log("creating:", dst)

  // ensure folder existence
  fs.ensureDirSync(path.dirname(dst))

  fs.open(dst, "w", function(err, file) {
    if (err) throw err
    console.log("created:", dst)
  })

  event.reply("createFileComplete", dst)
})

// Add a listener for messages from the renderer
ipcMain.on('message-from-renderer', (event, message) => {
  console.log('Received message from renderer:', message);
});
