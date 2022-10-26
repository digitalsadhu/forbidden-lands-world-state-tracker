import { SelectedOptions } from "./selected-options.js";
import { ROUND, TURN, QUARTER_DAY, DAY, WEEK, YEAR } from "./constants.js";
import { Database } from "./database.js";

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

export class Data extends EventTarget {
  get timestamp() {
    return Number(new URLSearchParams(window.location.search).get("timestamp"));
  }

  /**
   * Advances the day by 365 days
   */
  nextYear() {
    const currentYear = Math.floor(this.timestamp / YEAR) * YEAR;
    const nextYear = currentYear + YEAR;
    this.setDay(nextYear);
  }

  /**
   * Sets the day back by 365 days
   */
  prevYear() {
    const currentYear = Math.floor(this.timestamp / YEAR) * YEAR;
    const prevYear = currentYear - YEAR;
    this.setDay(prevYear);
  }

  /**
   * Advance the day by 7 days
   */
  nextWeek() {
    const currentWeek = Math.floor(this.timestamp / WEEK) * WEEK;
    const nextWeek = currentWeek + WEEK;
    this.setDay(nextWeek);
  }

  /**
   * Sets the day back by 7 days
   */
  prevWeek() {
    const currentWeek = Math.floor(this.timestamp / WEEK) * WEEK;
    const prevWeek = currentWeek - WEEK;
    this.setDay(prevWeek);
  }

  /**
   * Advances the day by 1 day
   */
  nextDay() {
    const currentDay = Math.floor(this.timestamp / DAY) * DAY;
    const nextDay = currentDay + DAY;
    this.setDay(nextDay);
  }

  /**
   * Sets the day back by 1 day
   */
  prevDay() {
    const currentDay = Math.floor(this.timestamp / DAY) * DAY;
    const prevDay = currentDay - DAY;
    this.setDay(prevDay);
  }

  /**
   * Set's the current day.
   * Dispatches a change event when called.
   * @param {number} timestamp
   */
  async setDay(timestamp) {
    assert(timestamp, "timestamp required when calling setDay()");
    await Database.initialize("timestamp").set("previous", this.timestamp);
    window.location.search = `?timestamp=${timestamp}`;
  }

  /**
   * Advances the quarter day by 1. If this would cross a day boundary, begins a new day instead.
   */
  nextQuarterDay() {
    const currentQuarterDay = Math.floor(this.timestamp / QUARTER_DAY) * QUARTER_DAY;
    const nextQuarterDay = currentQuarterDay + QUARTER_DAY;
    this.setQuarterDay(nextQuarterDay);
  }

  /**
   * Goes backwards in time by 1 quarter day. If this would cross a day boundary, returns to the previous day.
   */
  prevQuarterDay() {
    const currentQuarterDay = Math.floor(this.timestamp / QUARTER_DAY) * QUARTER_DAY;
    const prevQuarterDay = currentQuarterDay - QUARTER_DAY;
    this.setQuarterDay(prevQuarterDay);
  }

  /**
   * Sets the quarter day.
   * Dispatches a change event when called.
   * @param {number} timestamp - Valid values are 1,2,3 or 4 which represent the 4 possible quarter days of morning, afternoon, evening and night.
   */
  async setQuarterDay(timestamp) {
    assert(timestamp, "setQuarterDay requires a timestamp to be provided.");
    await Database.initialize("timestamp").set("previous", this.timestamp);
    window.location.search = `?timestamp=${timestamp}`;
  }

  /**
   * Advance the turn.
   * There are 24 turns in a quarter day and if this boundary is crossed, the quarter day will automatically be advanced.
   */
  nextTurn() {
    const currentTurn = Math.floor(this.timestamp / TURN) * TURN;
    const nextTurn = currentTurn + TURN;
    this.setTurn(nextTurn);
  }

  /**
   * Sets the turn to the previous turn.
   * There are 24 turns in a quarter day and if this boundary is crossed, the quarter day will automatically be set back to the previous quarter day.
   */
  prevTurn() {
    const currentTurn = Math.floor(this.timestamp / TURN) * TURN;
    const prevTurn = currentTurn - TURN;
    this.setTurn(prevTurn);
  }

  /**
   * Sets the current turn by given turn number
   * Dispatches a change event when called.
   * @param {number} timestamp
   */
  async setTurn(timestamp) {
    assert(timestamp, "setTurn requires a timestamp to be provided.");
    await Database.initialize("timestamp").set("previous", this.timestamp);
    window.location.search = `?timestamp=${timestamp}`;
  }

  /**
   * Advances the round by 1.
   */
  nextRound() {
    this.setRound(this.timestamp + ROUND);
  }

  /**
   * Sets the round to the previous round. If the new round would be zero, instead sets the turn back to the previous turn.
   */
  prevRound() {
    this.setRound(this.timestamp - ROUND);
  }

  /**
   * Sets the current round.
   * Dispatches a change event when called.
   * @param {number} timestamp - valid values are 1 through 60
   */
  setRound(timestamp) {
    assert(timestamp, "setRound requires a timestamp to be provided.");
    Database.initialize("timestamp").set("previous", this.timestamp);
    window.location.search = `?timestamp=${timestamp}`;
  }

  toJSON() {
    return {
      timestamp: this.timestamp,
    };
  }
}
