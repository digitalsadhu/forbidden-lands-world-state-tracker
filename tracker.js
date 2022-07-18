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
  state = {
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
    environmentDark: false,
    environmentCold: false,
    terrainPlains: false,
    terrainForest: false,
    terrainDarkForest: false,
    terrainHills: false,
    terrainMountains: false,
    terrainHighMountains: false,
    terrainLakeRiver: false,
    terrainMarshlands: false,
    terrainQuagmire: false,
    terrainRuins: false,
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

  async setState(key, value) {
    this.state[key] = value;
    await this.refresh();
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
      messages = messages.concat((await round(this.state)) || []);
    }
    this.roundMessages = messages.filter(Boolean);
    this.round = num;
    this._currentType = types.ROUND;
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
      messages = messages.concat((await turn(this.state)) || []);
    }
    this.turnMessages = messages.filter(Boolean);
    this.round = null;
    this.turn = num;
    this._currentType = types.TURN;
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
      messages = messages.concat((await quarterDay(this.state)) || []);
    }
    this.quarterDayMessages = messages.filter(Boolean);
    this.round = null;
    this.turn = null;
    this.quarterDay = num;
    this._currentType = types.QUARTER_DAY;
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
      messages = messages.concat((await day(this.state)) || []);
    }
    this.dayMessages = messages.filter(Boolean);
    this.round = null;
    this.turn = null;
    this.quarterDay = null;
    this.day = num;
    this._currentType = types.DAY;
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
      messages = messages.concat((await week(this.state)) || []);
    }
    this.weekMessages = messages.filter(Boolean);
    this.round = null;
    this.turn = null;
    this.quarterDay = null;
    this.day = null;
    this.week = num;
    this._currentType = types.WEEK;
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

  async refresh() {
    switch (this._currentType) {
      case types.ROUND:
        await this.setRound(this.round);
        break;
      case types.TURN:
        await this.setTurn(this.turn);
        break;
      case types.QUARTER_DAY:
        await this.setQuarterDay(this.quarterDay);
        break;
      case types.DAY:
        await this.setDay(this.day);
        break;
      case types.WEEK:
        await this.setWeek(this.week);
        break;
    }
  }
}
