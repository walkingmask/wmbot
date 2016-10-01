// Use google document as list

function docslister(userInfo, args) {
  docslisterManage(userInfo, args);
}

function docslisterUsage(userInfo, err) {
  var text = ":point_right:Usage: lister { set DocsID | list | add text | rm num | help }";
  if (typeof(err) !== "undefined") {
    err = ":disappointed:error: "+err;
  }
  post2Slack(userInfo,text,err);
}

function docslisterManage(userInfo, args) {
  
  if (typeof(args[0]) === "undefined") {
    docslisterUsage(userInfo,"Oops! Please specify some arguments.");
    return;
  }
  docslisterSwitch(userInfo,args);
}

function docslisterSwitch(userInfo, args) {

  var docsID = "";
  
  // Set docs id
  if (args[0] === "set") {
    if (typeof(args[1]) === "") {
      post2Slack(userInfo,"Oops! There is no Docs ID. Please specify a Docs ID.");
      return;
    }
    PropertiesService.getScriptProperties().setProperty('dl_docsid_'+userInfo.domain+'_'+userInfo.channel,args[1]);
    post2Slack(userInfo,"OK! I set up Docs ID.");
    return;
  }
  // Auth
  else {
    docsID = PropertiesService.getScriptProperties().getProperty('dl_docsid_'+userInfo.domain+'_'+userInfo.channel);
    if (docsID === null) {
      post2Slack(userInfo,"Oops! Docs ID is uset. Please set Docs ID as \"lister set DocsID\".");
      return;
    }
  }
  
  var docs = DocumentApp.openById(docsID);
  var text = "";
  
  switch(args[0]) {
    case "list":
    case "l":
      text = docslisterShowList(docs);
      break;
    case "add":
    case "a":
      text = docslisterAdd(args.slice(1), docs);
      break;
    case "rm":
    case "r":
      text = docslisterRemove(args.slice(1), docs);
      break;
    case "help":
    case "h":
    default:
      docslisterUsage(userInfo);
      return;
      break;
  }
  
  post2Slack(userInfo,text);
}

function docslisterShowList(docs) {
  var textLines = docs.getBody().getText().split(/\n/);
  for (i = 0; i < textLines.length; i++) {
    textLines[i] = String(i+1)+". "+textLines[i];
  }
  return ":+1:Here is Docs List.\n"+textLines.join("\n");
}

function docslisterAdd(args, docs) {
  
  if (typeof(args[0]) === "undefined") {
    return "Please specify some items.";
  }
  docs.appendListItem(args.join(" ")).setGlyphType(DocumentApp.GlyphType.NUMBER);
  return ":wink:Added an item.";
}

function docslisterRemove(args, docs) {
  if (typeof(args[0]) === "undefined") {
    return "no specified items.";
  }
  
  var itemNum = parseInt(args[0]);
  if (isNaN(itemNum)) {
    return "item is not a number.";
  }
  
  var listItems = docs.getListItems();
  if (itemNum > listItems.length) {
    return "outrange number.";
  }
  
  if (itemNum === listItems.length) {
    var tempItem = listItems[itemNum-2].removeFromParent();
    docs.getBody().appendListItem(tempItem);
  }
  
  listItems[itemNum-1].removeFromParent();
  
  return ":stuck_out_tongue:Removed an item.";
}
