import { LitElement, html, css } from "./dependencies/lit-all.min.js";
import { Tracker } from "./tracker.js";
import { globalStyles } from "./global-styles.js";

const tracker = new Tracker();
window.tracker = tracker;

export class WorldStateTracker extends LitElement {
  static styles = [
    globalStyles,
    css`
      :host {
        color: var(--text-color);
      }

      .left {
        background-color: rgba(51, 51, 51, 0.8);
        box-shadow: 0px 0px 32px rgba(0, 0, 0, 0.5);
        border-radius: 8px;
        color: #fff;
        max-width: 650px;
      }

      .right {
        border-radius: 8px;
        background: linear-gradient(180deg, #000, rgb(0, 0, 0, 0));
        color: #fff;
        box-shadow: 0px 0px 32px rgba(0, 0, 0, 0.1);
        padding-bottom: 200px;
      }

      header {
        display: flex;
        flex-flow: column wrap;
        justify-content: center;
        align-items: center;
        padding: 15px 0px;
        margin-bottom: 30px;
        gap: 20px;
        background-color: #000000;
        color: #fff;
      }

      header > div {
        display: flex;
        flex-flow: column wrap;
        justify-content: center;
        align-items: center;
        gap: 10px;
      }

      .container {
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin: 0 30px;
        align-items: flex-start;
      }

      /* Large screens */
      @media all and (min-width: 800px) {
        header {
          display: flex;
          flex-flow: row wrap;
          justify-content: center;
          align-items: center;
          padding: 30px 0px;
        }

        .container {
          flex-direction: row;
          gap: 30px;
          justify-content: center;
        }

        .left {
          min-width: 35%;
          flex-grow: 2;
        }

        .right {
          min-width: 775px;
        }
      }
    `,
  ];
  constructor() {
    super();
    this._title = "";
    this._messages = [];
    this._datestamp = 1165 * 365 + 1;
    this._dark = false;
    this._round = 1;
    this._turn = 1;
    this._quarterDay = 1;
  }
  static properties = {
    _round: { state: true },
    _turn: { state: true },
    _quarterDay: { state: true },
    _title: { state: true },
    _messages: { state: true },
    _datestamp: { state: true },
    _dark: { state: true },
    _wind: { state: true },
    _rain: { state: true },
    _cold: { state: true },
  };
  connectedCallback() {
    super.connectedCallback();
    tracker.addEventListener("round-change", () => {
      this._round = tracker.round;
    });
    tracker.addEventListener("turn-change", () => {
      this._turn = tracker.turn;
    });
    tracker.addEventListener("quarter-day-change", () => {
      this._quarterDay = tracker.quarterDay;
    });
    tracker.addEventListener("datestamp-change", () => {
      this._datestamp = tracker.datestamp;
    });
    tracker.addEventListener("party-change", () => {
      tracker.refresh();
    });
    tracker.addEventListener("darkness-change", () => {
      this._dark = tracker.dark;
      document.documentElement.classList.toggle("dark");
    });
    tracker.addEventListener("weather-change", () => {
      this._wind = tracker.weather.wind;
      this._rain = tracker.weather.rain;
      this._cold = tracker.weather.cold;
    });
    tracker.addEventListener("background-change", (e) => {
      document.body.classList.toggle(e.detail.background);
    });
    tracker.init();
  }
  disconnectedCallback() {
    tracker.removeEventListener("round-change");
    tracker.removeEventListener("turn-change");
    tracker.removeEventListener("quarter-day-change");
    tracker.removeEventListener("datestamp-change");
    tracker.removeEventListener("party-change");
    tracker.removeEventListener("darkness-change");
  }

  buttonClicked(event) {
    if (event.detail.direction === "+") tracker.advance(event.detail.type);
    if (event.detail.direction === "-") tracker.reverse(event.detail.type);
    tracker.dark = tracker.calculateDarkness();
  }

  selectionChange(event) {
    tracker.setState(event.detail.name, event.detail.selected);
  }

  coldChange(event) {
    tracker.setState("cold", event.detail.value);
  }

  rainChange(event) {
    tracker.setState("rain", event.detail.value);
  }

  windChange(event) {
    tracker.setState("wind", event.detail.value);
  }

  // async dateChange(event) {
  //   if (event.detail.type === "week") {
  //     await tracker.setWeek();
  //   }
  //   if (event.detail.type === "day") {
  //     await tracker.setDay();
  //   }
  //   tracker.setState("season", event.detail.season);
  // }

  render() {
    return html`
      <header>
        <world-state-controls
          round="${this._round}"
          turn="${this._turn}"
          quarterDay="${this._quarterDay}"
          datestamp=${this._datestamp}
          @click=${this.buttonClicked}
        ></world-state-controls>
        <div>
          <calendar-display datestamp="${this._datestamp}"></calendar-display>
          <weather-display wind="${this._wind}" rain="${this._rain}" cold="${this._cold}"></weather-display>
        </div>
      </header>
      <section class="container">
        <div class="left">
          <world-state-notes
            datestamp="${this._datestamp}"
            round="${this._round}"
            turn="${this._turn}"
            quarter-day="${this._quarterDay}"
            @click="${this.buttonClicked}"
          ></world-state-notes>
        </div>
        <div class="right">
          <world-state-options
            @change="${this.selectionChange}"
            @cold-change="${this.coldChange}"
            @rain-change="${this.rainChange}"
            @wind-change="${this.windChange}"
            ?environment-dark="${this._dark}"
            environment-cold="${this._cold}"
            environment-rain="${this._rain}"
            environment-wind="${this._wind}"
          ></world-state-options>
        </div>
      </section>
    `;
  }
}
