import BasePage from './base';

class Checkout extends BasePage {
  constructor(page) {
    super(page);

    // Page Selectors for the checkout form elements
    this.fullName = "#fname"; // Selector for the full name input field
    this.email = "#email"; // Selector for the email input field
    this.address = "#adr"; // Selector for the address input field
    this.city = "#city"; // Selector for the city input field
    this.state = "#state"; // Selector for the state input field
    this.zip = "#zip"; // Selector for the ZIP code input field
    this.nameOnCard = "#cname"; // Selector for the name on card input field
    this.creditCardNumber = "#ccnum"; // Selector for the credit card number input field
    this.expMonth = "#expmonth"; // Selector for the credit card expiration month dropdown
    this.expYear = "#expyear"; // Selector for the credit card expiration year input field
    this.cvv = "#cvv"; // Selector for the CVV input field
    this.shippingCheckbox = 'input[type="checkbox"][name="sameadr"]'; // Selector for the shipping address checkbox
    this.checkOutButton = 'button.btn:has-text("Continue to checkout")'; // Selector for the checkout button
    this.orderConfirmation = '#order-confirmation'; // Selector for the order confirmation message
    this.totalPriceLocator = 'p:has-text("Total") .price'; // Selector for the total price element
  }

  /**
   * Completes the checkout form with the provided data.
   * @param {Object} formData - The data to fill the form with.
   * @param {string} formData.fullName - The full name.
   * @param {string} formData.email - The email address.
   * @param {string} formData.address - The street address.
   * @param {string} formData.city - The city name.
   * @param {string} formData.state - The state name.
   * @param {string} formData.zip - The postal code.
   * @param {string} formData.nameOnCard - The name on the credit card.
   * @param {string} formData.creditCardNumber - The credit card number.
   * @param {string} formData.expMonth - The credit card expiration month.
   * @param {string} formData.expYear - The credit card expiration year.
   * @param {string} formData.cvv - The CVV of the credit card.
   */
  async completeForm(formData) {
    // Fill each field in the checkout form with the provided data
    await super.fill(this.fullName, formData.fullName);
    await super.fill(this.email, formData.email);
    await super.fill(this.address, formData.address);
    await super.fill(this.city, formData.city);
    await super.fill(this.state, formData.state);
    await super.fill(this.zip, formData.zip);
    await super.fill(this.nameOnCard, formData.nameOnCard);
    await super.fill(this.creditCardNumber, formData.creditCardNumber);
    await super.selectByText(this.expMonth, formData.expMonth);
    await super.fill(this.expYear, formData.expYear);
    await super.fill(this.cvv, formData.cvv);
  }

  /**
   * Toggles the shipping address checkbox based on the provided boolean value.
   * @param {boolean} boolean - Whether to check or uncheck the checkbox.
   */
  async clickShippingCheckBox(boolean) {
    // Check or uncheck the shipping address checkbox based on the boolean value
    const isChecked = await this.page.isChecked(this.shippingCheckbox);
    if (boolean && !isChecked) await this.page.check(this.shippingCheckbox);
    if (!boolean && isChecked) await this.page.uncheck(this.shippingCheckbox);
  }

  /**
   * Clicks the checkout button to proceed with the order.
   */
  async clickUnderCheckOutButton() {
    // Click the checkout button
    await super.click(this.checkOutButton);
  }

  /**
   * Retrieves the text content of the order confirmation message.
   * @returns {Promise<string>} The text of the order confirmation message.
   */
  async getOrderConfirmationText() {
    // Get and return the text content of the order confirmation message
    return await super.getText(this.orderConfirmation);
  }

  /**
   * Waits for a dialog event to be triggered.
   * @returns {Promise<Event>} The dialog event.
   */
  async getDialogPromise() {
    // Wait for a dialog event and return it
    return await super.waitForEvent("dialog");
  }

  /**
   * Calculates the total price from elements containing a specified text.
   * @param {string} text - The text to search for in the price elements.
   * @returns {Promise<number>} The accumulated total price.
   */
  async getDesiredPrice(text) {
    // Get all price elements that match the search text and calculate the total price
    const prices = await this.page.$$eval(
      'p',
      (elements, searchText) => {
        return elements
          .filter((el) => {
            const linkElement = el.querySelector('a[href="#"]');
            return linkElement && linkElement.textContent.includes(searchText);
          })
          .map((el) => {
            const priceElement = el.querySelector('.price');
            return parseFloat(priceElement.textContent.replace('$', '').trim());
          });
      },
      text
    );
    const total = prices.reduce((acc, price) => acc + price, 0);
    return total;
  }

  /**
   * Retrieves the total price from the checkout page.
   * @returns {Promise<number>} The total price.
   */
  async getTotalPrice() {
    // Get the total price text, remove the dollar sign, and convert it to a number
    const priceText = await this.page.textContent(this.totalPriceLocator);
    const priceValue = parseFloat(priceText.replace('$', '').trim());
    return priceValue;
  }
}

export default Checkout;
