import { ChocoTranslation } from '../types';
import { ChocoStrings } from '@team-choco/utils';

export const TRANSLATION: ChocoTranslation = {
  CHARACTER_LIST_VALIDATED: `Kweh! You've successfully validated the following characters!`,
  CHARACTER_LIST_AWAITING_VALIDATION: `The following characters are awaiting validation!`,
  CHARACTER_INFO: ({ name, server, lodestone_id, main }) => ChocoStrings.concat(' ', [
    `[${name} (${server})](https://na.finalfantasyxiv.com/lodestone/character/${lodestone_id}/)`,
    main && '**Main**',
  ]),
}
