import { LitElement, html, css, classMap } from "https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js";

export class WorldStateControls extends LitElement {
  static properties = {
    round: { type: Number },
    turn: { type: Number },
    quarterDay: { type: Number },
    day: { type: Number },
    week: { type: Number },
  };

  static styles = css`
    :host {
      font-family: Arial, Helvetica, sans-serif;
    }

    .controls {
      display: flex;
    }

    .controls > div {
      flex-grow: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .value-display {
      margin: 10px;
      font-size: x-large;
    }

    .btn {
      align-items: center;
      background-color: initial;
      background-image: linear-gradient(#464d55, #25292e);
      border-radius: 8px;
      border-width: 0;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.05);
      box-sizing: border-box;
      color: #fff;
      cursor: pointer;
      display: inline-flex;
      flex-direction: column;
      font-family: expo-brand-demi, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
        Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
      font-size: 18px;
      height: 52px;
      justify-content: center;
      line-height: 1;
      margin: 0;
      outline: none;
      overflow: hidden;
      padding: 0 32px;
      text-align: center;
      text-decoration: none;
      transform: translate3d(0, 0, 0);
      transition: all 150ms;
      vertical-align: baseline;
      white-space: nowrap;
      user-select: none;
      -webkit-user-select: none;
      touch-action: manipulation;
    }

    .btn:hover {
      box-shadow: rgba(0, 1, 0, 0.2) 0 2px 8px;
      opacity: 0.85;
    }

    .btn:active {
      outline: 0;
    }

    .btn:focus {
      box-shadow: rgba(0, 0, 0, 0.5) 0 0 0 3px;
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
        detail: { type: e.target.dataset.type },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <section class="controls">
        <div>
          <button @click=${this.buttonClick} data-type="round" class="btn">Round</button>
          <div class="value-display">${this.round || "--"}</div>
        </div>
        <div>
          <button @click=${this.buttonClick} data-type="turn" class="btn">Turn</button>
          <div class="value-display">${this.turn || "--"}</div>
        </div>
        <div>
          <button @click=${this.buttonClick} data-type="quarterDay" class="btn">Quarter Day</button>
          <div class="value-display">${this.quarterDay || "--"}</div>
        </div>
      </section>
    `;
  }
}
