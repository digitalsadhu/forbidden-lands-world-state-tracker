import { Day } from "./day.js";
import { QuarterDay } from "./quarter-day.js";
import { Round } from "./round.js";
import { Turn } from "./turn.js";
import { Darkness } from "../darkness.js";
import { SelectedOptions } from "./selected-options.js";

export class Data extends EventTarget {
  day = 1165 * 365 + 1;
  quarterDay = 1;
  turn = 1;
  /** @type {number} */
  round = 1;
  /** @type {Map<number, Day>} */
  dayList = new Map();
  /** @type {Map<string, SelectedOptions>} */
  selectedOptionsList = new Map();

  /**
   * @param { import('./data-structures').Data } data
   */
  static restore(data) {
    const instance = new this();
    instance.day = data.day;
    instance.quarterDay = data.quarterDay;
    instance.turn = data.turn;
    instance.round = data.round;
    for (const day of data.dayList) {
      instance.dayList.set(day.day, Day.restore(day));
    }
    for (const selectedOptions of data.selectedOptionsList) {
      instance.selectedOptionsList.set(selectedOptions.key, SelectedOptions.restore(selectedOptions));
    }
    return instance;
  }

  /** @return {SelectedOptions} */
  get currentSelectedOptions() {
    const key = `${this.day}${this.quarterDay}${this.turn}${this.round}`;
    const newSelectedOptionsList = new SelectedOptions();
    if (!this.selectedOptionsList.has(key)) this.selectedOptionsList.set(key, newSelectedOptionsList);
    return this.selectedOptionsList.get(key) || newSelectedOptionsList;
  }

  get currentDay() {
    return this.dayList.get(this.day);
  }

  get currentQuarterDay() {
    return this.currentDay?.quarterDayList.get(this.quarterDay);
  }

  get currentDark() {
    return this.currentQuarterDay?.dark;
  }

  get currentTurn() {
    return this.currentQuarterDay?.turnList.get(this.turn);
  }

  get currentRound() {
    return this.currentTurn?.roundList.get(this.round);
  }

  get currentWeather() {
    return this.currentDay?.weather;
  }

  /**
   * Update current selectedOptions with key value patches.
   * Emits a change event to all subscribers with the original patch and a clone of the selectedOptions
   * object
   * @param {object} patch
   */
  update(patch) {
    for (const [key, value] of Object.entries(patch)) {
      this.currentSelectedOptions[key] = value;
    }
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: { state: SelectedOptions.clone(this.currentSelectedOptions), trigger: patch },
      })
    );
  }

  /**
   * Advances the day by 365 days
   */
  advanceYear() {
    this.setDay(this.day + 365);
  }

  /**
   * Sets the day back by 365 days
   */
  reverseYear() {
    this.setDay(this.day - 365);
  }

  /**
   * Advance the day by 7 days
   */
  advanceWeek() {
    this.setDay(this.day + 7);
  }

  /**
   * Sets the day back by 7 days
   */
  reverseWeek() {
    this.setDay(this.day - 7);
  }

  /**
   * Advances the day by 1 day
   */
  advanceDay() {
    this.setDay(this.day + 1);
  }

  /**
   * Sets the day back by 1 day
   */
  reverseDay() {
    this.setDay(this.day - 1);
  }

  /**
   * Set's the current day.
   * Dispatches a change event when called.
   * @param {number} datestamp
   */
  setDay(datestamp) {
    if (!datestamp) {
      throw new Error("datestamp required when calling setDay()");
    }

    this.day = datestamp;
    this.quarterDay = 1;
    this.turn = 1;
    this.round = 1;

    const day = new Day(this.day, null);
    this.dayList.set(this.day, day);

    const quarterDay = new QuarterDay(this.quarterDay, Darkness.calculateDarkness(this.day, this.quarterDay));
    day.setQuarterDay(quarterDay);

    const turn = new Turn(this.turn);
    quarterDay.setTurn(turn);

    const round = new Round(this.round);
    turn.setRound(round);

    const key = `${this.day}${this.quarterDay}${this.turn}${this.round}`;
    this.selectedOptionsList.set(key, this.currentSelectedOptions);

    this.dispatchEvent(new CustomEvent("change", { detail: { type: "day", value: day } }));
  }

  /**
   * Advances the quarter day by 1. If this would cross a day boundary, begins a new day instead.
   */
  advanceQuarterDay() {
    if (this.quarterDay + 1 > 4) {
      this.advanceDay();
      return;
    }
    this.setQuarterDay(this.quarterDay + 1);
  }

  /**
   * Goes backwards in time by 1 quarter day. If this would cross a day boundary, returns to the previous day.
   */
  reverseQuarterDay() {
    if (this.quarterDay - 1 < 1) {
      this.reverseDay();
      return;
    }
    this.setQuarterDay(this.quarterDay - 1);
  }

  /**
   * Sets the quarter day.
   * Dispatches a change event when called.
   * @param {number} quarterDayNumber - Valid values are 1,2,3 or 4 which represent the 4 possible quarter days of morning, afternoon, evening and night.
   */
  setQuarterDay(quarterDayNumber) {
    if (!quarterDayNumber) {
      throw new Error("setQuarterDay requires a quarter day number to be provided.");
    }
    if (quarterDayNumber < 1 || quarterDayNumber > 4) {
      throw new Error("quarterDayNumber must be between 1 and 4 (inclusive)");
    }
    const day = this.dayList.get(this.day);
    if (!day) {
      throw new Error("No day found. Create a new day before creating quarter days.");
    }

    this.quarterDay = quarterDayNumber;
    this.turn = 1;
    this.round = 1;

    day.quarterDay = quarterDayNumber;
    day.turn = 1;
    day.round = 1;

    const quarterDay = new QuarterDay(quarterDayNumber, Darkness.calculateDarkness(this.day, this.quarterDay));
    day.setQuarterDay(quarterDay);

    const turn = new Turn(this.turn);
    quarterDay.setTurn(turn);

    const round = new Round(this.round);
    turn.setRound(round);

    const key = `${this.day}${this.quarterDay}${this.turn}${this.round}`;
    this.selectedOptionsList.set(key, this.currentSelectedOptions);

    this.dispatchEvent(new CustomEvent("change", { detail: { type: "quarterDay", value: quarterDay } }));
  }

  /**
   * Advance the turn. There are 26 turns in a quarter day and if this boundary is crossed, the quarter day will automatically be advanced.
   */
  advanceTurn() {
    if (this.turn + 1 > 26) {
      this.advanceQuarterDay();
      return;
    }
    this.setTurn(this.turn + 1);
  }

  /**
   * Sets the turn to the previous turn. There are 26 turns in a quarter day and if this boundary is crossed, the quarter day will automatically be set back to the previous quarter day.
   */
  reverseTurn() {
    if (this.turn - 1 < 1) {
      this.reverseQuarterDay();
      return;
    }
    this.setTurn(this.turn - 1);
  }

  /**
   * Sets the current turn by given turn number
   * Dispatches a change event when called.
   * @param {number} turnNumber
   */
  setTurn(turnNumber) {
    if (!turnNumber) {
      throw new Error("setTurn requires a turn number to be provided.");
    }
    if (turnNumber < 1 || turnNumber > 24) {
      throw new Error("turnNumber must be an integer between 1 and 24 (inclusive)");
    }

    this.turn = turnNumber;
    this.round = 1;

    const day = this.dayList.get(this.day);
    if (!day) {
      throw new Error("No day found. Create a new day before creating turns.");
    }
    const quarterDay = day.quarterDayList.get(this.quarterDay);
    if (!quarterDay) {
      throw new Error("No quarterDay found. Create a new quarterDay before creating turns.");
    }
    day.turn = turnNumber;
    day.round = 1;

    quarterDay.turn = turnNumber;
    quarterDay.round = 1;

    const _turn = new Turn(this.turn);
    quarterDay.setTurn(_turn);

    const round = new Round(this.round);
    _turn.setRound(round);

    const key = `${this.day}${this.quarterDay}${this.turn}${this.round}`;
    this.selectedOptionsList.set(key, this.currentSelectedOptions);

    this.dispatchEvent(new CustomEvent("change", { detail: { type: "turn", value: _turn } }));
  }

  /**
   * Advances the round by 1.
   */
  advanceRound() {
    this.setRound(this.round + 1);
  }

  /**
   * Sets the round to the previous round. If the new round would be zero, instead sets the turn back to the previous turn.
   */
  reverseRound() {
    if (this.round - 1 < 1) {
      this.reverseTurn();
      return;
    }
    this.setRound(this.round - 1);
  }

  /**
   * Sets the current round.
   * Dispatches a change event when called.
   * @param {number} roundNumber - valid values are 1 through 60
   */
  setRound(roundNumber) {
    if (!roundNumber) {
      throw new Error("setRound requires a round number to be provided.");
    }
    const day = this.dayList.get(this.day);
    if (!day) {
      throw new Error("No day found. Create a new day before creating rounds.");
    }
    const quarterDay = day.quarterDayList.get(this.quarterDay);
    if (!quarterDay) {
      throw new Error("No quarterDay found. Create a new quarterDay before creating rounds.");
    }
    const turn = quarterDay.turnList.get(this.turn);
    if (!turn) {
      throw new Error("No turn found. Create a new turn before creating rounds.");
    }
    if (roundNumber < 1 || roundNumber > 60) {
      throw new Error("roundNumber must be between 1 and 60 (inclusive)");
    }

    this.round = roundNumber;
    day.round = roundNumber;

    quarterDay.round = roundNumber;

    turn.round = roundNumber;

    const _round = new Round(this.round);
    turn.setRound(_round);

    const key = `${this.day}${this.quarterDay}${this.turn}${this.round}`;
    this.selectedOptionsList.set(key, this.currentSelectedOptions);

    this.dispatchEvent(new CustomEvent("change", { detail: { type: "round", value: _round } }));
  }

  toJSON() {
    return {
      day: this.day,
      quarterDay: this.quarterDay,
      turn: this.turn,
      round: this.round,
      days: Array.from(this.dayList.values()),
      selectedOptionsList: Array.from(this.selectedOptionsList.entries()),
    };
  }
}
