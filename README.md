#**App Automation Test**

## Must have before start

- Git
- Docker

### Steps

1. Pull the docker image containing the web app
`docker pull automaticbytes/demo-app`

2. Run the image
`docker run -p 3100:3100 automaticbytes/demo-app`

3. Verify the app is shown in below url and set it as the base url for the tests.
`http://localhost:3100`

4. Fork this repository and develop your tests following bellow guidances/requisites.

5. When finished open a Pull Request for Code Review.

### General requisites for submission

1. Programming languages
   - Java
   - Javascript

2. Drivers
   - Playwright
   - Selenium

3. Browsers
	- Chrome (preferred)
	- Firefox

### General test requisites
- All tests should provide a setup and tear down mechanism that opens and closes the browser.
- All tests should run successfully either from IDE or command line.
- Instructions to build and run the code and tests submitted must be provided.
- Submitted code implementing a Page Object Model will be taken in high consideration.

### Tests Scenarios
1.  Login Success
   - Navigate to http://localhost:3100/login
   - Successfully login with credentials: johndoe19/supersecret
   - Assert that welcome message containing username is shown.

2. Login Failure A
   - Navigate to http://localhost:3100/login
   - Enter wrong username/password
   - Assert error message is shown.

3. Login Failure B
   - Navigate to http://localhost:3100/login
   - Leave both username/password in blank
   - Assert error message is shown.

4. Checkout Form Order Success
   - Navigate to http://localhost:3100/checkout
   - Complete all the fields
   - Verify that if "Shipping address same as billing" checkbox is not checkmarked then checkmark it.
   - Submit the form and assert that the order confirmation number is not empty.

5. Checkout Form Alert
   - Navigate to http://localhost:3100/checkout
   - Complete all the fields
   - Verify that if "Shipping address same as billing" checkbox is checkmarked, then uncheckmark it.
   - Try to submit the form and validate that the alert message is shown and confirm the alert.
   - Assert alert is gone.

6. Cart Total Test
    - Navigate to http://localhost:3100/checkout
	- Assert that the cart total shown is correct for the item prices added.

7. Grid Item Test
    - Navigate to http://localhost:3100/grid
    - Assert that in position 7 the product shown is "Super Pepperoni"
	- Assert that the price shown is $10
	
8. Grid All Items Test	
	- Navigate to http://localhost:3100/grid
	- Assert that all the items have a non empty title, price, image and a button.

9. Search Success
  - Navigate to http://localhost:3100/search
  - Search for any word (for instance automation)
  - Assert that "Found one result for" plus the word you searched is shown.

10. Search Empty
	- Navigate to http://localhost:3100/search
	- Leave search box empty and submit the search
	- Assert that "Please provide a search word." message is shown.


### Dependencies and initial steps
We are gonna be needing:
NodeJs, Git and Docker installed in our computers.

Initial Steps:

1 - Clonning git repo:
git clone https://github.com/darionTest/darioSpasaroTest.git
cd darioSpasaroTest

2 - npm install
npx playwright install #"Sometimes Playwright browsers are not installed automatically, so you can install them by running this command:"

3 - Pulling docker image
docker pull automaticbytes/demo-app`

4 - Run the image
docker run -p 3100:3100 automaticbytes/demo-app`
Application will be available under http://localhost:3100


### Running tests locally
By default, Playwright tests run headless (without opening a browser window). This is set in the Playwright configuration. If you want to run the tests with visible browsers, you can modify the configuration, but for CI purposes, it is set to run headless by default.

To run tests with Chromium or Mozilla (Firefox):
We provide two scripts for running tests on Chromium or Mozilla (Firefox):

Run tests using Chromium:
npm run test:chrome

Run tests using Mozilla (Firefox):
npm run test:firefox

Make sure you have the Playwright dependencies installed (npx playwright install), and the tests will automatically run in headless mode unless specified otherwise.

After running the tests, Playwright generates a testing report. We can open it by:
npx playwright show-report

### Playwright Configuration
The default Playwright configuration (playwright.config.ts) has been set to run the tests in headless mode. If you want to test with a visible browser, simply change the configuration to set the headless: false:

// playwright.config.ts
module.exports = {
  use: {
    headless: false, // Set to false to see the browser
  },
};

### GitHub Actions Setup
The tests are automated using GitHub Actions for Continuous Integration (CI). This will automatically run tests on every push or pull request to the main or master branch.

To see the workflow configuration, check out the .github/workflows/e2e.yml file.

How to manually trigger the tests:
You can manually trigger the tests by going to the Actions tab in your GitHub repository and clicking on the "Run workflow" button.

GitHub Actions workflow details:
Installs Docker and pulls the Docker image of the app.
Runs the Docker container and waits for the application to be ready.
Executes Playwright tests.

There is an artifact created as well with the testing report that will be linked to the workflow.
As soon as the pipeline ends, by accesing the execution user is able to download the createad artifact 
that is gonna be the report under .html format.