export type ChocoLanguage = ('en');

export type i18nFunction = (key: ChocoTranslationKeys, lang?: ChocoLanguage, params?: any) => string
export type i18nSimplifiedFunction = (key: ChocoTranslationKeys, params?: any) => string

export interface ChocoTranslationParams {
  [key: string]: any;
}

export type ChocoTranslationFunction = (params: ChocoTranslationParams, i18n: i18nSimplifiedFunction) => string;

export type ChocoTranslationValue = (string|ChocoTranslationFunction)

export interface ChocoTranslation {
  // -- Generic Messages
  ALMOST_THERE: ChocoTranslationValue;
  CODE: ChocoTranslationValue;

  // -- React Messages
  CHOCO_MESSAGE_DOES_NOT_EXIST: ChocoTranslationValue;
  CHOCO_UNKNOWN_REACTION_TYPE: ChocoTranslationValue;
  CHOCO_REACTION_TYPES: ChocoTranslationValue;

  // -- Config Parameters
  CHOCO_CONFIG_REQUIRES_SERVER: ChocoTranslationValue;
  CHOCO_CONFIG_INVALID_KEY: ChocoTranslationValue;

  CHOCO_CONFIG_REMOVE_SUCCESS: ChocoTranslationValue;
  CHOCO_CONFIG_SET_SUCCESS: ChocoTranslationValue;
  CHOCO_CONFIG_GET_SUCCESS: ChocoTranslationValue;
  CHOCO_CONFIG_GET_FAILURE: ChocoTranslationValue;
}

export type ChocoTranslationKeys = keyof ChocoTranslation;
