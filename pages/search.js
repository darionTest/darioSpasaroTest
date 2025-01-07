// search.js

import BasePage from './base';

class Search extends BasePage {
  constructor(page) {
    super(page);

    // Selectors for the search page elements
    this.searchInput = "input[name='searchWord']"; // Search input field
    this.searchButton = "button[type='submit']"; // Search button
    this.resultMessage = "#result"; // Locator for result messages
  }

  /**
   * Perform a search by inputting the search criteria and clicking the search button.
   * @param {string} searchCriteria - The criteria to input in the search field.
   */
  async search(searchCriteria) {
    // Fill the search input field with the search criteria
    await super.fill(this.searchInput, searchCriteria);
    // Click the search button to submit the search
    await super.click(this.searchButton);
  }

  /**
   * Retrieve the locator for the result message element.
   * @returns {Locator} The locator for the result message element.
   */
  async getSearchLocator() {
    // Locate and return the result message element
    const resultLocator = this.page.locator(this.resultMessage);
    return resultLocator;
  }
}

export default Search;
