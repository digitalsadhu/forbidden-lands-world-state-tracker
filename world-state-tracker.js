import { LitElement, html, css } from "https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js";
import { Tracker } from "./tracker.js";
import { globalStyles } from "./global-styles.js";

const tracker = new Tracker();

export class WorldStateTracker extends LitElement {
  static styles = [
    globalStyles,
    css`
      header {
        display: flex;
        flex-flow: column wrap;
        justify-content: center;
        align-items: center;
        padding: 15px 0px;
        border-bottom: 1px #dddddd solid;
        margin-bottom: 30px;
        gap: 20px;
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
          flex-flow: row wrap;
          justify-content: center;
          align-items: center;
          padding: 30px 0px;
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
  };
  connectedCallback() {
    super.connectedCallback();
    tracker.addEventListener("round-messages-change", () => {
      this._messages = tracker.roundMessages;
    });
    tracker.addEventListener("turn-messages-change", () => {
      this._messages = tracker.turnMessages;
    });
    tracker.addEventListener("quarter-day-messages-change", () => {
      this._messages = tracker.quarterDayMessages;
    });
    tracker.addEventListener("day-messages-change", () => {
      this._messages = tracker.dayMessages;
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
    tracker.addEventListener("datestamp-change", () => {
      console.log(this._datestamp, tracker.datestamp);
      this._datestamp = tracker.datestamp;
    });
    tracker.addEventListener("party-change", () => {
      tracker.refresh();
    });
    tracker.addEventListener("darkness-change", () => {
      this._dark = tracker.dark;
      document.documentElement.classList.toggle("dark");
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
        <calendar-display datestamp="${this._datestamp}"></calendar-display>
        <world-state-controls
          round="${this._round}"
          turn="${this._turn}"
          quarterDay="${this._quarterDay}"
          datestamp=${this._datestamp}
          @click=${this.buttonClicked}
        ></world-state-controls>
      </header>
      <section class="container">
        <div class="left">
          <world-state-notes
            datestamp="${this._datestamp}"
            round="${this._round}"
            turn="${this._turn}"
            quarter-day="${this._quarterDay}"
            messages="${JSON.stringify(this._messages)}"
            @click="${this.buttonClicked}"
          ></world-state-notes>
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
