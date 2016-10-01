# wmbot

A slack bot with GAS made for walkingmask.

## GOAL

- For personal use, but team members are possible to use.
- It be able to use in a different Team, all channels.
- High scalability.

# HOW TO USE

1. Create new "Bots" and set name, icon, etc.. and note API Token.
2. Create new "Outgoing WebHooks" and set below, and note Token.
  - channel : Any
  - URL : This script's Web Application URL
  - Trigger words : "@wmbot"
3. Set script properties, "TeamDomain : Outgoing WebHooks Token, Bots API Token".
4. Save script and update release number.
5. Start with mention to bot, "@wmbot help" recommended at the first.

- If you want to add new command, create the new property, scripts, and modify usage, etc...

## WHAT IS A COMMAND

- Command is a module of wmbot.
- It can be added, removed, set.
- If set the command, wmbot is used only in order to do that in set Team, channel.
- Command can use by passing its name as argument to wmbot.

## DEFAULT COMMAND

- Default command is shortcut form of the wmbot command.
- If you want to use command, specify its name like "@wmbot command args".
- As default command, you can use that comannd like "@wmbot args".
- Default command setting can change by "default" command.
- At first default command is empty.

## FLOW

1. Receive
  - catch the post data from slack via Outgoing Webhooks using doPost method.
  - through data to manager method.
1. Manage
  - contorl all function of wmbot.
  1. Authentication
    - get team domain, auth token and channel name.
    - if there is no team domain in properties, return silently.
    - if token is invalid, return silently.
    - else, set the user info (Team Domain, Auth Token, Bots Token, Channel Name, Default Service).
  1. Switch
      - if there is no args, args[1] is "-h", show simple usage.
      - if args[1] is "help", "--help", show detail help.
      - if args[1] is "default", move to default command setting method.
      - if args[1] is command name, launch it.
      - else, launch default command.
1. Default command setting
  - Initialization
    - if default command is unset, start initialization.
    - show how to set the default command and tips.
    - temporarily, default command change to "Init".
  - Set
    - "@wmbot default set command", set command as default.
  - List
    - show all available commands.
  - Usage
    - if argument is not specified or invalid, show usage.
1. Launch
  1. Command
    - launch specified command.
  1. Default command
    - launch default command.
    - if there is no setting of default command, move to default command setting initialization.
1. Usage
  - simple
  - detail
  - not command's help.

## NOTE

- All of the method here shoud be named "wm" at first of name, exclude "doPost".

## TODO

- Format messages(emoji, etc...)
- Create spreadsheet as a database, in order to improve the search of the info, when the list of property is bloated.

## REFERENCE

- [slackbot with gas](http://tech.camph.net/slack-bot-with-gas/)
- [a](https://beatsync.net/main/log20150926.html)
