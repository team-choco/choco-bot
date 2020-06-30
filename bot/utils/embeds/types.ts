import { ChocoEmbedField, ChocoEmbedFooter } from '@team-choco/core';

export interface ChocoBotMessageOptions {
  /**
   * The message title.
   */
  title?: (string|string[]);

  /**
   * The message content.
   */
  content?: string;

  /**
   * The key-value fields.
   */
  fields?: ChocoEmbedField[];

  /**
   * The message footer.
   */
  footer?: ChocoEmbedFooter;
}
