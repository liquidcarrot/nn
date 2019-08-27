const Bot = require("../src/bot");
const Benchmark = require("benchmark").Suite;

const dataset = require("./dataset/pima-indians-diabetes.json");

const bot = Bot.fromDataset(dataset, {
  test: 0.2,
  shuffle: true
});

console.log(`Initial error: ${bot.test({
  accuracy: true
})}`);

bot.train(10000);

console.log(`Final error: ${bot.test({
  accuracy: true
})}`);