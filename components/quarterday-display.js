import { LitElement, html } from "https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js";

const quarterDays = {
  1: "Morning",
  2: "Afternoon",
  3: "Evening",
  4: "Night",
};

function quarterDayName(quarterDay = 1) {
  return quarterDays[quarterDay];
}

export class QuarterDayDisplay extends LitElement {
  static properties = {
    quarterDay: { type: Number, attribute: "quarter-day" },
  };

  render() {
    return html`${quarterDayName(this.quarterDay)}`;
  }
}
