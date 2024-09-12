import en from "~/i18n/locales/en.json";
import ko from "~/i18n/locales/ko.json";

export default defineI18nConfig(() => ({
  legacy: false,
  locale: "en",
  lazy: true,
  messages: {
    en,
    ko,
  },
}));
