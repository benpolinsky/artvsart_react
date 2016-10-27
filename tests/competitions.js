const basePage = "http://localhost:3333"
export default {
  'Competition': (browser) => {
    browser
      .url(`${basePage}/competition`)
      .waitForElementPresent('div[data-reactroot]', 2000)
      .elements('css selector', 'button.voteButton').value[0].click
      .end();
  }
}