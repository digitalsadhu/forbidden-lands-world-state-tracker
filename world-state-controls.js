import { LitElement, html, css, classMap } from "https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js";

const quarterDays = {
  0: "Morning",
  1: "Morning",
  2: "Afternoon",
  3: "Evening",
  4: "Night",
};

export class WorldStateControls extends LitElement {
  static properties = {
    round: { type: Number },
    turn: { type: Number },
    quarterDay: { type: Number },
    day: { type: Number },
    week: { type: Number },
  };

  constructor() {
    super();
    this.quarterDay = 1;
  }

  static styles = css`
    :host {
    }

    .controls {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;
    }

    .controls > div {
      flex-grow: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
    }

    .value-display {
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

    @media (max-width: 420px) {
      .btn {
        height: 48px;
      }
    }
  `;

  buttonClick(e) {
    this.dispatchEvent(
      new CustomEvent("click", {
        detail: { type: e.target.dataset.type, direction: e.target.dataset.direction },
        bubbles: true,
        composed: true,
      })
    );
  }

  quarterDayName(quarterDay = 1) {
    console.log(quarterDay);
    return quarterDays[quarterDay];
  }

  render() {
    return html`
      <section class="controls">
        <div>
          <button @click=${this.buttonClick} data-type="round" data-direction="-" class="btn">-</button>
          Round
          <div class="value-display">${this.round || "--"}</div>
          <button @click=${this.buttonClick} data-type="round" data-direction="+" class="btn">+</button>
        </div>
        <div>
          <button @click=${this.buttonClick} data-type="turn" data-direction="-" class="btn">-</button>
          Turn
          <div class="value-display">${this.turn || "--"}</div>
          <button @click=${this.buttonClick} data-type="turn" data-direction="+" class="btn">+</button>
        </div>
        <div>
          <button @click=${this.buttonClick} data-type="quarterDay" data-direction="-" class="btn">-</button>
          <div class="value-display">${this.quarterDayName(this.quarterDay)}</div>
          <button @click=${this.buttonClick} data-type="quarterDay" data-direction="+" class="btn">+</button>
        </div>
      </section>
    `;
  }
}
