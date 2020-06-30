export type ChocoLanguage = ('en');

export interface ChocoTranslationParams {
  [key: string]: string;
}

export type ChocoTranslationFunction = (params: ChocoTranslationParams) => string;

export interface ChocoTranslation {
  CHARACTER_LIST_VALIDATED: (string|ChocoTranslationFunction);
  CHARACTER_LIST_AWAITING_VALIDATION: (string|ChocoTranslationFunction);
  CHARACTER_INFO: (string|ChocoTranslationFunction);
}

export type ChocoTranslationKeys = keyof ChocoTranslation;
