const path = require("path");
const serve = require("live-server");
const puppeteer = require("puppeteer");
// expect = require("chai").expect;

serve.start();

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto("http://127.0.0.1:8080");
  
  const results = await page.evaluate(async function() {
    return (async () => {
      mocha.checkLeaks();
      return await mocha.run();
    })();
  });
  
  await browser.close();
  serve.shutdown();
})();