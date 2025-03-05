import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import * as os from 'os';
import * as path from 'path';

// Define valid channels for security
const validChannels = ['main-process-message', 'copyNiiComplete', 'createFileComplete', 'copyNii', 'createFile', 'message-from-renderer'];

// Properly type the callback functions
type IpcCallback = (arg: any) => void;
type IpcRendererCallback = (event: IpcRendererEvent, ...args: any[]) => void;

// Create a map to store wrapped callback references with proper typing
const callbackMap = new Map<IpcCallback, IpcRendererCallback>();

// Expose APIs to the renderer process
contextBridge.exposeInMainWorld('electron', {
  os: {
    type: () => os.type(),
    release: () => os.release(),
    platform: () => os.platform()
  },
  path: {
    sep: path.sep,
    join: (...args: string[]) => path.join(...args),
    dirname: (p: string) => path.dirname(p),
    basename: (p: string) => path.basename(p),
    normalize: (p: string) => path.normalize(p)
  },
  ipcRenderer: {
    on: (channel: string, callback: IpcCallback) => {
      if (validChannels.includes(channel)) {
        // Add underscore to unused 'event' parameter
        const wrappedCallback: IpcRendererCallback = (_event, arg) => callback(arg);
        callbackMap.set(callback, wrappedCallback);
        ipcRenderer.on(channel, wrappedCallback);
      }
    },
    once: (channel: string, callback: IpcCallback) => {
      if (validChannels.includes(channel)) {
        // Add underscore to unused 'event' parameter
        const wrappedCallback: IpcRendererCallback = (_event, arg) => callback(arg);
        callbackMap.set(callback, wrappedCallback);
        ipcRenderer.once(channel, wrappedCallback);
      }
    },
    off: (channel: string, callback: IpcCallback) => {
      if (validChannels.includes(channel)) {
        const wrappedCallback = callbackMap.get(callback);
        if (wrappedCallback) {
          ipcRenderer.removeListener(channel, wrappedCallback);
          callbackMap.delete(callback);
        }
      }
    },
    send: (channel: string, ...args: any[]) => {
      if (validChannels.includes(channel)) {
        ipcRenderer.send(channel, ...args);
      }
    },
    invoke: (channel: string, ...args: any[]) => {
      if (validChannels.includes(channel)) {
        return ipcRenderer.invoke(channel, ...args);
      }
      return Promise.reject(new Error(`Channel "${channel}" is not allowed`));
    }
  }
});

console.log('Preload script executed successfully');
