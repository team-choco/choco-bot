import { ChocoBotMessageOptions } from './utils/embeds';

export class ChocoCommandError extends Error {
    public messageOptions: ChocoBotMessageOptions;

    constructor(messageOptions: (string|ChocoBotMessageOptions)) {
        if (typeof(messageOptions) === 'string') {
            messageOptions = {
                content: messageOptions,
            };
        }

        super(messageOptions.content);

        this.messageOptions = messageOptions;
    }
}