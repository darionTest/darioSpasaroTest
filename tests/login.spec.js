import { test, expect } from '@playwright/test';
import LoginPage from '../pages/login';
import loginData from '../testData/loginData.json';

test.describe('Login Tests', () => {
  let loginPage;

  // Before each test, navigate to the login page
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate('/login');
  });

  // Positive test case: Valid login credentials
  test('Positive Case - Login', async () => {
    const user = loginData.users.validUser;
    await loginPage.login(user.username, user.password);
    
    // Verify that the welcome message contains the expected text
    const welcomeMessage = await loginPage.getWelcomeMessage();
    expect(welcomeMessage).toContain(user.expectedText);
  });

  test('Negative Case - Invalid Credentials', async () => {
    const invalidUser = loginData.users.invalidUser;
    await loginPage.login(invalidUser.username, invalidUser.password);

    // Verify that the login error message contains the expected text
    const messageLocator = await loginPage.getLoginMessageLocator();
    await expect(messageLocator).toHaveText(invalidUser.expectedText);
  });

  test('Negative Case - Empty Credentials', async () => {
    const emptyUser = loginData.users.emptyUser;
    await loginPage.login(emptyUser.username, emptyUser.password);

    // Verify that the login error message contains the expected text
    const messageLocator = await loginPage.getLoginMessageLocator();
    await expect(messageLocator).toHaveText(emptyUser.expectedText);
  });
});
