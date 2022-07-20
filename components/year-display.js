import { LitElement, html } from "https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js";

function getYear(datestamp) {
  return Math.floor(datestamp / 365);
}

export class YearDisplay extends LitElement {
  static properties = {
    datestamp: { type: Number },
  };

  render() {
    return html`${getYear(this.datestamp)}`;
  }
}
