function wmCommandLauncher(userInfo, commandName, args) {
  switch (commandName) {
    case 'lister':
      docslister(userInfo,args);
      break;
    case 'test':
      post2Slack(userInfo,"This is test command.");
      break;
    default:
      // unexpected error
      text = "Oops! Unexpected error occurred. Please run \"@wmbot help\".";
      post2Slack(userInfo,text);
      break;
  }
}
