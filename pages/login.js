import BasePage from './base';

class Login extends BasePage {
  constructor(page) {
    super(page);

    // Page Selectors for the login elements
    this.usernameField = "#username"; // Selector for the username input field
    this.passwordField = "#password"; // Selector for the password input field
    this.signinButton = "#signin-button"; // Selector for the sign-in button
    this.message = "#message"; // Selector for the error message
    this.welcomeMessage = "#welcome-message"; // Selector for the welcome message
  }

  /**
   * Perform the login action by filling the username and password fields and clicking the sign-in button.
   * @param {string} user - The username to input.
   * @param {string} password - The password to input.
   */
  async login(user, password) {
    // Fill the username field with the provided username
    await super.fill(this.usernameField, user);
    // Fill the password field with the provided password
    await super.fill(this.passwordField, password);
    // Click the sign-in button to attempt login
    await super.click(this.signinButton);
  }

  /**
   * Retrieve the welcome message after a successful login.
   * @returns {Promise<string>} The text content of the welcome message.
   */
  async getWelcomeMessage() {
    // Wait for the welcome message to become visible
    await super.waitForSelector(this.welcomeMessage, { state: 'visible' });
    // Get and return the text content of the welcome message
    return await super.getText(this.welcomeMessage);
  }

  /**
   * Retrieve the locator for the login error message element.
   * @returns {Promise<Locator>} The locator for the error message element.
   */
  async getLoginMessageLocator() {
    // Wait for the error message to become visible
    await super.waitForSelector(this.message, { state: 'visible' });
    // Locate and return the error message element
    const messageLocator = await this.page.locator(this.message);
    return messageLocator;
  }
}

export default Login;
