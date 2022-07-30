import turns from "./turn.js";
import days from "./day.js";
import rounds from "./round.js";
import quarterDays from "./quarter_day.js";
import weeks from "./week.js";
import { Weather } from "./weather.js";
import { Data } from "./data-structures/data.js";
import { State } from "./data-structures/state.js";

const weather = new Weather();

const journeyActionNames = new Map([
  ["hike", "hike"],
  ["fish", "fish"],
  ["forage", "forage"],
  ["hunt", "hunt"],
  ["keepWatch", "Keep Watch"],
  ["leadTheWay", "Lead The Way"],
  ["rest", "Rest"],
  ["sleep", "Sleep"],
  ["makeCamp", "Make Camp"],
  ["forcedMarch", "Forced March"],
]);

const types = {
  ROUND: "round",
  TURN: "turn",
  QUARTER_DAY: "quarterDay",
  DAY: "day",
  WEEK: "week",
  YEAR: "year",
};

const seasonBoundaries = [
  [91, 1],
  [183, 2],
  [274, 3],
  [365, 4],
];

const seasons = {
  1: "Spring",
  2: "Summer",
  3: "Fall",
  4: "Winter",
};

function getDay(datestamp) {
  let dayNum = datestamp % 365;
  if (dayNum === 0) dayNum = 365;
  return dayNum;
}

function getSeason(datestamp) {
  const day = getDay(datestamp);
  for (const [boundary, seasonNum] of seasonBoundaries) {
    if (day <= boundary) {
      return seasons[seasonNum];
    }
  }
}

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
    weather: null,
    cold: false,
  };

  _round = 1;
  _turn = 1;
  _quarterDay = 1;
  _datestamp = null;
  _currentType = types.QUARTER_DAY;

  _data = new Data();

  messages = [];

  _roundMessages = [];
  _turnMessages = [];
  _quarterDayMessages = [];
  _dayMessages = [];
  _weekMessages = [];

  init() {
    this.datestamp = 1165 * 365 + 1;
    this._data.setDay(this.datestamp, this.state);
  }

  async setState(key, value) {
    if (key === "terrainPlains") {
      this.dispatchEvent(new CustomEvent("background-change", { detail: { background: "plains" } }));
    }
    if (key === "terrainForest") {
      this.dispatchEvent(new CustomEvent("background-change", { detail: { background: "forest" } }));
    }
    if (key === "terrainDarkForest") {
      this.dispatchEvent(new CustomEvent("background-change", { detail: { background: "dark-forest" } }));
    }
    if (key === "terrainHills") {
      this.dispatchEvent(new CustomEvent("background-change", { detail: { background: "hills" } }));
    }
    if (key === "terrainMountains") {
      this.dispatchEvent(new CustomEvent("background-change", { detail: { background: "mountains" } }));
    }
    if (key === "terrainHighMountains") {
      this.dispatchEvent(new CustomEvent("background-change", { detail: { background: "high-mountains" } }));
    }
    if (key === "terrainLake") {
      this.dispatchEvent(new CustomEvent("background-change", { detail: { background: "lake" } }));
    }
    if (key === "terrainRiver") {
      this.dispatchEvent(new CustomEvent("background-change", { detail: { background: "river" } }));
    }
    if (key === "terrainMarshlands") {
      this.dispatchEvent(new CustomEvent("background-change", { detail: { background: "marshlands" } }));
    }
    if (key === "terrainQuagmire") {
      this.dispatchEvent(new CustomEvent("background-change", { detail: { background: "quagmire" } }));
    }
    if (key === "terrainRuins") {
      this.dispatchEvent(new CustomEvent("background-change", { detail: { background: "ruins" } }));
    }

    if (key === "environmentCold") {
      this.weather = {
        wind: this.weather.wind,
        rain: this.weather.rain,
        cold: value,
      };
    }

    if (key === "environmentRain") {
      this.weather = {
        wind: this.weather.wind,
        rain: value,
        cold: this.weather.cold,
      };
    }

    if (key === "environmentWind") {
      this.weather = {
        wind: value,
        rain: this.weather.rain,
        cold: this.weather.cold,
      };
    }

    if (key === "environmentDark") {
      this.dark = value;
    } else this.state[key] = value;

    this._data.setRound(this._data.round, this.state);

    await this.refresh();

    if (journeyActionNames.has(key)) {
      this.dispatchEvent(new CustomEvent("journey-selection-change", { detail: this.journeys }));
    }
  }

  get journeys() {
    const state = new Map();
    for (const [key, value] of Object.entries(this.state)) {
      if (journeyActionNames.has(key)) {
        state.set(key, { key, selected: value, name: journeyActionNames.get(key) });
      }
    }
    return state;
  }

  get round() {
    return this._round;
  }
  set round(value) {
    if (this._round === value) return;
    this._round = value;
    this._data.setRound(this.round, this.state);
    this.dispatchEvent(new CustomEvent("round-change"));
  }

  get turn() {
    return this._turn;
  }
  set turn(value) {
    if (this._turn === value) return;
    this._turn = value;
    this._data.setTurn(this.turn, this.state);
    this.dispatchEvent(new CustomEvent("turn-change"));
  }

  get quarterDay() {
    return this._quarterDay;
  }
  set quarterDay(value) {
    if (this._quarterDay === value) return;
    this._quarterDay = value;
    this._data.setQuarterDay(this.quarterDay, this.state);
    this.dispatchEvent(new CustomEvent("quarter-day-change"));
  }

  get datestamp() {
    return this._datestamp;
  }
  set datestamp(value) {
    if (value === this.datestamp) return;
    this._datestamp = value;
    this.state.season = getSeason(this._datestamp);
    this.regenerateWeather();
    this._data.setDay(this.datestamp, this.state);
    this.dispatchEvent(new CustomEvent("datestamp-change"));
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
    this.round = 1;
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
      const collectedMessages = await quarterDay(this.state);
      for (const message of collectedMessages || []) {
        messages.push(message);
      }
    }
    this.quarterDayMessages = messages.filter(Boolean);
    this.round = 1;
    this.turn = 1;
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

  async decrementQuarterDay() {
    if (this.quarterDay <= 1) {
      await this.reverse("day");
    } else {
      await this.setQuarterDay(this.quarterDay - 1);
    }
  }

  async incrementDay() {
    await this.setDay(this.datestamp + 1);
  }

  async decrementDay() {
    await this.setDay(this.datestamp - 1);
  }

  async setDay(datestamp) {
    let messages = [];
    for (const day of days) {
      // pass in weather and terrain and light level and party state
      messages = messages.concat((await day(this.state)) || []);
    }
    this.dayMessages = messages.filter(Boolean);
    this.round = 1;
    this.turn = 1;
    this.quarterDay = 1;
    this._currentType = types.DAY;
    this.datestamp = datestamp;
    this.dispatchEvent(new CustomEvent("day-change"));
  }

  async incrementWeek() {
    await this.setWeek(this.datestamp + 7);
  }

  async decrementWeek() {
    await this.setWeek(this.datestamp - 7);
  }

  async setWeek(datestamp) {
    let messages = [];
    for (const week of weeks) {
      // pass in weather and terrain and light level and party state
      messages = messages.concat((await week(this.state)) || []);
    }
    this.weekMessages = messages.filter(Boolean);
    this.round = 1;
    this.turn = 1;
    this.quarterDay = 1;
    this.datestamp = datestamp;
    this._currentType = types.WEEK;
    this.dispatchEvent(new CustomEvent("week-change"));
  }

  async incrementYear() {
    await this.setYear(this.datestamp + 365);
  }

  async decrementYear() {
    await this.setYear(this.datestamp - 365);
  }

  async setYear(datestamp) {
    this.round = 1;
    this.turn = 1;
    this.quarterDay = 1;
    this.datestamp = datestamp;
    this.dispatchEvent(new CustomEvent("year-change"));
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

  get weather() {
    return this.state.weather;
  }

  set weather(weather) {
    this.state.weather = weather;
    this.dispatchEvent(new CustomEvent("weather-change"));
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

  regenerateWeather() {
    weather.generate(this.datestamp);
    this.weather = {
      wind: weather.wind,
      rain: weather.rain,
      cold: weather.cold,
    };
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
      case types.YEAR:
        await this.incrementYear();
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
      case types.DAY:
        await this.decrementDay();
        break;
      case types.WEEK:
        await this.decrementWeek();
        break;
      case types.YEAR:
        await this.decrementYear();
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
        await this.setDay(this.datestamp);
        break;
      case types.WEEK:
        await this.setWeek(this.datestamp);
        break;
      case types.YEAR:
        await this.setYear(this.datestamp);
        break;
    }
  }
}
