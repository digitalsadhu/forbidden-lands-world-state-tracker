import { Tracker } from "./tracker.js";
import { LitElement, html, css, classMap } from "https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js";

const tracker = new Tracker();

export class WorldStateTracker extends LitElement {
  constructor() {
    super();
    this._title = "";
    this._messages = [];
    this._datestamp = 1165 * 365 + 1;
    this._dark = false;
  }
  static properties = {
    _round: { state: true },
    _turn: { state: true },
    _quarterDay: { state: true },
    _day: { state: true },
    _week: { state: true },
    _title: { state: true },
    _messages: { state: true },
    _datestamp: { state: true },
    _dark: { state: true },
  };
  connectedCallback() {
    super.connectedCallback();
    tracker.addEventListener("round-messages-change", () => {
      this._messages = tracker.roundMessages;
      this._title = "New Round";
    });
    tracker.addEventListener("turn-messages-change", () => {
      this._messages = tracker.turnMessages;
      this._title = "New Turn";
    });
    tracker.addEventListener("quarter-day-messages-change", () => {
      this._messages = tracker.quarterDayMessages;
      this._title = "New Quarter Day";
    });
    tracker.addEventListener("day-messages-change", () => {
      this._messages = tracker.dayMessages;
      this._title = "New Day";
    });
    tracker.addEventListener("week-messages-change", () => {
      this._messages = tracker.weekMessages;
      this._title = "New Week";
    });
    tracker.addEventListener("round-change", () => {
      this._round = tracker.round;
    });
    tracker.addEventListener("turn-change", () => {
      this._turn = tracker.turn;
    });
    tracker.addEventListener("quarter-day-change", () => {
      this._quarterDay = tracker.quarterDay;
    });
    tracker.addEventListener("party-change", () => {
      tracker.refresh();
    });
    tracker.addEventListener("darkness-change", () => {
      this._dark = tracker.dark;
    });
  }
  disconnectedCallback() {
    tracker.removeEventListener("round-messages-change");
    tracker.removeEventListener("turn-messages-change");
    tracker.removeEventListener("quarter-day-messages-change");
    tracker.removeEventListener("day-messages-change");
    tracker.removeEventListener("week-messages-change");
    tracker.removeEventListener("round-change");
    tracker.removeEventListener("turn-change");
    tracker.removeEventListener("quarter-day-change");
    tracker.removeEventListener("day-change");
    tracker.removeEventListener("week-change");
  }

  buttonClicked(event) {
    tracker.advance(event.detail.type);
  }

  selectionChange(event) {
    tracker.setState(event.detail.name, event.detail.selected);
  }

  dateChange(event) {
    if (event.detail.type === "week") {
      tracker.setWeek();
    }
    if (event.detail.type === "day") {
      tracker.setDay();
    }
    tracker.setState("season", event.detail.season);
  }

  render() {
    return html`
      <section class="container">
        <world-state-calendar datestamp="${this._datestamp}" @change="${this.dateChange}"></world-state-calendar>

        <world-state-controls
          round="${this._round}"
          turn="${this._turn}"
          quarterDay="${this._quarterDay}"
          day="${this._day}"
          week="${this._week}"
          @click=${this.buttonClicked}
        ></world-state-controls>

        <world-state-options @change="${this.selectionChange}" ?environment-dark="${this._dark}"></world-state-options>

        <world-state-notes title="${this._title}" messages="${JSON.stringify(this._messages)}"></world-state-notes>
      </section>
    `;
  }
}
