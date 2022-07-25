import { LitElement, html } from "../dependencies/lit-all.min.js";

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

function getPhaseDay(datestamp) {
  const dayOfYear = getDay(datestamp);
  for (let i = 0; i < phaseBoundaries.length; i++) {
    if (phaseBoundaries[i][0] > dayOfYear && phaseBoundaries[i + 1][0] > dayOfYear) {
      return dayOfYear;
    }

    if (phaseBoundaries[i][0] < dayOfYear && dayOfYear <= phaseBoundaries[i + 1][0]) {
      return dayOfYear - phaseBoundaries[i][0];
    }

    if (phaseBoundaries[i][0] < dayOfYear && phaseBoundaries[i + 1][0] < dayOfYear) {
      continue;
    }
  }
}

function getDay(datestamp) {
  let dayNum = datestamp % 365;
  if (dayNum === 0) dayNum = 365;
  return dayNum;
}

export class DayDisplay extends LitElement {
  static properties = {
    datestamp: { type: Number },
  };

  render() {
    return html`${getPhaseDay(this.datestamp)}`;
  }
}
