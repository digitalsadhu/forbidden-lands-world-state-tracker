import { LitElement, html } from "../dependencies/lit-all.min.js";
import { TURN } from "../data-structures/constants.js";

function getTurn(timestamp) {
  return (Math.floor(timestamp / TURN) % 24) + 1;
}

export class TurnDisplay extends LitElement {
  static properties = {
    timestamp: { type: Number },
  };

  get turn() {
    // @ts-ignore
    return getTurn(this.timestamp);
  }

  // @ts-ignore
  render() {
    return html`${this.turn}`;
  }
}
