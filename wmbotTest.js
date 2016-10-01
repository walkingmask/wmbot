function wmTestAll() {
  doPostTest();
  wmManageTestCorrect();
  //wmManageTestIncorrect();
  wmAuthTest();
  wmSwitchTest();
  wmDefaultCommandSettingTest();
  wmLaunchCommandTest();
  wmGetAllCommandsListTest();
  wmIsCommandTest();
  wmUsageTest();
  wmCommandLauncherTest();
}

function doPostTest() {
  var correct_info = PropertiesService.getScriptProperties().getProperty("rudt").split(",");
  var e = {
    parameter : {
      team_domain : "rudt",
      token : correct_info[0],
      channel_name : "bottest",
      user_name : "wmbot",
      text : "@wmbot -h"
    }
  }
  doPost(e);
}

function wmManageTestCorrect() {
  var correct_info = PropertiesService.getScriptProperties().getProperty("rudt").split(",");
  var e_correct = {
    parameter : {
      team_domain : "rudt",
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
  var correct_info = PropertiesService.getScriptProperties().getProperty("rudt").split(",");
  var e = {
    parameter : {
      team_domain : "rudt",
      token : correct_info[0],
      channel_name : "bottest",
      user_name : "wmbot",
      text : "@wmbot -h"
    }
  }
  Logger.log(wmAuth(e.parameter.team_domain,e.parameter.token,e.parameter.channel_name,e.parameter.user_name));
}

function wmSwitchTest() {
  var prop = PropertiesService.getScriptProperties().getProperty("rudt").split(",");
  var userInfo = {
    auth : true,
    domain: "rudt",
    authToken: prop[0],
    token: prop[1],
    channel: "bottest",
    name: "wmbot",
    dc: PropertiesService.getScriptProperties().getProperty('dc_'+'rudt'+'bottest')
  }
  wmSwitch("",userInfo);
  wmSwitch("-h".split(" "),userInfo);
}

function wmDefaultCommandSettingTest() {
  var prop = PropertiesService.getScriptProperties().getProperty("rudt").split(",");
  var userInfo = {
    auth : true,
    domain: "rudt",
    authToken: prop[0],
    token: prop[1],
    channel: "bottest",
    name: "wmbot",
    dc: PropertiesService.getScriptProperties().getProperty('dc_'+'rudt'+'_'+'bottest')
  }
  // list
  wmDefaultCommandSetting("list".split(" "),userInfo);
  // Init test
  PropertiesService.getScriptProperties().deleteProperty('dc_'+'rudt'+'_'+'bottest');
  wmDefaultCommandSetting("",userInfo);
  // no args
  wmDefaultCommandSetting("",userInfo);
  // no args of set
  wmDefaultCommandSetting("set".split(" "),userInfo);
  // incorrect arg of set
  wmDefaultCommandSetting("set foo".split(" "),userInfo); 
  // delete default command of test
  PropertiesService.getScriptProperties().deleteProperty('dc_'+'rudt'+'_'+'bottest');
}

function wmLaunchCommandTest() {
  var prop = PropertiesService.getScriptProperties().getProperty("rudt").split(",");
  var userInfo = {
    auth : true,
    domain: "rudt",
    authToken: prop[0],
    token: prop[1],
    channel: "bottest",
    name: "wmbot",
    dc: PropertiesService.getScriptProperties().getProperty('dc_'+'rudt'+'_'+'bottest')
  }
  // as default command
  wmLaunchCommand("foo","",userInfo);
  // Init
  wmDefaultCommandSetting("list".split(" "),userInfo);
  PropertiesService.getScriptProperties().deleteProperty('dc_'+'rudt'+'_'+'bottest');
  wmLaunchCommand("","",userInfo);
}

function wmGetAllCommandsListTest() {
  Logger.log(wmGetAllCommandsList().join(" "));
}

function wmIsCommandTest() {
  Logger.log(wmIsCommand("Init"));
  Logger.log(wmIsCommand("foo"));
  Logger.log(wmIsCommand("lister"));
  Logger.log(wmIsCommand("test"));
}

function wmUsageTest() {
  var prop = PropertiesService.getScriptProperties().getProperty("rudt").split(",");
  var userInfo = {
    auth : true,
    domain: "rudt",
    authToken: prop[0],
    token: prop[1],
    channel: "bottest",
    name: "wmbot",
    dc: PropertiesService.getScriptProperties().getProperty('dc_'+'rudt'+'_'+'bottest')
  }
  wmUsage(userInfo, 0, "This is test.");
  wmUsage(userInfo, 1, "This is test.");
}

function wmCommandLauncherTest() {
  var prop = PropertiesService.getScriptProperties().getProperty("rudt").split(",");
  var userInfo = {
    auth : true,
    domain: "rudt",
    authToken: prop[0],
    token: prop[1],
    channel: "bottest",
    name: "wmbot",
    dc: PropertiesService.getScriptProperties().getProperty('dc_'+'rudt'+'_'+'bottest')
  }
  wmCommandLauncher(userInfo,"test",[]);
  wmCommandLauncher(userInfo,"lister",[]);
}
