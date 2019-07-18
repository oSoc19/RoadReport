// Localization
export const Localization = {
    locales: {},
    init: function(config) {
      this.currentLocale = config.currentLocale || config.fallbackLocale;
      this.fallbackLocale = config.fallbackLocale;
      this.locales = config.dictionary;
    },
    setLocale: function(locale) {
      this.currentLocale = locale;
    },
    getTranslation: function(key) {
      return (
        this.locales[this.currentLocale][key] ||
        this.locales[this.fallbackLocale][key]
      );
    }
  };
  
  // Translation
  export const t = function(key, mapping) {
    if (key) {
      key = key.toLowerCase();
    }
    if (!mapping) {
      return Localization.getTranslation(key);
    } else {
      let translation = Localization.getTranslation(key);
      // replace mapping values
      Object.keys(mapping).forEach(key => {
        translation = translation.replace("{" + key + "}", mapping[key]);
      });
      return translation;
    }
  };