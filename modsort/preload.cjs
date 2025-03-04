const { contextBridge, ipcRenderer } = require('electron');
const os = require('os');
const path = require('path');

// Log to confirm the script is running
console.log('Preload script is running!');

contextBridge.exposeInMainWorld('electron', {
  os: os,
  path: path,
  ipcRenderer: {
    on: (channel, func) => {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    },
    once: (channel, func) => {
      ipcRenderer.once(channel, (event, ...args) => func(...args));
    },
    send: (channel, ...args) => {
      ipcRenderer.send(channel, ...args);
    },
    invoke: (channel, ...args) => {
      return ipcRenderer.invoke(channel, ...args);
    }
  }
});

// Log to confirm the script has completed
console.log('API exposed successfully');
