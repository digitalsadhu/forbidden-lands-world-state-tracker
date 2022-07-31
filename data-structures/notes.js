import weeks from "../week.js";
import days from "../day.js";
import quarterDays from "../quarter_day.js";
import turns from "../turn.js";
import rounds from "../round.js";

export class Notes {
  static week(state) {
    let messages = [];
    for (const week of weeks) {
      messages = messages.concat(week(state) || []);
    }
    return messages.filter(Boolean);
  }
  static day(state) {
    let messages = [];
    for (const day of days) {
      messages = messages.concat(day(state) || []);
    }
    return messages.filter(Boolean);
  }
  static quarterDay(state) {
    let messages = [];
    for (const quarterDay of quarterDays) {
      messages = messages.concat(quarterDay(state) || []);
    }
    return messages.filter(Boolean);
  }
  static turn(state) {
    let messages = [];
    for (const turn of turns) {
      messages = messages.concat(turn(state) || []);
    }
    return messages.filter(Boolean);
  }
  static round(state) {
    let messages = [];
    for (const round of rounds) {
      messages = messages.concat(round(state) || []);
    }
    return messages.filter(Boolean);
  }
}
