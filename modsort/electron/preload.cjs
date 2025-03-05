const { contextBridge, ipcRenderer } = require('electron');
const os = require('os');
const path = require('path');

// Define valid channels for security
const validChannels = ['main-process-message', 'copyNiiComplete', 'createFileComplete', 'copyNii', 'createFile', 'message-from-renderer'];

// Create a map to store wrapped callback references
const callbackMap = new Map();

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
      if (validChannels.includes(channel)) {
        const wrappedCallback = (_event, arg) => callback(arg);
        callbackMap.set(callback, wrappedCallback);
        ipcRenderer.on(channel, wrappedCallback);
      }
    },
    once: (channel, callback) => {
      if (validChannels.includes(channel)) {
        const wrappedCallback = (_event, arg) => callback(arg);
        callbackMap.set(callback, wrappedCallback);
        ipcRenderer.once(channel, wrappedCallback);
      }
    },
    off: (channel, callback) => {
      if (validChannels.includes(channel)) {
        const wrappedCallback = callbackMap.get(callback);
        if (wrappedCallback) {
          ipcRenderer.removeListener(channel, wrappedCallback);
          callbackMap.delete(callback);
        }
      }
    },
    send: (channel, ...args) => {
      if (validChannels.includes(channel)) {
        ipcRenderer.send(channel, ...args);
      }
    },
    invoke: (channel, ...args) => {
      if (validChannels.includes(channel)) {
        return ipcRenderer.invoke(channel, ...args);
      }
      return Promise.reject(new Error(`Channel "${channel}" is not allowed`));
    }
  }
});

console.log('Preload script executed successfully');
