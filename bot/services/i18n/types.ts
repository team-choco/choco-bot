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

  // -- Internal Character Messages
  CHOCO_CHARACTER_NOT_FOUND: ChocoTranslationValue;
  CHOCO_AUTHOR_NO_CHARACTERS: ChocoTranslationValue;
  CHOCO_USER_NO_CHARACTERS: ChocoTranslationValue;
  CHOCO_ALL_CHARACTERS_VALIDATED: ChocoTranslationValue;
  CHOCO_CHARACTERS_BELONG_TO: ChocoTranslationValue;

  CHOCO_CHARACTER_VALIDATED: ChocoTranslationValue;
  CHOCO_CHARACTERS_VALIDATED: ChocoTranslationValue;
  CHOCO_CHARACTERS_AWAITING_VALIDATION: ChocoTranslationValue;
  CHOCO_CHARACTER_ALREADY_VALIDATED: ChocoTranslationValue;

  CHOCO_ADD_CHARACTER_CODE: ChocoTranslationValue;
  CHOCO_CHARACTER_INFO: ChocoTranslationValue;
  CHOCO_CHARACTER_INFO_LIST: ChocoTranslationValue;

  // -- Lodestone Character Messages
  LODESTONE_NO_CHARACTERS_EXIST: ChocoTranslationValue;
  LODESTONE_MULTIPLE_CHARACTERS_EXIST: ChocoTranslationValue;
}

export type ChocoTranslationKeys = keyof ChocoTranslation;
