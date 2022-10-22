import { Turn } from "./turn.js";

export class QuarterDay {
  /** @type {number} */
  quarterDay = 1;
  turn = 1;
  round = 1;
  /** @type {boolean | null} */
  dark = null;
  /** @type {Map<number, Turn>} */
  turnList = new Map();

  /**
   * @param {import("./data-structures").QuarterDayData} quarterDay
   * @param {boolean} dark
   */
  static restore(quarterDay, dark) {
    const instance = new this(quarterDay.quarterDay, dark);
    instance.turn = quarterDay.turn;
    instance.round = quarterDay.round;
    for (const turn of quarterDay.turnList) {
      instance.turnList.set(turn.turn, Turn.restore(turn));
    }
    return instance;
  }

  /**
   * @param {number} quarterDay
   * @param {boolean} dark
   */
  constructor(quarterDay, dark) {
    if (![1, 2, 3, 4].includes(quarterDay)) throw new Error(`quarterDay must be one of 1,2,3 or 4. got ${quarterDay}`);
    if (![true, false].includes(dark)) throw new Error(`dark must be "true" or "false". got ${dark}`);
    this.quarterDay = quarterDay;
    this.dark = dark;
  }

  /**
   * @param {Turn} turn
   */
  setTurn(turn) {
    this.turn = turn.turn;
    this.turnList.set(turn.turn, turn);
  }

  toJSON() {
    return {
      quarterDay: this.quarterDay,
      dark: this.dark,
      turn: this.turn,
      round: this.round,
      turnList: Array.from(this.turnList.values()),
    };
  }
}
