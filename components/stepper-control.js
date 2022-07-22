import { LitElement, html, css } from "https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js";

export class StepperControl extends LitElement {
  static properties = {
    name: { type: String },
    type: { type: String },
  };

  static styles = css`
    :host {
      display: inline-block;
    }
  `;

  click(e) {}

  render() {
    return html`
      <button @click=${this.click} data-type="${this.type}" data-direction="-" class="btn">-</button>
      <h3 class="value-display width-50">${this.name}</h3>
      <button @click=${this.click} data-type="${this.type}" data-direction="+" class="btn">+</button>
    `;
  }
}
