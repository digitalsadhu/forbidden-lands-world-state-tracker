import turns from "./turn.js";
import days from "./day.js";
import rounds from "./round.js";
import quarterDays from "./quarter_day.js";
import weeks from "./week.js";

const types = {
  ROUND: "round",
  TURN: "turn",
  QUARTER_DAY: "quarterDay",
  DAY: "day",
  WEEK: "week",
};

export class Tracker extends EventTarget {
  // Is it dark?

  weather = {};
  terrain = {};
  light = true;
  party = {
    overEncumbered: false,
    noWarmClothes: false,
    inWater: false,
    poisoned: false,
    injured: false,
    diseased: false,
    bareGroundSleeping: false,
    usingArrows: false,
    wearingArmor: false,
    ownStronghold: false,
    haveHirelings: false,
    hike: false,
    fish: false,
    forage: false,
    hunt: false,
    keepWatch: false,
    leadTheWay: false,
    rest: false,
    sleep: false,
    makeCamp: false,
    forcedMarch: 0,
  };

  _round = 0;
  _turn = 0;
  _quarterDay = 0;
  _day = 0;
  _week = 0;

  messages = [];

  _roundMessages = [];
  _turnMessages = [];
  _quarterDayMessages = [];
  _dayMessages = [];
  _weekMessages = [];

  setParty(key, value) {
    this.party[key] = value;
  }

  get round() {
    return this._round;
  }
  set round(value) {
    this._round = value;
    this.dispatchEvent(new CustomEvent("round-change"));
  }

  get turn() {
    return this._turn;
  }
  set turn(value) {
    this._turn = value;
    this.dispatchEvent(new CustomEvent("turn-change"));
  }

  get quarterDay() {
    return this._quarterDay;
  }
  set quarterDay(value) {
    this._quarterDay = value;
    this.dispatchEvent(new CustomEvent("quarter-day-change"));
  }

  get day() {
    return this._day;
  }
  set day(value) {
    this._day = value;
    this.dispatchEvent(new CustomEvent("day-change"));
  }

  get week() {
    return this._week;
  }
  set week(value) {
    this._week = value;
    this.dispatchEvent(new CustomEvent("week-change"));
  }

  get roundMessages() {
    return this._roundMessages;
  }
  set roundMessages(value) {
    this._roundMessages = value;
    this.dispatchEvent(new CustomEvent("round-messages-change"));
  }

  get turnMessages() {
    return this._turnMessages;
  }
  set turnMessages(value) {
    this._turnMessages = value;
    this.dispatchEvent(new CustomEvent("turn-messages-change"));
  }

  get quarterDayMessages() {
    return this._quarterDayMessages;
  }
  set quarterDayMessages(value) {
    this._quarterDayMessages = value;
    this.dispatchEvent(new CustomEvent("quarter-day-messages-change"));
  }

  get dayMessages() {
    return this._dayMessages;
  }
  set dayMessages(value) {
    this._dayMessages = value;
    this.dispatchEvent(new CustomEvent("day-messages-change"));
  }

  get weekMessages() {
    return this._weekMessages;
  }
  set weekMessages(value) {
    this._weekMessages = value;
    this.dispatchEvent(new CustomEvent("week-messages-change"));
  }

  async setRound(num) {
    let messages = [];
    for (const round of rounds) {
      // pass in weather and terrain and light level and party state
      messages = messages.concat((await round(this.weather, this.terrain, this.light, this.party)) || []);
    }
    this.roundMessages = messages.filter(Boolean);
    this.round = num;
  }

  async incrementRound() {
    if (this.round > 90) {
      // 90 rounds in a turn?
      await this.advance("turn");
    } else {
      await this.setRound(this.round + 1);
    }
  }

  async setTurn(num) {
    let messages = [];
    for (const turn of turns) {
      // pass in weather and terrain and light level and party state
      messages = messages.concat((await turn(this.weather, this.terrain, this.light, this.party)) || []);
    }
    this.turnMessages = messages.filter(Boolean);
    this.round = null;
    this.turn = num;
  }

  async incrementTurn() {
    if (this.turn >= 24) {
      // 24 turns in a quarter day
      await this.advance("quarterDay");
    } else {
      await this.setTurn(this.turn + 1);
    }
  }

  async setQuarterDay(num) {
    let messages = [];
    for (const quarterDay of quarterDays) {
      // pass in weather and terrain and light level and party state
      messages = messages.concat((await quarterDay(this.weather, this.terrain, this.light, this.party)) || []);
    }
    this.quarterDayMessages = messages.filter(Boolean);
    this.round = null;
    this.turn = null;
    this.quarterDay = num;
  }

  async incrementQuarterDay() {
    if (this.quarterDay >= 4) {
      await this.advance("day");
    } else {
      await this.setQuarterDay(this.quarterDay + 1);
    }
  }

  async setDay(num) {
    let messages = [];
    for (const day of days) {
      // pass in weather and terrain and light level and party state
      messages = messages.concat((await day(this.weather, this.terrain, this.light, this.party)) || []);
    }
    this.dayMessages = messages.filter(Boolean);
    this.round = null;
    this.turn = null;
    this.quarterDay = null;
    this.day = num;
  }

  async incrementDay() {
    if (this.day >= 7) {
      await this.advance("week");
    } else {
      await this.setDay(this.day + 1);
    }
  }

  async setWeek(num) {
    let messages = [];
    for (const week of weeks) {
      // pass in weather and terrain and light level and party state
      messages = messages.concat((await week(this.weather, this.terrain, this.light, this.party)) || []);
    }
    this.weekMessages = messages.filter(Boolean);
    this.round = null;
    this.turn = null;
    this.quarterDay = null;
    this.day = null;
    this.week = num;
  }

  async incrementWeek() {
    await this.setWeek(this.week + 1);
  }

  async advance(type) {
    switch (type) {
      case types.ROUND:
        await this.incrementRound();
        break;
      case types.TURN:
        await this.incrementTurn();
        break;
      case types.QUARTER_DAY:
        await this.incrementQuarterDay();
        break;
      case types.DAY:
        await this.incrementDay();
        break;
      case types.WEEK:
        await this.incrementWeek();
        break;
    }
  }
}
