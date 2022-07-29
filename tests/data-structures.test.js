import assert from "node:assert";
import { Data } from "../data-structures/data.js";

const state = { thing: true };
const data = new Data();
data.setDay(123456, state);

const actual = data.days
  .get(data.day)
  .quarterDays.get(data.quarterDay)
  .turns.get(data.turn)
  .rounds.get(data.round).state;

assert.deepStrictEqual(actual, state, "State should be equal");
assert.deepEqual(
  JSON.parse(JSON.stringify(data)),
  {
    day: 123456,
    quarterDay: 1,
    turn: 1,
    round: 1,
    days: [
      {
        day: 123456,
        quarterDay: 1,
        turn: 1,
        round: 1,
        quarterDays: [
          {
            quarterDay: 1,
            turn: 1,
            round: 1,
            turns: [{ turn: 1, round: 1, rounds: [{ round: 1, state: { thing: true } }] }],
          },
        ],
      },
    ],
  },
  "Object should be equal"
);

data.setQuarterDay(2, { thing: false });

assert.deepEqual(JSON.parse(JSON.stringify(data)), {
  day: 123456,
  quarterDay: 2,
  turn: 1,
  round: 1,
  days: [
    {
      day: 123456,
      quarterDay: 2,
      turn: 1,
      round: 1,
      quarterDays: [
        {
          quarterDay: 1,
          turn: 1,
          round: 1,
          turns: [{ turn: 1, round: 1, rounds: [{ round: 1, state: { thing: true } }] }],
        },
        {
          quarterDay: 2,
          turn: 1,
          round: 1,
          turns: [{ turn: 1, round: 1, rounds: [{ round: 1, state: { thing: false } }] }],
        },
      ],
    },
  ],
});

data.setTurn(2, { thing: false, newThing: true });

assert.deepEqual(JSON.parse(JSON.stringify(data)), {
  day: 123456,
  quarterDay: 2,
  turn: 2,
  round: 1,
  days: [
    {
      day: 123456,
      quarterDay: 2,
      turn: 2,
      round: 1,
      quarterDays: [
        {
          quarterDay: 1,
          turn: 1,
          round: 1,
          turns: [{ turn: 1, round: 1, rounds: [{ round: 1, state: { thing: true } }] }],
        },
        {
          quarterDay: 2,
          turn: 2,
          round: 1,
          turns: [
            { turn: 1, round: 1, rounds: [{ round: 1, state: { thing: false } }] },
            { turn: 2, round: 1, rounds: [{ round: 1, state: { thing: false, newThing: true } }] },
          ],
        },
      ],
    },
  ],
});

data.setRound(2, { thing: false, otherThing: false });

assert.deepEqual(JSON.parse(JSON.stringify(data)), {
  day: 123456,
  quarterDay: 2,
  turn: 2,
  round: 2,
  days: [
    {
      day: 123456,
      quarterDay: 2,
      turn: 2,
      round: 2,
      quarterDays: [
        {
          quarterDay: 1,
          turn: 1,
          round: 1,
          turns: [{ turn: 1, round: 1, rounds: [{ round: 1, state: { thing: true } }] }],
        },
        {
          quarterDay: 2,
          turn: 2,
          round: 2,
          turns: [
            { turn: 1, round: 1, rounds: [{ round: 1, state: { thing: false } }] },
            {
              turn: 2,
              round: 2,
              rounds: [
                { round: 1, state: { thing: false, newThing: true } },
                { round: 2, state: { thing: false, otherThing: false } },
              ],
            },
          ],
        },
      ],
    },
  ],
});

const restoreData = {
  day: 123456,
  quarterDay: 2,
  turn: 2,
  round: 2,
  days: [
    {
      day: 123456,
      quarterDay: 2,
      turn: 2,
      round: 2,
      quarterDays: [
        {
          quarterDay: 1,
          turn: 1,
          round: 1,
          turns: [{ turn: 1, round: 1, rounds: [{ round: 1, state: { thing: true } }] }],
        },
        {
          quarterDay: 2,
          turn: 2,
          round: 2,
          turns: [
            { turn: 1, round: 1, rounds: [{ round: 1, state: { thing: false } }] },
            {
              turn: 2,
              round: 2,
              rounds: [
                { round: 1, state: { thing: false, newThing: true } },
                { round: 2, state: { thing: false, otherThing: false } },
              ],
            },
          ],
        },
      ],
    },
  ],
};

const restored = Data.restore(restoreData);

assert.deepEqual(restored.days.get(123456).quarterDays.get(2).turns.get(2).rounds.get(2).state, {
  thing: false,
  otherThing: false,
});
