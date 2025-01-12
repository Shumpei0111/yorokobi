export const defaultLanguage = "ja";
export const availableLanguages = [defaultLanguage, "en"] as const;
export const namespaces = ["common", "home", "taste-diagnosis"] as const;

export type Language = (typeof availableLanguages)[number];

export const getOptions = (lng: Language = defaultLanguage) => {
  return {
    lng,
    defaultNS: defaultLanguage,
    fallbackLng: defaultLanguage,
    fallbackNS: namespaces[0],
    ns: namespaces,
    supportedLngs: availableLanguages,
  };
};
