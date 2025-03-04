import { createApp } from 'vue';
import App from './App.vue';

import Buefy from 'buefy';
import './style.css';

import "@mdi/font/css/materialdesignicons.css";
import 'buefy/dist/buefy.css';

const app = createApp(App);

app.use(Buefy);

app.mount('#app').$nextTick(() => {
  // Use contextBridge
  window.ipcRenderer.on('main-process-message', (_event, message) => {
    console.log(message)
  })
})
