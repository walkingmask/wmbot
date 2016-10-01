// wmbotTest

function wmTaestAll() {
  wmManageTestCorrect();
  //wmManageTestIncorrect();
  wmAuthTest();
  wmSwitchTest();
  wmDefaultCommandSettingTest();
  wmLaunchCommandTest();
}

function wmManageTestCorrect() {
  var correct_info = PropertiesService.getScriptProperties().getProperty("RUDT").split(",");
  var e_correct = {
    parameter : {
      team_domain : "RUDT",
      token : correct_info[0],
      channel_name : "bottest",
      user_name : "wmbot",
      text : "@wmbot -h"
    }
  }
  wmManage(e_correct);
}

function wmManageTestIncorrect() {
  var e_incorrect = {
    parameter : {
      team_domain : "rudt",
      token : "foobaa",
      channel_name : "bottest",
      user_name : "wmbot",
      text : "@wmbot -h"
    }
  }
  wmManage(e_incorrect);
}

function wmAuthTest() {
  var correct_info = PropertiesService.getScriptProperties().getProperty("RUDT").split(",");
  var e = {
    parameter : {
      team_domain : "RUDT",
      token : correct_info[0],
      channel_name : "bottest",
      user_name : "wmbot",
      text : "@wmbot -h"
    }
  }
  Logger.log(wmAuth(e.parameter.team_domain,e.parameter.token,e.parameter.channel_name,e.parameter.user_name));
}

function wmSwitchTest() {
  var prop = PropertiesService.getScriptProperties().getProperty("RUDT").split(",");
  var userInfo = {
    auth : true,
    domain: "RUDT",
    authToken: prop[0],
    token: prop[1],
    channel: "bottest",
    name: "wmbot",
    dc: PropertiesService.getScriptProperties().getProperty('dc_'+'RUDT'+'bottest')
  }
  wmSwitch("",userInfo);
  wmSwitch("-h".split(" "),userInfo);
}

function wmDefaultCommandSettingTest() {
  var prop = PropertiesService.getScriptProperties().getProperty("RUDT").split(",");
  var userInfo = {
    auth : true,
    domain: "RUDT",
    authToken: prop[0],
    token: prop[1],
    channel: "bottest",
    name: "wmbot",
    dc: PropertiesService.getScriptProperties().getProperty('dc_'+'RUDT'+'_'+'bottest')
  }
  // Init test
  PropertiesService.getScriptProperties().deleteProperty('dc_'+'RUDT'+'_'+'bottest');
  wmDefaultCommandSetting("list".split(" "),userInfo);
  // no args
  wmDefaultCommandSetting("",userInfo);
  // no args of set
  wmDefaultCommandSetting("set".split(" "),userInfo);
  // incorrect arg of set
  wmDefaultCommandSetting("set foo".split(" "),userInfo); 
  // list
  wmDefaultCommandSetting("list".split(" "),userInfo);
  // delete default command of test
  PropertiesService.getScriptProperties().deleteProperty('dc_'+'RUDT'+'_'+'bottest');
}

function wmLaunchCommandTest() {
  var prop = PropertiesService.getScriptProperties().getProperty("RUDT").split(",");
  var userInfo = {
    auth : true,
    domain: "RUDT",
    authToken: prop[0],
    token: prop[1],
    channel: "bottest",
    name: "wmbot",
    dc: PropertiesService.getScriptProperties().getProperty('dc_'+'RUDT'+'_'+'bottest')
  }
  // as default command
  wmLaunchCommand("foo","",userInfo);
}

function wmGetAllCommandsListTest() {
  Logger.log(wmGetAllCommandsList().join(" "));
}

function wmIsCommandTest() {
  Logger.log(wmIsCommand("Init"));
  Logger.log(wmIsCommand("foo"));
  Logger.log(wmIsCommand("lister"));
}

function wmUsageTest() {
  var prop = PropertiesService.getScriptProperties().getProperty("RUDT").split(",");
  var userInfo = {
    auth : true,
    domain: "RUDT",
    authToken: prop[0],
    token: prop[1],
    channel: "bottest",
    name: "wmbot",
    dc: PropertiesService.getScriptProperties().getProperty('dc_'+'RUDT'+'_'+'bottest')
  }
  wmUsage(userInfo, 0, "This is test.");
}
