import { LitElement, html, css } from "../dependencies/lit-all.min.js";

export class CalendarDisplay extends LitElement {
  static properties = {
    timestamp: { type: Number },
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

  // @ts-ignore
  render() {
    // @ts-ignore
    const timestamp = this.timestamp;
    return html`
      <section>
        <h1>
          <dayname-display timestamp=${timestamp}></dayname-display>
          <day-display timestamp=${timestamp}></day-display>
          <season-display timestamp=${timestamp}></season-display>,
          <year-display timestamp=${timestamp}></year-display>
        </h1>
      </section>
    `;
  }
}
