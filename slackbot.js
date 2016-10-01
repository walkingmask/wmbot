// slackbot

function post2Slack(info, text, comment) {
  // formating
  if (typeof(comment) !== "undefined") {
    text = comment+"\n"+text;
  }
  // send
  var slackApp = SlackApp.create(info.token);
  slackApp.postMessage(info.channel, text, {as_user: true});
}

/*
post2Slack(info, usage(text), comment);
*/
function usage(text) {
  // fromating
  return ":point_right:Usage: "+text;
}

/*
post2Slack(info, error(text), comment);
*/
function error(text) {
  return ":scream:Oops! "+text;
}
