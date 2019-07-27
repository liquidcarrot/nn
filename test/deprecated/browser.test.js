// const puppeteer = require("puppeteer");
// const { expect } = require("chai");
// const square = require("../src");

// let browser;
// let page;

// before(async () => {
//   browser = await puppeteer.launch();
//   page = await browser.newPage();
// });

// after(function() {
//   browser.close();
// });

// describe("Browser", function() {
//   describe("square()", function() {
//     const number = Math.ceil(Math.random() * 10);
    
//     it("square() => {ReferenceError}")
//     it(`square(number) => {number}`)
//   })
//   it("", async function() {
//     console.log(square);
//     // console.log(bundle);
//   })
//   it("should import script", async function() {
//     await page.goto("http://localhost:8080");
//     await page.addScriptTag({
//       path: "/home/luiscarbonell5683/workspace/nn/src/index.js"
//     });
//     const stuff = await page.evaluate(() => {
//       return square;
//     });
//     const other_stuff = await page.evaluate(() => {
//       return window.square;
//     });
//     console.log(stuff);
//     console.log(other_stuff);
//   })
// })