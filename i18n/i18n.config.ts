import en from "./locales/en.json";
import ko from "./locales/ko.json";

export default defineI18nConfig(() => ({
  legacy: false,
  locale: "en",
  lazy: true,
  messages: {
    en,
    ko,
  },
}));
