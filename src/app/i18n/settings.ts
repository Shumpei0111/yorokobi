export const defaultLanguage = "ja";
export const availableLanguages = [defaultLanguage, "en"] as const;
export const namespaces = ["home"] as const;

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
