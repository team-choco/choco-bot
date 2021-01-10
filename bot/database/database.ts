import { Sequelize } from 'sequelize-typescript';

import { CONFIG } from '../config';

import { Database } from './types';
import { logger } from '../utils/logger';
import { Characters } from './characters';

const Models: any[] = [
  Characters,
];

export async function database(options: Database.Options = {}): Promise<Database.Response> {
  const db = new Sequelize(CONFIG.DATABASE_URL, {
    logging: logger.trace.bind(logger),
    typeValidation: true,
    define: {
      timestamps: false,
    },
    models: options.excludeModels ? [] : Models,
  });

  logger.trace('Authenticating...');
  await db.authenticate();
  logger.trace('Syncing database...');
  await db.sync({ alter: true });

  return {
    db,
    Characters,
  };
}
