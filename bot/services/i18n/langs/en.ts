import { ChocoTranslation } from '../types';

export const TRANSLATION: ChocoTranslation = {
  CHOCO_MESSAGE_DOES_NOT_EXIST: `Uh oh, looks like we couldn't find that message!`,
  CHOCO_UNKNOWN_REACTION_TYPE: ({ type }) => `Oh no! Looks like that reaction type doesn't exist! (${type})`,
  CHOCO_REACTION_TYPES: `Kweh! Here's a list of the available reactions!`,
}
