import { LitElement, html, css } from "./dependencies/lit-all.min.js";
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
      stepper-control {
        padding: 5px;
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
        detail: { type: e.detail.type, direction: e.detail.direction },
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
          <stepper-control type="day" name="Day" @change="${this.buttonClick}">Day</stepper-control>
        </div>
        <div>
          <stepper-control type="week" name="Week" @change="${this.buttonClick}">Week</stepper-control>
        </div>
        <div>
          <stepper-control type="year" name="Year" @change="${this.buttonClick}">Year</stepper-control>
        </div>
      </section>
    `;
  }
}
