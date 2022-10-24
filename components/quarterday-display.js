import { QUARTER_DAY } from "../data-structures/constants.js";
import { LitElement, html } from "../dependencies/lit-all.min.js";

const quarterDays = ["Morning", "Afternoon", "Evening", "Night"];

function getQuarterDay(timestamp) {
  return Math.floor(timestamp / QUARTER_DAY) % 4;
}

export class QuarterDayDisplay extends LitElement {
  static properties = {
    timestamp: { type: Number },
  };

  get quarterDay() {
    // @ts-ignore
    return getQuarterDay(this.timestamp);
  }

  // @ts-ignore
  render() {
    console.log(this.quarterDay);
    // @ts-ignore
    return html`${quarterDays[this.quarterDay]}`;
  }
}
