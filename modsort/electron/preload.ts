import { contextBridge, ipcRenderer } from 'electron';
import * as os from 'os';
import * as path from 'path';

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('ipcRenderer', {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args;
    return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args));
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args;
    return ipcRenderer.off(channel, ...omit);
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args;
    return ipcRenderer.send(channel, ...omit);
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args;
    return ipcRenderer.invoke(channel, ...omit);
  },

  // You can expose other APIs you need here.
  // ...
});

// Expose os and path modules
contextBridge.exposeInMainWorld('electron', {
  os: os,
  path: path,
  ipcRenderer: {
    on: (...args) => ipcRenderer.on(...args),
    off: (...args) => ipcRenderer.off(...args),
    send: (...args) => ipcRenderer.send(...args),
    invoke: (...args) => ipcRenderer.invoke(...args),
  }
});
