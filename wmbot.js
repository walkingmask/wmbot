// wmbot
// A slack bot with GAS made for walkingmask.

// Check bot's ID
// https://api.slack.com/methods/users.list/test

// Check team domain
// "team-domain".slack.com

// Receive
function doPost(e) {
  wmManage(e);
}

// Manage
function wmManage(e) {

  // Authentication
  var userInfo = wmAuth(e.parameter.team_domain,e.parameter.token,e.parameter.channel_name,e.parameter.user_name);
  if (!userInfo.auth) {
    return;
  }
  
  // Switch
  var args = e.parameter.text.split(" ").slice(1);
  wmSwitch(args,userInfo);
}

// Authentication
function wmAuth(domain, token, channel, name) {

  var userInfo = { auth: false };
  
  var scriptProperties = PropertiesService.getScriptProperties();
  var allExistProperties = scriptProperties.getProperties();
  
  for (var prop in allExistProperties) {
    
    // check domain name
    if (domain === prop) {
      
      // check propertie
      var propInfo = allExistProperties[prop].split(',');
      if (typeof(propInfo[0]) === "undefined" || typeof(propInfo[1]) === "undefined") {
        break;
      }
      
      // check token
      if (propInfo[0] !== token) {
        break;
      }
      
      // set user info
      userInfo = {
        auth: true,
        domain: domain,
        authToken: propInfo[0],
        token: propInfo[1],
        channel: channel,
        name: name,
        dc: scriptProperties.getProperty('dc_'+domain+'_'+channel)
      };
      
      break;
    }
  }
  
  return userInfo;
}

// Switch
function wmSwitch(args, userInfo) {
  
  // show usage
  if (typeof(args[0]) === "undefined") {
    wmUsage(userInfo,0,":scream:Oops! Please specify some arguments.");
  }
  else if (args[0] === "-h") {
    wmUsage(userInfo,0);
  }
  else if (args[0] === "help" || args[0] === "--help") {
    wmUsage(userInfo,1);
  }
  // default command setting
  else if (args[0] === "default") {
    wmDefaultCommandSetting(args.slice(1),userInfo);
  }
  // launch command or default command
  else {
    wmLaunchCommand(args[0],args.slice(1),userInfo);
  }
}

function wmDefaultCommandSetting(args, userInfo) {

  var text = "";
  
  // Setting
  if (typeof(args[0]) !== "undefined") {
    // Set
    if (args[0] === "set" ){
      if (typeof(args[1]) !== "undefined") {
        if (wmIsCommand(args[1])) {
          text = "OK! I set up default command.";
          userInfo.dc = args[1];
          PropertiesService.getScriptProperties().setProperty('dc_'+userInfo.domain+'_'+userInfo.channel,userInfo.dc);
        }
        else {
          text = "Oops! \""+args[1]+"\" is not a command. Please specify correct command name.\n";
        }
      }
      else {
        text = "Oops! Please specify the one of command name.\n";
      }
    }
    // List
    else if (args[0] === "list"){
      text = "OK! Here is command list.\n";
      text += wmGetAllCommandsList().join("\n");
    }
  }
  // Initialization
  else {
    if (userInfo.dc === null) {
      text = ":smile:Hi! I'm wmbot. This is *initialization of default command setting*.\n";
      text += ":white_check_mark:*Please run again \"default\" command as \"@wmbot default set commandname\"*.\n";
      text += ":white_check_mark:And then, I'll *set the specified command as a default command*.\n";
      text += ":bulb:If you want to know what about me, default command, please type \"@wmbot help\".\n";
      text += ":bulb:If you want the list of commands, please type \"@wmbot default list\".";
      userInfo.dc = "Init";
      PropertiesService.getScriptProperties().setProperty('dc_'+userInfo.domain+'_'+userInfo.channel,userInfo.dc);
    }
    else {
      text = "Oops! It is incorrect argument.\n";
      text += ":point_right:Usage: @wmbot default { set commandname | list }";
    }
  }
  
  post2Slack(userInfo,text);
}

// Launch
function wmLaunchCommand(commandName, args, userInfo) {

  var text = "";

  // check command existence
  var defaultFlag = !wmIsCommand(commandName);
  
  // set default command
  if (defaultFlag) {
    args = (commandName+" "+args.join(" ")).split(" ");
    commandName = userInfo.dc;
  }
  
  // if default command is unset
  if (commandName === null) {
    text = "Oops! Specified command is not found and default command is usset. Please run \"@wmbot help\".";
    post2Slack(userInfo,text);
    return;
  }
  
  // launch
  if (commandName === 'Init') {
    if (userInfo.dc === 'Init') {
      text = "Oops! You sounds like still the middle of the initialization process.\n";
      text += "Please continue the initialization process if you want to use the default command.";
    }
    else {
      text = "Sorry, this command only use for default command setting.";
    }
    post2Slack(userInfo,text);
  }
  else {
    wmCommandLauncher(userInfo,commandName,args);
  }
}

function wmGetAllCommandsList() {
  var commands = PropertiesService.getScriptProperties().getProperty("COMMAND_ALL");
  return commands.split(',');
}

function wmIsCommand(item) {
  var commands = wmGetAllCommandsList(), i;
  for (i=0; i<commands.length; i++) {
    if (item === commands[i]) {
      return true;
    }
  }
  return false;
}

function wmUsage(userInfo, level, comment) {

  var text = "";

  // simple
  if (level === 0) {
    text = ":point_right:Usage: @wmbot { [ help | command args... | default args... ] | [ args... ] }";
  }
  // detail
  else if (level === 1) {
    text = ":smile:Hi! This is wmbot detail usage.\n";
    text += ":bulb:1. Use some command...\n";
    text += "\t\"@wmbot commandname args...\"\n";
    text += ":bulb:2. List of available commands...\n";
    text += "\t\"@wmbot default list\"\n";
    text += ":bulb:3. Use default command, at first...\n";
    text += "\t\"@wmbot default\"\n";
    text += ":bulb:4. Set default command...\n";
    text += "\t\"@wmbot default set commandname\"\n";
    text += "\t and then, run \"@wmbot [ default command's argument]\"\n";
    text += ":bulb:5. Show command's help...\n";
    text += "\t\"@wmbot commandname help\"\n";
  }
  
  post2Slack(userInfo,text,comment);
}
