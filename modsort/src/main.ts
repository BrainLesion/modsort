import { createApp } from 'vue';
import App from './App.vue';

import Buefy from 'buefy';
import './style.css';

import "@mdi/font/css/materialdesignicons.css";
import 'buefy/dist/buefy.css';

const app = createApp(App);

app.use(Buefy);

// First, check if electron is available
console.log('Checking if electron is available:', !!window.electron);
if (window.electron && window.electron.ipcRenderer) {
  console.log('Setting up ipcRenderer listener before mounting');
  window.electron.ipcRenderer.on('main-process-message', (message) => {
    console.log("Message received:", message);
  });
}

app.mount('#app');

// Also try setting up the listener after mounting
setTimeout(() => {
  console.log('Setting up delayed listener');
  if (window.electron && window.electron.ipcRenderer) {
    window.electron.ipcRenderer.on('main-process-message', (message) => {
      console.log("Delayed message received:", message);
    });
  } else {
    console.error('Electron APIs still not available after delay');
  }
}, 2000);
