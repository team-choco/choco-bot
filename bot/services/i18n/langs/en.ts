import { ChocoTranslation } from '../types';

export const TRANSLATION: ChocoTranslation = {
  CHOCO_MESSAGE_DOES_NOT_EXIST: `Uh oh, looks like we couldn't find that message!`,
  CHOCO_UNKNOWN_REACTION_TYPE: ({ type }) => `Oh no! Looks like that reaction type doesn't exist! (${type})`,
  CHOCO_REACTION_TYPES: `Kweh! Here's a list of the available reactions!`,

  CHOCO_CONFIG_REQUIRES_SERVER: `This command only works within a server.`,
  CHOCO_CONFIG_INVALID_KEY: `Please provide a valid key.`,

  CHOCO_CONFIG_REMOVE_SUCCESS: ({ key }) => `"${key}" has been deleted`,
  CHOCO_CONFIG_SET_SUCCESS: ({ key }) => `Successfully updated "${key}"!`,
  CHOCO_CONFIG_GET_SUCCESS: ({ key, value }) => `"${key}" is currently set to "${value}".`,
  CHOCO_CONFIG_GET_FAILURE: ({ key }) => `"${key}" isn't currently set.`,
}
