import { createApp } from 'vue';
import { Quasar, Notify } from 'quasar';
import i18n from '@/boot/i18n.js';
import de from 'quasar/lang/de';
import en from 'quasar/lang/en-US';
import { createPinia } from 'pinia';

// Import icon libraries
import '@quasar/extras/roboto-font/roboto-font.css';
import '@quasar/extras/material-icons/material-icons.css';
import '@quasar/extras/mdi-v6/mdi-v6.css';

// A few examples for animations from Animate.css:
// import @quasar/extras/animate/fadeIn.css
// import @quasar/extras/animate/fadeOut.css

// Import Quasar css
import 'quasar/src/css/index.sass';

// Assumes your root component is App.vue
// and placed in same folder as main.js
import App from '@/App.vue';

const app = createApp(App);
const pinia = createPinia();

app.use(Quasar, {
  plugins: {
    Notify
  },
  config: {
    notify: { /* look at QuasarConfOptions from the API card */ }
  },
  lang: Quasar.lang.getLocale() === 'de-DE' ? de : en
});

i18n({ app });
app.use(pinia);

// Assumes you have a <div id="app"></div> in your index.html
app.mount('#app');
