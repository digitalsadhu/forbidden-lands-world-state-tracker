import { LitElement, html, css } from "/dependencies/lit-all.min.js";

export class StepperControl extends LitElement {
  static properties = {
    type: { type: String },
  };

  static styles = css`
    :host {
      display: inline-block;
    }

    slot {
      display: block;
      margin: 0 10px;
    }

    div {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }

    button {
      border-radius: 100%;
      border: 0;
      width: 24px;
      height: 24px;
      color: #767676;
    }

    button:hover {
      cursor: pointer;
    }

    h3 {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
      padding: 0;
    }

    span {
      display: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  `;

  click(e) {
    const event = { detail: { type: this.type, direction: e.currentTarget.dataset.direction } };
    this.dispatchEvent(new CustomEvent("change", event));
  }

  render() {
    return html`
      <div>
        <button @click=${this.click} data-type="${this.type}" data-direction="-"><span>-</span></button>
        <h3><slot></slot></h3>
        <button @click=${this.click} data-type="${this.type}" data-direction="+"><span>+</span></button>
      </div>
    `;
  }
}
