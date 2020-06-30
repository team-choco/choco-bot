import { ChocoLanguage, ChocoTranslation, ChocoTranslationKeys } from './types';

const CACHED_TRANSLATIONS: {
  [key: string]: ChocoTranslation;
} = {};

/**
 * Returns a message for the given language. Otherwise fallsback to english.
 *
 * @param key - the translation key.
 * @param lang - the translation language.
 * @param params - the translation params to interpolate.
 * @returns the translated message.
 */
export function i18n(key: ChocoTranslationKeys, lang: ChocoLanguage = 'en', params: any = {}): string {
  if (!CACHED_TRANSLATIONS[lang]) {
    CACHED_TRANSLATIONS[lang] = require(`./langs/${lang}`).TRANSLATION;
  }

  const TRANSLATIONS = CACHED_TRANSLATIONS[lang];
  const TRANSLATION = TRANSLATIONS[key];

  if (TRANSLATION) {
    if (typeof (TRANSLATION) === 'function') {
      return TRANSLATION(params);
    }

    return TRANSLATION.replace(/{([^}]+)}/g, (match, group) => {
      return params[group] || match;
    });
  } else if (lang !== 'en') {
    return i18n(key, 'en', params);
  }

  throw new Error(`The following translated message doesn't exist. (${key})`);
}
