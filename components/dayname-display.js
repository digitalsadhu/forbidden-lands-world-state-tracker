import { LitElement, html } from "../dependencies/lit-all.min.js";
import { DAY } from "../data-structures/constants.js";

const dayList = ["Sunday", "Moonday", "Bloodday", "Earthday", "Growthday", "Harvestday", "Stillday"];

function getDayName(timestamp) {
  const days = Math.floor(timestamp / DAY);
  const dayNum = days % 7;
  return dayList[dayNum];
}

export class DaynameDisplay extends LitElement {
  static properties = {
    timestamp: { type: Number },
  };

  // @ts-ignore
  render() {
    // @ts-ignore
    return html`${getDayName(this.timestamp)}`;
  }
}
