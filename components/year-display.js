import { LitElement, html } from "../dependencies/lit-all.min.js";
import { YEAR } from "../data-structures/constants.js";

function getYear(timestamp) {
  return Math.floor(timestamp / YEAR);
}

export class YearDisplay extends LitElement {
  static properties = {
    timestamp: { type: Number },
  };

  get year() {
    // @ts-ignore
    return getYear(this.timestamp);
  }

  // @ts-ignore
  render() {
    return html`${this.year}`;
  }
}
