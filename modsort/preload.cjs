const { contextBridge, ipcRenderer } = require('electron');
const os = require('os');
const path = require('path');

console.log('Preload script is running!');

// Add debug logging for IPC events
const originalOn = ipcRenderer.on;
ipcRenderer.on = function(channel, listener) {
  console.log(`Setting up listener for channel: ${channel}`);
  return originalOn.call(ipcRenderer, channel, (event, ...args) => {
    console.log(`Received event on channel ${channel} with args:`, JSON.stringify(args));
    return listener(event, ...args);
  });
};

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
      console.log(`Setting up exposed listener for channel: ${channel}`);
      ipcRenderer.on(channel, (event, arg) => {
        console.log(`Forwarding event on channel ${channel} with arg:`, arg);
        callback(arg);
      });
    },
    once: (channel, callback) => {
      ipcRenderer.once(channel, (event, arg) => callback(arg));
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
