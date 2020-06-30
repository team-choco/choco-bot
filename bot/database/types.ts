import { Sequelize, Model, ModelCtor } from 'sequelize-typescript';
import { Characters } from './characters';

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

    Characters: ModelCtor<Model<Characters, any>>;
  }
}