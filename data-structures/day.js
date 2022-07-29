export class Day {
  day = null;
  quarterDay = 1;
  turn = 1;
  round = 1;
  quarterDays = new Map();

  constructor(day) {
    this.day = day;
  }

  setQuarterDay(quarterDay) {
    this.quarterDay = quarterDay.quarterDay;
    this.quarterDays.set(quarterDay.quarterDay, quarterDay);
  }

  toJSON() {
    return {
      day: this.day,
      quarterDay: this.quarterDay,
      turn: this.turn,
      round: this.round,
      quarterDays: Array.from(this.quarterDays.values()),
    };
  }
}
