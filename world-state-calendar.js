import { LitElement, html, css, classMap } from "https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js";

const days = {
  1: "Sunday",
  2: "Moonday",
  3: "Bloodday",
  4: "Earthday",
  5: "Growthday",
  6: "Harvestday",
  7: "Stillday",
};

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

const seasons = {
  1: "Spring",
  2: "Summer",
  3: "Fall",
  4: "Winter",
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

const seasonBoundaries = [
  [91, 1],
  [183, 2],
  [274, 3],
  [365, 4],
];

function getPhaseName(datestamp) {
  const day = getDay(datestamp);
  for (const [boundary, phaseNum] of phaseBoundaries) {
    if (day <= boundary) {
      return phases[phaseNum];
    }
  }
}

function getDayName(datestamp) {
  let dayNum = datestamp % 7;
  if (dayNum === 0) dayNum = 7;
  return days[dayNum];
}

function getYear(datestamp) {
  return Math.floor(datestamp / 365);
}

function getDay(datestamp) {
  let dayNum = datestamp % 365;
  if (dayNum === 0) dayNum = 365;
  return dayNum;
}

function getSeason(datestamp) {
  const day = getDay(datestamp);
  for (const [boundary, seasonNum] of seasonBoundaries) {
    if (day <= boundary) {
      return seasons[seasonNum];
    }
  }
}

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

export class WorldStateCalendar extends LitElement {
  static properties = {
    datestamp: { type: Number },
  };

  constructor() {
    super();
    this.datestamp = 1165 * 365 + 1;
  }

  static styles = css`
    section {
      display: flex;
      flex-direction: column;
    }
    h1 {
      margin: 0;
    }
  `;

  increment(e) {
    if (e.target.dataset.type === "year") {
      this.datestamp += 365;
      this.dispatchEvent(
        new CustomEvent("change", {
          detail: { type: "year", season: getSeason(this.datestamp) },
          bubbles: true,
          composed: true,
        })
      );
    }
    if (e.target.dataset.type === "week") {
      this.datestamp += 7;
      this.dispatchEvent(
        new CustomEvent("change", {
          detail: { type: "week", season: getSeason(this.datestamp) },
          bubbles: true,
          composed: true,
        })
      );
    }
    if (e.target.dataset.type === "day") {
      this.datestamp += 1;
      this.dispatchEvent(
        new CustomEvent("change", {
          detail: { type: "day", season: getSeason(this.datestamp) },
          bubbles: true,
          composed: true,
        })
      );
    }
    e.preventDefault();
  }

  decrement(e) {
    if (e.target.dataset.type === "year") {
      this.datestamp -= 365;
      this.dispatchEvent(
        new CustomEvent("change", {
          detail: { type: "year", season: getSeason(this.datestamp) },
          bubbles: true,
          composed: true,
        })
      );
    }
    if (e.target.dataset.type === "week") {
      this.datestamp -= 7;
      this.dispatchEvent(
        new CustomEvent("change", {
          detail: { type: "week", season: getSeason(this.datestamp) },
          bubbles: true,
          composed: true,
        })
      );
    }
    if (e.target.dataset.type === "day") {
      this.datestamp -= 1;
      this.dispatchEvent(
        new CustomEvent("change", {
          detail: { type: "day", season: getSeason(this.datestamp) },
          bubbles: true,
          composed: true,
        })
      );
    }
    e.preventDefault();
  }

  render() {
    return html`
      <section>
        <h1>
          ${getDayName(this.datestamp)} ${getPhaseDay(this.datestamp)} ${getPhaseName(this.datestamp)},
          ${getYear(this.datestamp)}
        </h1>
        <div>
          <a @click="${this.decrement}" data-type="year" href="#">&lt;&lt;&lt;</a>
          <a @click="${this.decrement}" data-type="week" href="#">&lt;&lt;</a>
          <a @click="${this.decrement}" data-type="day" href="#">&lt;</a>
          <a @click="${this.increment}" data-type="day" href="#">&gt;</a>
          <a @click="${this.increment}" data-type="week" href="#">&gt;&gt;</a>
          <a @click="${this.increment}" data-type="year" href="#">&gt;&gt;&gt;</a>
        </div>
      </section>
    `;
  }
}
