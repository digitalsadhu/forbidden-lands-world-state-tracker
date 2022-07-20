import { LitElement, html, css } from "https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js";
import { globalStyles } from "./global-styles.js";

const quarterDays = {
  0: "Morning",
  1: "Morning",
  2: "Afternoon",
  3: "Evening",
  4: "Night",
};

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

function getYear(datestamp) {
  return Math.floor(datestamp / 365);
}

function getDay(datestamp) {
  let dayNum = datestamp % 365;
  if (dayNum === 0) dayNum = 365;
  return dayNum;
}

function getWeek(datestamp) {
  let dayNum = getDay(datestamp);
  return Math.ceil(dayNum / 7);
}

export class WorldStateControls extends LitElement {
  static properties = {
    round: { type: Number },
    turn: { type: Number },
    quarterDay: { type: Number },
    datestamp: { type: Number },
  };

  static styles = [
    globalStyles,
    css`
      .controls {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
        flex-flow: column wrap;
      }
      .controls > div {
        display: flex;
        flex-flow: row;
        align-items: center;
        justify-content: center;
        gap: 5px;
      }
      .value-display {
        min-width: 125px;
      }
      /* Large screens */
      @media all and (min-width: 800px) {
        .controls {
          flex-flow: row nowrap;
        }
        .value-display {
          min-width: 0px;
        }
      }
      .value-display {
        text-align: center;
      }
      .btn {
        border-radius: 100%;
        border: 0;
      }
      .btn:hover {
        cursor: pointer;
        opacity: 0.85;
      }
      .btn:active {
        outline: 0;
      }
      .btn:focus {
      }
    `,
  ];

  buttonClick(e) {
    this.dispatchEvent(
      new CustomEvent("click", {
        detail: { type: e.target.dataset.type, direction: e.target.dataset.direction },
        bubbles: true,
        composed: true,
      })
    );
  }

  quarterDayName(quarterDay = 1) {
    return quarterDays[quarterDay];
  }

  get day() {
    return getDayName(this.datestamp);
  }

  get week() {
    return getWeek(this.datestamp);
  }

  get year() {
    return getYear(this.datestamp);
  }

  render() {
    return html`
      <section class="controls">
        <div>
          <button @click=${this.buttonClick} data-type="day" data-direction="-" class="btn">-</button>
          <h3 class="value-display width-50">Day</h3>
          <button @click=${this.buttonClick} data-type="day" data-direction="+" class="btn">+</button>
        </div>
        <div>
          <button @click=${this.buttonClick} data-type="week" data-direction="-" class="btn">-</button>
          <h3 class="value-display width-70">Week</h3>
          <button @click=${this.buttonClick} data-type="week" data-direction="+" class="btn">+</button>
        </div>
        <div>
          <button @click=${this.buttonClick} data-type="year" data-direction="-" class="btn">-</button>
          <h3 class="value-display width-50">Year</h3>
          <button @click=${this.buttonClick} data-type="year" data-direction="+" class="btn">+</button>
        </div>
      </section>
    `;
  }
}
