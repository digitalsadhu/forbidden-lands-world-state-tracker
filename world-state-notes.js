import { LitElement, html, css, classMap } from "./dependencies/lit-all.min.js";
import { globalStyles } from "./global-styles.js";

export class WorldStateNotes extends LitElement {
  constructor() {
    super();
  }

  static properties = {
    datestamp: { type: Number },
    round: { type: Number },
    turn: { type: Number },
    quarterDay: { type: Number, attribute: "quarter-day" },
    _messages: { state: true },
    _day: { state: true },
  };

  static styles = [
    globalStyles,
    css`
      :host {
        box-shadow: 0px 0px 32px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        min-height: 400px;
        display: flex;
        flex-direction: column;
        padding: 30px;
        justify-content: flex-start;
        gap: 10px;
      }
      ul {
        padding-left: 10px;
      }
      .controls {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
        flex-flow: row wrap;
      }
      .controls > div {
        display: flex;
        flex-flow: row;
        align-items: center;
        justify-content: center;
        gap: 5px;
      }
      .w-150 {
        width: 150px;
      }
      .w-160 {
        width: 160px;
      }
      .w-170 {
        width: 170px;
      }
      .underline {
        border-bottom: 1px #fff solid;
      }
      .c-skill {
        text-transform: uppercase;
        font-weight: bold;
        color: firebrick;
      }
      .c-attribute {
        text-transform: uppercase;
        font-weight: bold;
        color: coral;
      }
      .c-modifier {
        font-weight: bold;
        color: darkkharki;
      }
      .c-condition {
        text-transform: uppercase;
        font-weight: bold;
        color: aqua;
      }
      .c-action {
        text-transform: uppercase;
        font-weight: bold;
        color: indianred;
      }
      .c-terrain {
        text-transform: uppercase;
        font-weight: bold;
        color: burlywood;
      }
      .c-consumable {
        text-transform: uppercase;
        font-weight: bold;
        color: chocolate;
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    const tracker = window.tracker;
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

    const handleStateChange = (e) => {
      this._day = tracker.data.days.get(tracker.data.day);
      console.log(this._day);
    };
    tracker.addEventListener("state-change", handleStateChange);
    tracker.addEventListener("round-change", handleStateChange);
    tracker.addEventListener("turn-change", handleStateChange);
    tracker.addEventListener("quarter-day-change", handleStateChange);
    tracker.addEventListener("day-change", handleStateChange);
    tracker.addEventListener("week-change", handleStateChange);
    tracker.addEventListener("year-change", handleStateChange);
  }

  disconnectedCallback() {
    tracker.removeEventListener("round-messages-change");
    tracker.removeEventListener("turn-messages-change");
    tracker.removeEventListener("quarter-day-messages-change");
    tracker.removeEventListener("day-messages-change");
    tracker.removeEventListener("week-messages-change");
  }

  buttonClick(e) {
    this.dispatchEvent(
      new CustomEvent("click", {
        detail: { type: e.detail.type, direction: e.detail.direction },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    if (!this._day) return;
    return html`
      <section class="controls">
        <div>
          <stepper-control class="w-170" type="quarterDay" @change="${this.buttonClick}">
            <quarterday-display quarter-day="${this.quarterDay}"></quarterday-display>
          </stepper-control>
        </div>
        <div>
          <stepper-control class="w-150" type="turn" @change="${this.buttonClick}">Turn ${this.turn}</stepper-control>
        </div>
        <div>
          <stepper-control class="w-160" type="round" @change="${this.buttonClick}"
            >Round ${this.round}</stepper-control
          >
        </div>
      </section>
      <section class="messages">
        <!-- 

        Make a component that 
        * listens to a state change event on the tracker 
        * gets passed the data structure for the day
        * iterates over the data structure for the day
        * uses note-data.js to construct notes for week/day/quarter day/turn and round for the given day
        * displays the notes in a nice way. See components/quarter-day-display-notes.js for an initial attempt to present quarter days

         -->

        <!-- <quarterday-display-notes active quarter-day="1" turn="1" round="1"></quarterday-display-notes> -->
        <!-- Day title eg. Harvestday 3 -->
        <!-- Day notes -->
        <!-- Quarter Day title eg. Morning -->
        <!-- Quarter Day notes eg. HIKE move 2 hexes in open terrain or 1 hex in difficult terrain each quarter day -->
        <!-- Quarter Day choices eg. hike, keep watch, lead the way -->
        <!-- Quarter Day title eg. Afternoon -->
        <!-- Quarter Day notes eg. HIKE move 2 hexes in open terrain or 1 hex in difficult terrain each quarter day -->
        <!-- Quarter Day choices eg. hike, keep watch, lead the way -->
        <!-- etc -->
        <div>
          <ul>
            ${Array.from(this._day.notes.values()).map((note) => {
              return html`<li>${note}</li>`;
            })}
          </ul>

          <ul>
            ${Array.from(this._day.quarterDays.values()).map((quarterDay) => {
              return html`<li>${quarterDay.notes}</li>`;
            })}
          </ul>
        </div>
      </section>
    `;
  }
}
