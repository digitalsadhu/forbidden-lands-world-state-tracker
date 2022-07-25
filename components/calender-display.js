import { LitElement, html, css } from "../dependencies/lit-all.min.js";

export class CalendarDisplay extends LitElement {
  static properties = {
    datestamp: { type: Number },
  };

  static styles = [
    css`
      :host {
        width: 575px;
        display: block;
        text-align: center;
      }
      h1 {
        margin: 0;
      }
    `,
  ];

  render() {
    return html`
      <section>
        <h1>
          <dayname-display datestamp=${this.datestamp}></dayname-display>
          <day-display datestamp=${this.datestamp}></day-display>
          <season-display datestamp=${this.datestamp}></season-display>,
          <year-display datestamp=${this.datestamp}></year-display>
        </h1>
      </section>
    `;
  }
}
