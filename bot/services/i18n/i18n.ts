import { ChocoLanguage, ChocoTranslation, ChocoTranslationKeys, i18nFunction } from './types';

const CACHED_TRANSLATIONS: {
  [key: string]: ChocoTranslation;
} = {
  en: require('./langs/en').TRANSLATION,
};

/**
 * Returns a message for the given language. Otherwise fallsback to english.
 *
 * @param key - the translation key.
 * @param lang - the translation language.
 * @param params - the translation params to interpolate.
 * @returns the translated message.
 */
export const i18n: i18nFunction = (key: ChocoTranslationKeys, lang: ChocoLanguage = 'en', params: any = {}) => {
  const TRANSLATIONS = CACHED_TRANSLATIONS[lang];
  const TRANSLATION = TRANSLATIONS[key];

  if (TRANSLATION) {
    if (typeof (TRANSLATION) === 'function') {
      return TRANSLATION(params, (key: ChocoTranslationKeys, params: any) => i18n(key, lang, params));
    }

    return TRANSLATION.replace(/{([^}]+)}/g, (match, group) => {
      return params[group] || match;
    });
  } else if (lang !== 'en') {
    return i18n(key, 'en', params);
  }

  throw new Error(`The following translated message doesn't exist. (${key})`);
}
