import { ChocoCharacters } from './characters';

export class ChocoService {
    public characters: ChocoCharacters;

    constructor() {
        this.characters = new ChocoCharacters();
    }
}

export const choco = new ChocoService();