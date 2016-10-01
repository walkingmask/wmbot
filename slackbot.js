function post2Slack(info, text, comment) {
  // formating
  if (typeof(comment) !== "undefined") {
    text = comment+"\n"+text;
  }
  // send
  var slackApp = SlackApp.create(info.token);
  slackApp.postMessage(info.channel, text, {as_user: true});
}
