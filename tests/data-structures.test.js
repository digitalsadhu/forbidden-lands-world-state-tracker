import { Data } from "../data-structures/data.js";
import tap, { test, beforeEach, teardown } from "tap";
// import { JSDOM } from "jsdom";

import { chromium } from "playwright";

tap.before(async () => {
  const browser = await chromium.launch({ headless: true });
  tap.context.browser = browser;
});

beforeEach(async (t) => {
  const { browser } = t.context;
  const context = await browser.newContext();
  t.context.page = await context.newPage();
});

teardown(async () => {
  const { browser } = tap.context;
  browser.close();
});

// const dom = new JSDOM(`<body>
//   <script type="module">
//     import { Data } from "./data-structures/data.js";
//     console.log(Data);
//     const data = new Data();
//     data.setDay(123456);
//     window.data = Data;
//   </script>
// </body>`);

// console.log(dom.window.data);

// test("", async (t) => {
//   const data = new Data();
//   data.setDay(123456);
//   t.equal(data.day, 123456);
//   const { page } = t.context;
//   await page.setContent(content);
//   await page.addScriptTag({ path: './dist/index.js', type: 'module' });
// });

// const actual = data.dayList.get(data.day)

// // .get(data.day).quarterDayList.get(data.quarterDay).turnList.get(data.turn)
//   // .roundList.get(data.round);

// assert.deepStrictEqual(actual, state, "State should be equal");
// assert.deepEqual(
//   JSON.parse(JSON.stringify(data)),
//   {
//     day: 123456,
//     quarterDay: 1,
//     turn: 1,
//     round: 1,
//     days: [
//       {
//         day: 123456,
//         quarterDay: 1,
//         turn: 1,
//         round: 1,
//         quarterDays: [
//           {
//             quarterDay: 1,
//             turn: 1,
//             round: 1,
//             turns: [{ turn: 1, round: 1, rounds: [{ round: 1, state: { thing: true } }] }],
//           },
//         ],
//       },
//     ],
//   },
//   "Object should be equal"
// );

// data.setQuarterDay(2, { thing: false });

// assert.deepEqual(JSON.parse(JSON.stringify(data)), {
//   day: 123456,
//   quarterDay: 2,
//   turn: 1,
//   round: 1,
//   days: [
//     {
//       day: 123456,
//       quarterDay: 2,
//       turn: 1,
//       round: 1,
//       quarterDays: [
//         {
//           quarterDay: 1,
//           turn: 1,
//           round: 1,
//           turns: [{ turn: 1, round: 1, rounds: [{ round: 1, state: { thing: true } }] }],
//         },
//         {
//           quarterDay: 2,
//           turn: 1,
//           round: 1,
//           turns: [{ turn: 1, round: 1, rounds: [{ round: 1, state: { thing: false } }] }],
//         },
//       ],
//     },
//   ],
// });

// data.setTurn(2, { thing: false, newThing: true });

// assert.deepEqual(JSON.parse(JSON.stringify(data)), {
//   day: 123456,
//   quarterDay: 2,
//   turn: 2,
//   round: 1,
//   days: [
//     {
//       day: 123456,
//       quarterDay: 2,
//       turn: 2,
//       round: 1,
//       quarterDays: [
//         {
//           quarterDay: 1,
//           turn: 1,
//           round: 1,
//           turns: [{ turn: 1, round: 1, rounds: [{ round: 1, state: { thing: true } }] }],
//         },
//         {
//           quarterDay: 2,
//           turn: 2,
//           round: 1,
//           turns: [
//             { turn: 1, round: 1, rounds: [{ round: 1, state: { thing: false } }] },
//             { turn: 2, round: 1, rounds: [{ round: 1, state: { thing: false, newThing: true } }] },
//           ],
//         },
//       ],
//     },
//   ],
// });

// data.setRound(2, { thing: false, otherThing: false });

// assert.deepEqual(JSON.parse(JSON.stringify(data)), {
//   day: 123456,
//   quarterDay: 2,
//   turn: 2,
//   round: 2,
//   days: [
//     {
//       day: 123456,
//       quarterDay: 2,
//       turn: 2,
//       round: 2,
//       quarterDays: [
//         {
//           quarterDay: 1,
//           turn: 1,
//           round: 1,
//           turns: [{ turn: 1, round: 1, rounds: [{ round: 1, state: { thing: true } }] }],
//         },
//         {
//           quarterDay: 2,
//           turn: 2,
//           round: 2,
//           turns: [
//             { turn: 1, round: 1, rounds: [{ round: 1, state: { thing: false } }] },
//             {
//               turn: 2,
//               round: 2,
//               rounds: [
//                 { round: 1, state: { thing: false, newThing: true } },
//                 { round: 2, state: { thing: false, otherThing: false } },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//   ],
// });

// const restoreData = {
//   day: 123456,
//   quarterDay: 2,
//   turn: 2,
//   round: 2,
//   days: [
//     {
//       day: 123456,
//       quarterDay: 2,
//       turn: 2,
//       round: 2,
//       quarterDays: [
//         {
//           quarterDay: 1,
//           turn: 1,
//           round: 1,
//           turns: [{ turn: 1, round: 1, rounds: [{ round: 1, state: { thing: true } }] }],
//         },
//         {
//           quarterDay: 2,
//           turn: 2,
//           round: 2,
//           turns: [
//             { turn: 1, round: 1, rounds: [{ round: 1, state: { thing: false } }] },
//             {
//               turn: 2,
//               round: 2,
//               rounds: [
//                 { round: 1, state: { thing: false, newThing: true } },
//                 { round: 2, state: { thing: false, otherThing: false } },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//   ],
// };

// const restored = Data.restore(restoreData);

// assert.deepEqual(restored.days.get(123456).quarterDays.get(2).turns.get(2).rounds.get(2).state, {
//   thing: false,
//   otherThing: false,
// });
