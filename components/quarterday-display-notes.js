import { LitElement, html, css } from "../dependencies/lit-all.min.js";
import { globalStyles } from "../global-styles.js";

export class QuarterDayDisplayNotes extends LitElement {
  static properties = {
    active: { type: Boolean, reflect: true, attribute: true },
    round: { type: Number },
    turn: { type: Number },
    quarterDay: { type: Number, attribute: "quarter-day" },
    _selections: { state: true },
    _notes: { state: true },
  };

  constructor() {
    super();
    this._notes = [];
    this._selections = [];
    this.active = false;
    this.round = 1;
    this.turn = 1;
    this.quarterDay = 1;
  }

  connectedCallback() {
    super.connectedCallback();
    const tracker = window.tracker;
    tracker.addEventListener("quarter-day-messages-change", () => {
      if (this.active) this._notes = tracker.quarterDayMessages;
    });
    tracker.addEventListener("journey-selection-change", (e) => {
      if (this.active) this._selections = e.detail;
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    tracker.removeEventListener("quarter-day-messages-change");
    tracker.removeEventListener("journey-selection-change");
  }

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

  get notes() {
    if (this.active) {
      return html`
        <ul>
          ${this._notes.map((note) => {
            return html`<li>${note}</li>`;
          })}
        </ul>
      `;
    }
  }

  get selections() {
    if (!this.active) {
      return Array.from(this._selections.values)
        .filter(({ selected }) => selected)
        .map(({ name }) => html`<span class="c-action">${name}</span>`);
    }
  }

  render() {
    return html`
      <quarterday-display quarter-day=${this.quarterDay}></quarterday-display>
      <div>${this.selections}${this.notes}</div>
    `;
  }
}
