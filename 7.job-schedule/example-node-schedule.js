// *    *    *    *    *    *
// ┬    ┬    ┬    ┬    ┬    ┬
// │    │    │    │    │    |
// │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
// │    │    │    │    └───── month (1 - 12)
// │    │    │    └────────── day of month (1 - 31)
// │    │    └─────────────── hour (0 - 23)
// │    └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)

const schedule = require('node-schedule');
const moment = require('moment');
const date = new Date(2017, 10, 14, 18, 6, 0);
console.log(date);

const now = moment().toDate();
console.log(now);

const job = schedule.scheduleJob(date, () => {
    console.log('The world is going to end today.');
});

const rule = new schedule.RecurrenceRule();
rule.second = 30;
console.log(rule);
const job2 = schedule.scheduleJob(rule, () => {
    console.log('The answer to life, the universe, and everything!');
});