import { LitElement, html, css, classMap } from "https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js";
import { globalStyles } from "./global-styles.js";

export class WorldStateNotes extends LitElement {
  constructor() {
    super();
    this.messages = [];
  }

  static properties = {
    datestamp: { type: Number },
    messages: { type: Array },
    round: { type: Number },
    turn: { type: Number },
    quarterDay: { type: Number, attribute: "quarter-day" },
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
        align-items: center;
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
      .w-150 {
        width: 150px;
      }
      .w-160 {
        width: 160px;
      }
      .w-170 {
        width: 170px;
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

  render() {
    return html`
      <section class="messages">
        <h2>
          <dayname-display datestamp=${this.datestamp}></dayname-display>
          <day-display datestamp=${this.datestamp}></day-display>
        </h2>
        <div>
          <ul>
            ${this.messages.map((message) => html`<li>${message}</li>`)}
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
