const basePage = "http://localhost:3333"
export default {
  'Smoke': (browser) => {
  browser
    .url(basePage)
    .waitForElementVisible('main', 2000)
    .assert.containsText('main h1', 'Welcome to Art Vs Art')
    .end();    
  }
}