import { test, expect } from '@playwright/test';
import SearchPage from '../pages/search';
import searchData from '../testData/search.json';

test.describe('Search Tests', () => {
  let searchPage;

  // Before each test, navigate to the search page
  test.beforeEach(async ({ page }) => {
    searchPage = new SearchPage(page);
    await searchPage.navigate('/search');
  });

  // Iterate through each test case in the imported JSON data
  searchData.searchTests.forEach(({ name, query, expectedMessage }) => {
    test(name, async () => {
      // Perform the search using the provided query
      await searchPage.search(query);

      // Validate the search result message
      const resultLocator = await searchPage.getSearchLocator();
      await expect(resultLocator).toHaveText(expectedMessage, { timeout: 30000 });
    });
  });
});
