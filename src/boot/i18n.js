import { createI18n } from 'vue-i18n';
import messages from '@/i18n';
import { Quasar } from 'quasar';

export default ({ app }) => {
  // Create I18n instance
  const i18n = createI18n({
    legacy: false,
    locale: Quasar.lang.getLocale(),
    globalInjection: true,
    messages
  });

  // Tell app to use the I18n instance
  app.use(i18n);
};
