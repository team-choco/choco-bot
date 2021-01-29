import { ChocoParameters } from './parameters';

export class ChocoService {
  public parameters: ChocoParameters;

  constructor() {
    this.parameters = new ChocoParameters();
  }
}

export const choco = new ChocoService();
