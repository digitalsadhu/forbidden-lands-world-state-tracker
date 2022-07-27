import { LitElement, html, css } from "../dependencies/lit-all.min.js";

export class WeatherDisplay extends LitElement {
  static properties = {
    wind: { type: String },
    rain: { type: String },
    cold: { type: String },
  };

  static styles = [
    css`
      :host {
        display: block;
      }
      h2 {
        margin: 0;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        text-align: center;
        font-size: 16px;
        line-height: 20px;
        gap: 20px;
      }
    `,
  ];

  render() {
    return html`
      <section>
        <h2>
          <div>${this.wind}</div>
          <div>${this.rain === "No Rain" ? "No Rain / Snow" : this.rain}</div>
          <div>${this.cold}</div>
        </h2>
      </section>
    `;
  }
}
