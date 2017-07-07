
var loginCommands = {
  submit: function(UN,PS) {
    this.api.pause(1000);
    return this.
    waitForElementVisible('@Submit', 1000).
    setValue('@Username',UN).
    setValue('@password',PS).
    click('@Submit').
    waitForElementNotPresent('@Submit',5000);
  }
};
module.exports = {
  url: 'https://analytics.staging.boxxspring.com/',
  commands: [loginCommands],
  elements: {
    Username: 'input[name=username]',
    password: 'input[name=password]',
    Submit: 'input[name=commit]',
    forgetPassword: "//A[@class='forgot-password-link'][text()='Forgot password?']"
  }
};