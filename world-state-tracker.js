// @ts-nocheck

import { LitElement, html, css } from "./dependencies/lit-all.min.js";
import { globalStyles } from "./global-styles.js";
import { data } from "./global-state.js";

export class WorldStateTracker extends LitElement {
  static styles = [
    globalStyles,
    css`
      :host {
        color: var(--text-color);
      }

      .left {
        background-color: rgba(51, 51, 51, 0.8);
        box-shadow: 0px 0px 32px rgba(0, 0, 0, 0.5);
        border-radius: 8px;
        color: #fff;
        max-width: 600px;
      }

      .right {
        border-radius: 8px;
        background: linear-gradient(180deg, #000, rgb(0, 0, 0, 0));
        color: #fff;
        box-shadow: 0px 0px 32px rgba(0, 0, 0, 0.1);
        padding-bottom: 200px;
      }

      header {
        display: flex;
        flex-flow: column wrap;
        justify-content: center;
        align-items: center;
        padding: 15px 0px;
        margin-bottom: 30px;
        gap: 20px;
        background-color: #000000;
        color: #fff;
      }

      header > div {
        display: flex;
        flex-flow: column wrap;
        justify-content: center;
        align-items: center;
        gap: 10px;
      }

      .container {
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin: 0 30px;
        align-items: flex-start;
      }

      /* Large screens */
      @media all and (min-width: 800px) {
        header {
          display: flex;
          flex-flow: row wrap;
          justify-content: center;
          align-items: center;
          padding: 30px 0px;
        }

        .container {
          flex-direction: row;
          gap: 30px;
          justify-content: center;
        }

        .left {
          min-width: 35%;
          flex-grow: 2;
        }

        .right {
          min-width: 775px;
        }
      }
    `,
  ];
  constructor() {
    super();
    this._datestamp = 1165 * 365 + 1;
    this.changeHandler = this.changeHandler.bind(this);
  }
  static properties = {
    _datestamp: { state: true },
    _wind: { state: true },
    _rain: { state: true },
    _cold: { state: true },
  };

  changeHandler(e) {
    const { type } = e.detail;
    if (type === "day") {
      this._datestamp = data.day;
      this._wind = data.currentWeather.wind;
      this._rain = data.currentWeather.rain;
      this._cold = data.currentWeather.cold;
    }
  }

  connectedCallback() {
    super.connectedCallback();
    data.addEventListener("change", this.changeHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    data.removeEventListener("change", this.changeHandler);
  }

  render() {
    return html`
      <header>
        <world-state-controls></world-state-controls>
        <div>
          <calendar-display datestamp="${this._datestamp}"></calendar-display>
          <weather-display wind="${this._wind}" rain="${this._rain}" cold="${this._cold}"></weather-display>
        </div>
      </header>
      <section class="container">
        <div class="left">
          <world-state-notes></world-state-notes>
        </div>
        <div class="right">
          <world-state-options></world-state-options>
        </div>
      </section>
    `;
  }
}
