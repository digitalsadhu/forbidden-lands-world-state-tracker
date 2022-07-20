import { Tracker } from "./tracker.js";
import { LitElement, html, css, classMap } from "https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js";

const tracker = new Tracker();

export class WorldStateTracker extends LitElement {
  static styles = css`
    header {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 15px 0px;
      border-bottom: 1px #dddddd solid;
      margin-bottom: 30px;
    }

    .container {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin: 0 30px;
    }

    /* Large screens */
    @media all and (min-width: 800px) {
      header {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 100px;
        padding: 15px 0px;
        border-bottom: 1px #dddddd solid;
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
      }
    }
  `;
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
    tracker.addEventListener("next-day", () => {
      this._datestamp += 1;
    });
    tracker.addEventListener("previous-day", () => {
      this._datestamp -= 1;
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
    // tracker.removeEventListener("day-change");
    // tracker.removeEventListener("week-change");
    tracker.removeEventListener("party-change");
    tracker.removeEventListener("darkness-change");
    tracker.removeEventListener("next-day");
    tracker.removeEventListener("previous-day");
  }

  buttonClicked(event) {
    if (event.detail.direction === "+") tracker.advance(event.detail.type);
    if (event.detail.direction === "-") tracker.reverse(event.detail.type);
    tracker.dark = tracker.calculateDarkness();
  }

  selectionChange(event) {
    tracker.setState(event.detail.name, event.detail.selected);
  }

  async dateChange(event) {
    if (event.detail.type === "week") {
      await tracker.setWeek();
    }
    if (event.detail.type === "day") {
      await tracker.setDay();
    }
    tracker.setState("season", event.detail.season);
  }

  render() {
    return html`
      <header>
        <world-state-calendar datestamp="${this._datestamp}" @change="${this.dateChange}"></world-state-calendar>
        <world-state-controls
          round="${this._round}"
          turn="${this._turn}"
          quarterDay="${this._quarterDay}"
          day="${this._day}"
          week="${this._week}"
          @click=${this.buttonClicked}
        ></world-state-controls>
      </header>

      <section class="container">
        <div class="left">
          <world-state-notes title="${this._title}" messages="${JSON.stringify(this._messages)}"></world-state-notes>
        </div>
        <div class="right">
          <world-state-options
            @change="${this.selectionChange}"
            ?environment-dark="${this._dark}"
          ></world-state-options>
        </div>
      </section>
    `;
  }
}
