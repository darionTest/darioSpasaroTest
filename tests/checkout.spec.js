import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import CheckOutPage from '../pages/checkout';
import checkOutData from '../testData/checkoutData.json';

// Helper function to generate form data
const generateFormData = (userInfo) => {
  const currentYear = new Date().getFullYear();
  const expYear = (currentYear + 1).toString(); // Ensure the expiration year is greater than the current year
  const expMonth = faker.date.month({ context: 'wide' }); // Generate a month in long format, e.g., "January"

  return {
    fullName: userInfo.fullName,
    email: userInfo.email,
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zip: faker.location.zipCode(),
    nameOnCard: userInfo.fullName,
    creditCardNumber: faker.finance.creditCardNumber(),
    expMonth: expMonth,
    expYear: expYear,
    cvv: faker.finance.creditCardCVV(),
  };
};

test.describe('Checkout Tests', () => {
  let checkoutPage;
  const user = checkOutData.checkout.userInfo;

  // Before each test, navigate to the checkout page
  test.beforeEach(async ({ page }) => {
    checkoutPage = new CheckOutPage(page);
    await checkoutPage.navigate('/checkout');
  });

  // Positive test case: Successful checkout process
  test('Positive Case - Checkout', async () => {
    const formData = generateFormData(user);

    await checkoutPage.completeForm(formData);
    await checkoutPage.clickShippingCheckBox(true);
    await checkoutPage.clickUnderCheckOutButton();
    
    // Verify the order confirmation text is not empty and contains expected information
    const confirmationText = await checkoutPage.getOrderConfirmationText();
    expect(confirmationText).not.toBe('');
    expect(confirmationText).toContain('Order Confirmed!');
    expect(confirmationText).toContain('Order Number:');
    
    const orderNumberRegex = /\d+/;
    expect(orderNumberRegex.test(confirmationText)).toBe(true);
  });

  // Negative test case: Checkout fails due to the dialog box closure
  test('Negative Case - Checkout by closing dialog box', async () => {
    const formData = generateFormData(user);

    await checkoutPage.completeForm(formData);
    await checkoutPage.clickShippingCheckBox(false);
    await checkoutPage.clickUnderCheckOutButton();

    // Verify that a dialog appears with the expected error message
    const dialogPromise = await checkoutPage.getDialogPromise();
    const dialog = await dialogPromise;
    expect(dialog.message()).toBe('Shipping address same as billing checkbox must be selected.');
    await dialog.dismiss();
  });

  // Positive test case: Get all product prices and verify the total
  test('Positive Case - Get all product prices and verify total', async () => {
    const productPrices = await checkoutPage.getDesiredPrice('Product');
    const total = await checkoutPage.getTotalPrice();
    expect(productPrices).toEqual(total);
  });
});
