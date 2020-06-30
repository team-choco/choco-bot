import { ChocoStrings } from '@team-choco/utils';

import { ChocoTranslation } from '../types';
import { character } from '../../lodestone';

export const TRANSLATION: ChocoTranslation = {
  ALMOST_THERE: `Kweh! You're almost there!`,
  CODE: `Code`,

  CHOCO_CHARACTER_NOT_FOUND: `Oh no! That character doesn't exist in our records!`,
  CHOCO_AUTHOR_NO_CHARACTERS: `Oh no! Looks like you don't have any characters!`,
  CHOCO_USER_NO_CHARACTERS: `Oh no! That user doesn't have any characters!`,
  CHOCO_ALL_CHARACTERS_VALIDATED: `You don't have any characters left to validate`,
  CHOCO_CHARACTERS_BELONG_TO: ({ id }) => `Kweh! Here are the characters that belong to <@${id}>!`,

  CHOCO_CHARACTER_VALIDATED: `You've successfully validated your character!`,
  CHOCO_CHARACTERS_VALIDATED: `Kweh! You've successfully validated the following characters!`,
  CHOCO_CHARACTERS_AWAITING_VALIDATION: `The following characters are awaiting validation!`,
  CHOCO_CHARACTER_ALREADY_VALIDATED: `You've already validated this character!`,

  CHOCO_ADD_CHARACTER_CODE: ({ lodestone_id }) => (
    `Just add the code below to your [Character Profile](${character(lodestone_id)})!`
  ),

  CHOCO_CHARACTER_INFO: ({ name, server, lodestone_id, main }) => ChocoStrings.concat(' ', [
    `[${name} (${server})](https://na.finalfantasyxiv.com/lodestone/character/${lodestone_id}/)`,
    main && '**Main**',
  ]),

  CHOCO_CHARACTER_INFO_LIST: (params, i18n) => (
    `- ${i18n('CHOCO_CHARACTER_INFO', params)}`
  ),

  LODESTONE_NO_CHARACTERS_EXIST: `No characters exist with that name!`,
  LODESTONE_MULTIPLE_CHARACTERS_EXIST: `Multiple characters with the given name detected.`,
}
