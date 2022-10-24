// @ts-nocheck

import { LitElement, html, css } from "./dependencies/lit-all.min.js";
import { globalStyles } from "./global-styles.js";
import { data } from "./global-state.js";
import { DAY } from "./data-structures/constants.js";
import { Weather } from "./weather.js";
import { Database } from "./data-structures/database.js";

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

  static properties = {
    _wind: { state: true },
    _cold: { state: true },
    _rain: { state: true },
  };

  constructor() {
    super();
    this._weather = {};
  }

  get timestamp() {
    return Number(new URLSearchParams(window.location.search).get("timestamp"));
  }

  get datestamp() {
    return Math.floor(this.timestamp / DAY);
  }

  async connectedCallback() {
    super.connectedCallback();
    Database.initialize("weather").addEventListener("write", (e) => {
      const weather = new Weather(e.detail.value);
      this._rain = weather.rain;
      this._cold = weather.cold;
      this._wind = weather.wind;
    });

    if (!(await Database.initialize("weather").has(this.datestamp))) {
      await Database.initialize("weather").set(this.datestamp, new Weather());
    } else {
      const weather = await Database.initialize("weather").get(this.datestamp);
      this._rain = weather.rain;
      this._cold = weather.cold;
      this._wind = weather.wind;
    }
  }

  render() {
    return html`
      <header>
        <world-state-controls></world-state-controls>
        <div>
          <calendar-display timestamp="${this.timestamp}"></calendar-display>
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
