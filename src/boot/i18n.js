import { createI18n } from 'vue-i18n';
import messages from '@/i18n';
import { Quasar } from 'quasar';

let locale;
if (Quasar.lang.getLocale() === 'de-DE' || Quasar.lang.getLocale() === 'de') {
  locale = 'de';
} else {
  locale = 'en-US';
}

const i18n = createI18n({
  legacy: false,
  locale,
  globalInjection: true,
  messages
});

export default ({ app }) => {
  // Tell app to use the I18n instance
  app.use(i18n);
};

export { i18n };
