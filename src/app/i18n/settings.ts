export const defaultLanguage = "ja";
export const availableLanguages = [defaultLanguage, "en"];
export const namespaces = ["home"];

export const getOptions = (lng: string = defaultLanguage) => {
  return {
    lng,
    defaultNS: defaultLanguage,
    fallbackLng: defaultLanguage,
    fallbackNS: namespaces[0],
    ns: namespaces,
    supportedLngs: availableLanguages,
  };
};
