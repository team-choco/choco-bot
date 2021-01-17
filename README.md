**NOTE: THIS BOT IS CURRENTLY UNDER HEAVY DEVELOPMENT, USE AT YOUR OWN RISK**

[![NPM Version][npm-version-image]][npm-url]
[![NPM Downloads][npm-downloads-image]][npm-url]

## @team-choco/choco-bot

> Kweh! Choco Bot is here for all your Final Fantasy XIV needs!

## Usage

<!-- 
```sh
# If you haven't already installed Choco Bot, if you 
# have then Choco Bot should update automatically!
$ npm install -g @team-choco/choco-bot-auto
$ choco-bot-auto --token <your-discord-token>
``` 
-->

```sh
$ npm install -g @team-choco/choco-bot
$ choco-bot --token <your-discord-token>
```

## Options

All options have the following order of priority.

```
<-- More Specific ------- Less Specific -->

Arguments > Environment Variables > Default
```

So if you specify an Argument and a Environment Variable, the argument wins.

### Database URL

| **Description** | Specify the Database Connection URL |
|:-- |:-- |
| **Argument** | `--database-url` |
| **Environment Variable** | `CHOCO_BOT_DATABASE_URL` |
| **Default Value** | `sqlite://:memory` |
| **Optional** | _Yes_ |

### Discord Token

| **Description** | The Discord Token |
|:-- |:-- |
| **Argument** | `--discord-token` |
| **Environment Variable** | `CHOCO_BOT_DISCORD_TOKEN` |
| **Default Value** | `<null>` |
| **Optional** | Only if the platform isn't `discord`. |

### XIV API Token

| **Description** | The Token for [XIV API](https://xivapi.com) |
|:-- |:-- |
| **Argument** | `--xivapi-token` |
| **Environment Variable** | `CHOCO_BOT_XIVAPI_TOKEN` |
| **Default Value** | `<null>` |
| **Optional** | Yes (Throttles the number of requests) |

### Platform

| **Description** | The platform to run on. (`shell` or `discord`) |
|:-- |:-- |
| **Argument** | `--platform` |
| **Environment Variable** | `CHOCO_BOT_PLATFORM` |
| **Default Value** | `shell` |
| **Optional** | Yes |

### Log Level

| **Description** | The level of log output to provide. (`trace`, `info`, `warn`, `error`) |
|:-- |:-- |
| **Argument** | `--log-level` |
| **Environment Variable** | `CHOCO_BOT_LOG_LEVEL` |
| **Default Value** | `info` |
| **Optional** | Yes |

<!--
### Adding Choco Bot to your server!

Choco Bot would like to join the party! Click [here](#todo) to accept!

### Running a dedicated version!

```sh
# If you haven't already installed Choco Bot, if you 
# have then Choco Bot should update automatically!
$ npm install -g @team-choco/choco-bot
$ choco-bot --token <your-discord-token>
```
-->

[npm-version-image]: https://img.shields.io/npm/v/@team-choco/choco-bot.svg?style=flat
[npm-downloads-image]: https://img.shields.io/npm/dm/@team-choco/choco-bot.svg?style=flat
[npm-url]: https://npmjs.org/package/@team-choco/choco-bot
