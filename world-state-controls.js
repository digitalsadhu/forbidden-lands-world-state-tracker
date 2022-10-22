import { LitElement, html, css } from "./dependencies/lit-all.min.js";
import { globalStyles } from "./global-styles.js";
import { data } from "./global-state.js";
import { events } from "./events.js";

export class WorldStateControls extends LitElement {
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
    const { type, direction } = e.detail;
    if (type === "day") {
      if (direction === "+") data.advanceDay(events.state);
      else if (direction === "-") data.reverseDay(events.state);
    }
    if (type === "week") {
      if (direction === "+") data.advanceWeek(events.state);
      else if (direction === "-") data.reverseWeek(events.state);
    }
    if (type === "year") {
      if (direction === "+") data.advanceYear(events.state);
      else if (direction === "-") data.reverseYear(events.state);
    }
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
