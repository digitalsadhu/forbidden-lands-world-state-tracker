import weeks from "../week.js";
import days from "../day.js";
import quarterDays from "../quarter_day.js";
import turns from "../turn.js";
import rounds from "../round.js";

export class Notes {
  /**
   * @param { import("../data-structures/selected-options").SelectedOptions } selectedOptions
   * @param { import("../weather").Weather } weather
   * @param { boolean } dark
   * */
  static week(selectedOptions, weather, dark) {
    let messages = [];
    for (const week of weeks) {
      messages = messages.concat(week(selectedOptions, weather, dark) || []);
    }
    return messages.filter(Boolean);
  }

  /**
   * @param { import("../data-structures/selected-options").SelectedOptions } selectedOptions
   * @param { import("../weather").Weather } weather
   * @param { boolean } dark
   * */
  static day(selectedOptions, weather, dark) {
    let messages = [];
    for (const day of days) {
      messages = messages.concat(day(selectedOptions, weather, dark) || []);
    }
    return messages.filter(Boolean);
  }

  /**
   * @param { import("../data-structures/selected-options").SelectedOptions } selectedOptions
   * @param { import("../weather").Weather } weather
   * @param { boolean } dark
   * */
  static quarterDay(selectedOptions, weather, dark) {
    console.log(selectedOptions, weather, dark);
    let messages = [];
    for (const quarterDay of quarterDays) {
      messages = messages.concat(quarterDay(selectedOptions, weather, dark) || []);
    }
    return messages.filter(Boolean);
  }

  /**
   * @param { import("../data-structures/selected-options").SelectedOptions } selectedOptions
   * @param { import("../weather").Weather } weather
   * @param { boolean } dark
   * */
  static turn(selectedOptions, weather, dark) {
    let messages = [];
    for (const turn of turns) {
      messages = messages.concat(turn(selectedOptions, weather, dark) || []);
    }
    return messages.filter(Boolean);
  }

  /**
   * @param { import("../data-structures/selected-options").SelectedOptions } selectedOptions
   * @param { import("../weather").Weather } weather
   * @param { boolean } dark
   * */
  static round(selectedOptions, weather, dark) {
    let messages = [];
    for (const round of rounds) {
      messages = messages.concat(round(selectedOptions, weather, dark) || []);
    }
    return messages.filter(Boolean);
  }
}
