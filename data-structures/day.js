import { Weather } from "../weather.js";
import { QuarterDay } from "./quarter-day.js";
import { Darkness } from "../darkness.js";

export class Day {
  /** @type {number | null} */
  day = null;
  quarterDay = 1;
  turn = 1;
  round = 1;
  /** @type {Map<number, QuarterDay>} */
  quarterDayList = new Map();
  /** @type {Weather | null} */
  weather = null;

  /**
   * @param { import("./data-structures").DayData } day
   */
  static restore(day) {
    const instance = new this(day.day, new Weather(day.weather));
    instance.quarterDay = day.quarterDay;
    instance.turn = day.turn;
    instance.round = day.round;
    for (const quarterDay of day.quarterDayList) {
      instance.quarterDayList.set(
        quarterDay.quarterDay,
        QuarterDay.restore(quarterDay, Darkness.calculateDarkness(day.day, quarterDay.quarterDay))
      );
    }
    return instance;
  }

  /**
   * @param {number} day
   * @param {Weather | null} weather
   */
  constructor(day, weather) {
    this.day = day;
    if (weather) this.weather = weather;
    else this.weather = new Weather(null);
  }

  /**
   * @param {QuarterDay} quarterDay
   */
  setQuarterDay(quarterDay) {
    this.quarterDay = quarterDay.quarterDay;
    this.quarterDayList.set(quarterDay.quarterDay, quarterDay);
  }

  toJSON() {
    return {
      day: this.day,
      quarterDay: this.quarterDay,
      turn: this.turn,
      round: this.round,
      weather: this.weather,
      quarterDayList: Array.from(this.quarterDayList.values()),
    };
  }
}
