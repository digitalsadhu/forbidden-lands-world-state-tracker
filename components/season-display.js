import { LitElement, html } from "../dependencies/lit-all.min.js";

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

function getPhaseName(datestamp) {
  const day = getDay(datestamp);
  for (const [boundary, phaseNum] of phaseBoundaries) {
    if (day <= boundary) {
      return phases[phaseNum];
    }
  }
}

function getDay(datestamp) {
  let dayNum = datestamp % 365;
  if (dayNum === 0) dayNum = 365;
  return dayNum;
}

export class SeasonDisplay extends LitElement {
  static properties = {
    datestamp: { type: Number },
  };

  render() {
    return html`${getPhaseName(this.datestamp)}`;
  }
}
