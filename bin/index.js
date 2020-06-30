#!/usr/bin/env node

const yargs = require('yargs');

const { argv } = yargs.option('database-url', {
  type: 'string',
  description: 'Specify the Database Connection URL.',
}).option('discord-token', {
  type: 'string',
  description: 'The discord token.',
}).option('xivapi-token', {
  type: 'string',
  description: 'The Token for https://xivapi.com.',
}).option('platform', {
  type: 'string',
  choices: [
    'discord',
    'shell',
  ],
  description: 'The platform to run on.',
}).option('log-level', {
  type: 'string',
  choices: [
    'trace',
    'info',
    'warn',
    'error',
  ],
  description: 'The level of log output to provide.',
});

if (!argv.help && !argv.version) {
  const { start } = require('../dist/choco-bot');

  start({
    databaseUrl: argv['database-url'],
    discordToken: argv['discord-token'],
    xivapiToken: argv['xivapi-token'],
    platform: argv.platform,
    logLevel: argv['log-level'],
  });
}

