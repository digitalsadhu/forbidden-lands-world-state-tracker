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
    `,
  ];

  buttonClick(e) {
    this.dispatchEvent(
      new CustomEvent("click", {
        detail: { type: e.target.dataset.type, direction: e.target.dataset.direction },
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
          <button @click=${this.buttonClick} data-type="quarterDay" data-direction="-" class="btn">-</button>
          <h3 class="value-display width-100">
            <quarterday-display quarter-day="${this.quarterDay}"></quarterday-display>
          </h3>
          <button @click=${this.buttonClick} data-type="quarterDay" data-direction="+" class="btn">+</button>
        </div>
        <div>
          <button @click=${this.buttonClick} data-type="turn" data-direction="-" class="btn">-</button>
          <h3 class="value-display width-75">Turn ${this.turn}</h3>
          <button @click=${this.buttonClick} data-type="turn" data-direction="+" class="btn">+</button>
        </div>
        <div>
          <button @click=${this.buttonClick} data-type="round" data-direction="-" class="btn">-</button>
          <h3 class="value-display width-100">Round ${this.round}</h3>
          <button @click=${this.buttonClick} data-type="round" data-direction="+" class="btn">+</button>
        </div>
      </section>
    `;
  }
}
