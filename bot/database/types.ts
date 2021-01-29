import { Sequelize } from 'sequelize-typescript';
import { Parameters } from './parameters';

export declare namespace Database {
  interface Options {
    /**
         * Whether we should include the models in the sequelize instance.
         *
         * @defaultValue false
         */
    excludeModels?: boolean;
  }

  interface Response {
    /**
         * The sequelize instance.
         */
    db: Sequelize;

    Parameters: typeof Parameters;
  }
}
