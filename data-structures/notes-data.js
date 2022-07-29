import weeks from "../week.js";
import days from "../day.js";
import quarterDays from "../quarter_day.js";
import turns from "../turn.js";
import rounds from "../round.js";

export class NotesData {
  static async week(state) {
    let messages = [];
    for (const week of weeks) {
      messages = messages.concat((await week(state)) || []);
    }
    return messages.filter(Boolean);
  }
  static async day(state) {
    let messages = [];
    for (const day of days) {
      messages = messages.concat((await day(state)) || []);
    }
    return messages.filter(Boolean);
  }
  static async quarterDay(state) {
    let messages = [];
    for (const quarterDay of quarterDays) {
      messages = messages.concat((await quarterDay(state)) || []);
    }
    return messages.filter(Boolean);
  }
  static async turn(state) {
    let messages = [];
    for (const turn of turns) {
      messages = messages.concat((await turn(state)) || []);
    }
    return messages.filter(Boolean);
  }
  static async round(state) {
    let messages = [];
    for (const round of rounds) {
      messages = messages.concat((await round(state)) || []);
    }
    return messages.filter(Boolean);
  }
}
