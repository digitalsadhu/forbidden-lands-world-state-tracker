import { LitElement, html } from "../dependencies/lit-all.min.js";
import { ROUND } from "../data-structures/constants.js";

function getRound(timestamp) {
  return (Math.floor(timestamp / ROUND) % 60) + 1;
}

export class RoundDisplay extends LitElement {
  static properties = {
    timestamp: { type: Number },
  };

  get round() {
    // @ts-ignore
    return getRound(this.timestamp);
  }

  // @ts-ignore
  render() {
    return html`${this.round}`;
  }
}
