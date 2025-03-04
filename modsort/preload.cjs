const { contextBridge, ipcRenderer } = require('electron');
const os = require('os');
const path = require('path');

console.log('Preload script is running!');

// Expose APIs to the renderer process
contextBridge.exposeInMainWorld('electron', {
  os: {
    type: () => os.type(),
    release: () => os.release(),
    platform: () => os.platform()
  },
  path: {
    sep: path.sep,
    join: (...args) => path.join(...args),
    dirname: (p) => path.dirname(p),
    basename: (p) => path.basename(p),
    normalize: (p) => path.normalize(p)
  },
  ipcRenderer: {
    on: (channel, callback) => {
      ipcRenderer.on(channel, (event, ...args) => callback(...args));
    },
    once: (channel, callback) => {
      ipcRenderer.once(channel, (event, ...args) => callback(...args));
    },
    off: (channel, callback) => {
      ipcRenderer.removeListener(channel, callback);
    },
    send: (channel, ...args) => {
      ipcRenderer.send(channel, ...args);
    },
    invoke: (channel, ...args) => {
      return ipcRenderer.invoke(channel, ...args);
    }
  }
});

console.log('API exposed successfully');
