import { LitElement, html } from "../dependencies/lit-all.min.js";
import { DAY } from "../data-structures/constants.js";

const phases = {
  1: "Springrise",
  2: "Springwane",
  3: "Summerrise",
  4: "Summerwane",
  5: "Fallrise",
  6: "Fallwane",
  7: "Winterrise",
  8: "Winterwane",
};

const phaseBoundaries = [
  [45, 1],
  [91, 2],
  [137, 3],
  [183, 4],
  [228, 5],
  [274, 6],
  [319, 7],
  [365, 8],
];

function getPhaseName(timestamp) {
  const day = getDayOfYear(timestamp);
  for (const [boundary, phaseNum] of phaseBoundaries) {
    if (day <= boundary) {
      return phases[phaseNum];
    }
  }
}

function getDayOfYear(timestamp) {
  let dayNum = ((timestamp / DAY) % 365) + 1;
  // if (dayNum === 0) dayNum = 365;
  return dayNum;
}

export class SeasonDisplay extends LitElement {
  static properties = {
    timestamp: { type: Number },
  };

  // @ts-ignore
  render() {
    // @ts-ignore
    return html`${getPhaseName(this.timestamp)}`;
  }
}
