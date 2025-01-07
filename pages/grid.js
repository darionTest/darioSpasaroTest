import BasePage from './base';

class Grid extends BasePage {
  constructor(page) {
    super(page);

    // Page Selectors
    this.itemName = '[data-test-id="item-name"] b';
    this.itemPrice = '#item-price';
    this.itemImg = 'img[src]';
    this.itemButton = '[data-test-id="add-to-order"]';
  }

  async getItemAtPosition(position) {
    // Select all elements with the class 'item'
    const items = await this.page.$$('.item');
    // Check if the requested position is within the range of items
    if (position >= items.length) {
      throw new Error(`Position ${position} is out of bounds. Total items: ${items.length}`);
    }
    // Select the element at the specific position
    const item = items[position];
    // Extract the product name and price
    const name = await item.$eval(this.itemName, (el) => el.textContent.trim());
    const price = await item.$eval(this.itemPrice, (el) => el.textContent.trim());
    // Convert the price to a number
    const priceValue = parseFloat(price.replace('$', ''));
    // Return an object with the name and price
    return { name, price: priceValue };
  }

  async allItemsHaveRequiredElements() {
    // Select all elements with the class 'item'
    const items = await this.page.$$('.item');
  
    // Check each element to ensure it contains all required sub-elements
    for (const [index, item] of items.entries()) {
      const name = await item.$eval(this.itemName, (el) => el.textContent.trim()).catch(() => null);
      const hasName = name !== null;
      const imgSrc = await item.$eval(this.itemImg, (el) => el.getAttribute('src')).catch(() => null);
      const hasImg = imgSrc !== null;
      const price = await item.$eval(this.itemPrice, (el) => el.textContent.trim()).catch(() => null);
      const hasPrice = price !== null;
      const buttonText = await item.$eval(this.itemButton, (el) => el.textContent.trim()).catch(() => null);
      const hasButton = buttonText !== null;
      // If any of the elements are missing, return false
      if (!hasName || !hasImg || !hasPrice || !hasButton) {
        return false;
      }
    }
    // If all items have the required sub-elements, return true
    return true;
  }
}

export default Grid;
