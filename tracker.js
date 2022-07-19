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
    warmClothes: false,
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
    season: "Spring",
  };

  _round = 0;
  _turn = 0;
  _quarterDay = 1;

  messages = [];

  _roundMessages = [];
  _turnMessages = [];
  _quarterDayMessages = [];
  _dayMessages = [];
  _weekMessages = [];

  async setState(key, value) {
    if (key === "environmentDark") {
      this.dark = value;
    } else this.state[key] = value;

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

  async decrementRound() {
    if (this.round <= 1) {
      // 90 rounds in a turn?
      await this.reverse("turn");
    } else {
      await this.setRound(this.round - 1);
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

  async decrementTurn() {
    if (this.turn <= 1) {
      // 24 turns in a quarter day
      await this.reverse("quarterDay");
    } else {
      await this.setTurn(this.turn - 1);
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
      await this.setQuarterDay(1);
      this.dispatchEvent(new CustomEvent("next-day"));
    } else {
      await this.setQuarterDay(this.quarterDay + 1);
    }
  }

  async decrementQuarterDay() {
    if (this.quarterDay <= 1) {
      await this.setQuarterDay(4);
      this.dispatchEvent(new CustomEvent("previous-day"));
    } else {
      await this.setQuarterDay(this.quarterDay - 1);
    }
  }

  calculateDarkness() {
    let dark = false;
    if (this.state.season === "Spring") {
      if ([3, 4].includes(this.quarterDay)) {
        dark = true;
      }
    }
    if (this.state.season === "Summer") {
      if ([4].includes(this.quarterDay)) {
        dark = true;
      }
    }
    if (this.state.season === "Fall") {
      if ([3, 4].includes(this.quarterDay)) {
        dark = true;
      }
    }
    if (this.state.season === "Winter") {
      if ([1, 3, 4].includes(this.quarterDay)) {
        dark = true;
      }
    }

    return dark;
  }

  get dark() {
    return this.state.environmentDark;
  }
  set dark(value) {
    if (this.dark !== value) {
      this.state.environmentDark = value;
      this.dispatchEvent(new CustomEvent("darkness-change"));
    }
  }

  async setDay() {
    let messages = [];
    for (const day of days) {
      // pass in weather and terrain and light level and party state
      messages = messages.concat((await day(this.state)) || []);
    }
    this.dayMessages = messages.filter(Boolean);
    this.round = null;
    this.turn = null;
    this.quarterDay = null;
    this.dispatchEvent(new CustomEvent("day-change"));
    this._currentType = types.DAY;
  }

  async setWeek() {
    let messages = [];
    for (const week of weeks) {
      // pass in weather and terrain and light level and party state
      messages = messages.concat((await week(this.state)) || []);
    }
    this.weekMessages = messages.filter(Boolean);
    this.round = null;
    this.turn = null;
    this.quarterDay = null;
    this._currentType = types.WEEK;
    this.dispatchEvent(new CustomEvent("week-change"));
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
    }
  }

  async reverse(type) {
    switch (type) {
      case types.ROUND:
        await this.decrementRound();
        break;
      case types.TURN:
        await this.decrementTurn();
        break;
      case types.QUARTER_DAY:
        await this.decrementQuarterDay();
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
        await this.setDay();
        break;
      case types.WEEK:
        await this.setWeek();
        break;
    }
  }
}
