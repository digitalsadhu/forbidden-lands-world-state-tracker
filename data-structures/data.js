import { Day } from "./day.js";
import { QuarterDay } from "./quarter-day.js";
import { Round } from "./round.js";
import { Turn } from "./turn.js";

export class Data {
  day = null;
  quarterDay = null;
  turn = null;
  round = null;
  days = new Map();

  static restore(data) {
    const _data = new this();
    _data.day = data.day;
    _data.quarterDay = data.quarterDay;
    _data.turn = data.turn;
    _data.round = data.round;
    for (const day of data.days) {
      const _day = new Day(day.day);
      _day.quarterDay = day.quarterDay;
      _day.turn = day.turn;
      _day.round = day.round;
      _data.days.set(_day.day, _day);
      for (const quarterDay of day.quarterDays) {
        const _quarterDay = new QuarterDay(quarterDay.quarterDay);
        _quarterDay.turn = quarterDay.turn;
        _quarterDay.round = quarterDay.round;
        _day.quarterDays.set(_quarterDay.quarterDay, _quarterDay);
        for (const turn of quarterDay.turns) {
          const _turn = new Turn(turn.turn);
          _turn.round = turn.round;
          _quarterDay.turns.set(_turn.turn, _turn);
          for (const round of turn.rounds) {
            const _round = new Round(round.round, round.state);
            _turn.rounds.set(_round.round, _round);
          }
        }
      }
    }
    return _data;
  }

  setDay(datestamp, state) {
    if (!datestamp) {
      throw new Error("datestamp required when calling addDay()");
    }
    if (!state) {
      throw new Error("state required when calling addDay()");
    }

    this.day = datestamp;
    this.quarterDay = 1;
    this.turn = 1;
    this.round = 1;

    const day = new Day(this.day);
    this.days.set(this.day, day);

    const quarterDay = new QuarterDay(this.quarterDay);
    day.setQuarterDay(quarterDay);

    const turn = new Turn(this.turn);
    quarterDay.setTurn(turn);

    const round = new Round(this.round, state);
    turn.setRound(round);
  }

  setQuarterDay(quarterDayNumber, state) {
    if (!quarterDayNumber) {
      throw new Error("setQuarterDay requires a quarter day number to be provided.");
    }
    const day = this.days.get(this.day);
    if (!day) {
      throw new Error("No day found. Create a new day before creating quarter days.");
    }

    this.quarterDay = quarterDayNumber;
    day.quarterDay = quarterDayNumber;
    this.turn = 1;
    this.round = 1;

    const quarterDay = new QuarterDay(quarterDayNumber);
    day.setQuarterDay(quarterDay);

    const turn = new Turn(this.turn);
    quarterDay.setTurn(turn);

    const round = new Round(this.round, state);
    turn.setRound(round);
  }

  setTurn(turnNumber, state) {
    if (!turnNumber) {
      throw new Error("setTurn requires a turn number to be provided.");
    }

    this.turn = turnNumber;
    this.round = 1;

    const day = this.days.get(this.day);
    if (!day) {
      throw new Error("No day found. Create a new day before creating turns.");
    }
    day.turn = turnNumber;
    const quarterDay = day.quarterDays.get(this.quarterDay);
    quarterDay.turn = turnNumber;

    const _turn = new Turn(this.turn);
    quarterDay.setTurn(_turn);

    const round = new Round(this.round, state);
    _turn.setRound(round);
  }

  setRound(roundNumber, state) {
    if (!roundNumber) {
      throw new Error("setRound requires a round number to be provided.");
    }
    const day = this.days.get(this.day);
    if (!day) {
      throw new Error("No day found. Create a new day before creating rounds days.");
    }

    this.round = roundNumber;
    day.round = roundNumber;

    const quarterDay = day.quarterDays.get(this.quarterDay);
    quarterDay.round = roundNumber;
    const turn = quarterDay.turns.get(this.turn);
    turn.round = roundNumber;

    const _round = new Round(this.round, state);
    turn.setRound(_round);
  }

  toJSON() {
    return {
      day: this.day,
      quarterDay: this.quarterDay,
      turn: this.turn,
      round: this.round,
      days: Array.from(this.days.values()),
    };
  }
}
