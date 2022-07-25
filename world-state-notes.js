import { LitElement, html, css, classMap } from "/dependencies/lit-all.min.js";
import { globalStyles } from "./global-styles.js";

export class WorldStateNotes extends LitElement {
  constructor() {
    super();
    this._messages = [];
  }

  static properties = {
    datestamp: { type: Number },
    round: { type: Number },
    turn: { type: Number },
    quarterDay: { type: Number, attribute: "quarter-day" },
    _messages: { state: true },
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
        justify-content: space-between;
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
    return html`
      <section class="messages">
        <h2>
          <dayname-display datestamp=${this.datestamp}></dayname-display>
          <day-display datestamp=${this.datestamp}></day-display>
        </h2>
        <div>
          <ul>
            ${this._messages.map((message) => {
              return html`<li>${message}</li>`;
            })}
          </ul>
        </div>
      </section>
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
    `;
  }
}
