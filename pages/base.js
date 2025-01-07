/**
 * Base Page class provides utility methods for interacting with web elements.
 * This serves as a base page class for common operations across different pages.
 */

class Base {
  constructor(page) {
    this.page = page; // Playwright page object, represents the browser page
  }

  /**
   * Navigates to the given URL.
   * @param {string} url - The URL to navigate to.
   */
  async navigate(url) {
    await this.page.goto(url);
  }

  /**
   * Clicks on the element specified by the selector.
   * @param {string} selector - The CSS selector of the element to click.
   */
  async click(selector) {
    await this.page.click(selector);
  }

  /**
   * Types the given text into the element specified by the selector.
   * @param {string} element - The CSS selector of the input field.
   * @param {string} text - The text to type into the field.
   */
  async type(element, text) {
    await this.page.type(element, text);
  }

  /**
   * Fills the input field specified by the selector with the given text.
   * @param {string} element - The CSS selector of the input field.
   * @param {string} text - The text to fill into the field.
   */
  async fill(element, text) {
    await this.page.fill(element, text);
  }

  /**
   * Presses a specified key on the page.
   * @param {string} key - The key to press (e.g., 'Enter', 'Backspace').
   */
  async press(key) {
    await this.page.press(key);
  }

  /**
   * Waits for the element specified by the selector to appear on the page.
   * @param {string} selector - The CSS selector of the element.
   * @param {object} options - The options for waiting (e.g., timeout).
   */
  async waitForSelector(selector, options) {
    await this.page.waitForSelector(selector, options);
  }

  /**
   * Waits for a specified amount of time in milliseconds.
   * @param {number} timeout - The amount of time to wait in milliseconds.
   */
  async waitForTimeout(timeout) {
    await this.page.waitForTimeout(timeout);
  }

  /**
   * Retrieves the text content of the element specified by the selector.
   * @param {string} selector - The CSS selector of the element.
   * @returns {Promise<string>} - The text content of the element.
   */
  async getText(selector) {
    return await this.page.textContent(selector);
  }

  /**
   * Retrieves the title of the page.
   * @returns {Promise<string>} - The title of the page.
   */
  async getTitle() {
    return await this.page.title();
  }

  /**
   * Retrieves the value of the specified attribute of the element.
   * @param {string} selector - The CSS selector of the element.
   * @param {string} attribute - The name of the attribute to retrieve (e.g., 'href').
   * @returns {Promise<string>} - The value of the specified attribute.
   */
  async getAttribute(selector, attribute) {
    const element = await this.page.locator(selector);
    return await element.getAttribute(attribute);
  }

  /**
   * Waits for a custom function to be satisfied on the page.
   * @param {function} fn - The function to wait for, to be executed in the page context.
   * @param {object} options - Options for waiting, including timeout.
   */
  async waitForFunction(fn, options) {
    await this.page.waitForFunction(fn, options);
  }

  /**
   * Hovers over the element specified by the selector.
   * @param {string} selector - The CSS selector of the element to hover over.
   */
  async hover(selector) {
    await this.page.hover(selector);
  }

  /**
   * Selects a value from a dropdown or select element.
   * @param {string} selector - The CSS selector of the select element.
   * @param {string} value - The value to select from the dropdown.
   */
  async select(selector, value) {
    await this.page.selectOption(selector, value);
  }

  /**
   * Selects an option from a dropdown or select element based on the visible text.
   * @param {string} selector - The CSS selector of the select element.
   * @param {string} optionText - The visible text of the option to select.
   */
  async selectByText(selector, optionText) {
    await this.page.selectOption(selector, { label: optionText });
  }

  /**
   * Retrieves the current URL of the page.
   * @returns {Promise<string>} - The URL of the current page.
   */
  async getUrl() {
    return await this.page.url();
  }

  /**
   * Reloads the current page.
   */
  async reload() {
    await this.page.reload();
  }

  /**
   * Navigates back to the previous page in the browser's history.
   */
  async goBack() {
    await this.page.goBack();
  }

  /**
   * Navigates forward to the next page in the browser's history.
   */
  async goForward() {
    await this.page.goForward();
  }

   /**
   * Waits for a specific event to occur on the page.
   * @param {string} event - The event to wait for (e.g., 'load', 'domcontentloaded').
   * @returns {Promise} - Resolves when the event is triggered.
   */
   async waitForEvent(event) {
    const promise = this.page.waitForEvent(event);
    return promise;
  }

  /**
   * Waits for a page navigation event to complete.
   * @param {object} options - Options for waiting, such as timeout and waitUntil.
   */
  async waitForNavigation(options) {
    await this.page.waitForNavigation(options);
  }
}

export default Base;
