function docslisterTestAll() {
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
  var docsID = "****************************************";
  var docs = DocumentApp.openById(docsID);
  docslisterUsageTest(userInfo);
  docslisterManageTest(userInfo);
  docslisterSwitchTest(userInfo,docsID);
  docslisterShowListTest(docs);
  docslisterAddTest(docs);
  docslisterRemoveTest(docs);
}

function docslisterUsageTest(userInfo) {
  docslisterUsage(userInfo,"This is test message.");
}

function docslisterManageTest(userInfo){
  docslisterManage(userInfo,[]);
  docslisterManage(userInfo,["list"]);
}

function docslisterSwitchTest(userInfo, docsID){
  PropertiesService.getScriptProperties().deleteProperty('dl_docsid_'+userInfo.domain+''+userInfo.channel);
  docslisterSwitch(userInfo,["list"]);
  docslisterSwitch(userInfo,["set"]);
  docslisterSwitch(userInfo,["set",docsID]);
  docslisterSwitch(userInfo,["list"]);
  PropertiesService.getScriptProperties().deleteProperty('dl_docsid_'+userInfo.domain+''+userInfo.channel);
}

function docslisterShowListTest(docs) {
  Logger.log(docslisterShowList(docs));
}

function docslisterAddTest(docs) {
  Logger.log(docslisterAdd([], docs));
  Logger.log(docslisterAdd(["This","is","test."], docs));
}

function docslisterRemoveTest(docs) {
  Logger.log(docslisterRemove([], docs));
  Logger.log(docslisterRemove(["m"], docs));
  Logger.log(docslisterRemove(["20"], docs));
  Logger.log(docslisterRemove(["3"], docs));
}

