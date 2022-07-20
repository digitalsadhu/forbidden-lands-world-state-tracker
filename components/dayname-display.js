import { LitElement, html } from "https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js";

const days = {
  1: "Sunday",
  2: "Moonday",
  3: "Bloodday",
  4: "Earthday",
  5: "Growthday",
  6: "Harvestday",
  7: "Stillday",
};

function getDayName(datestamp) {
  let dayNum = datestamp % 7;
  if (dayNum === 0) dayNum = 7;
  return days[dayNum];
}

export class DaynameDisplay extends LitElement {
  static properties = {
    datestamp: { type: Number },
  };

  render() {
    return html`${getDayName(this.datestamp)}`;
  }
}
