import { LitElement, html, css, classMap } from "./dependencies/lit-all.min.js";
import { globalStyles } from "./global-styles.js";
import { data } from "./global-state.js";
import { Notes } from "./data-structures/notes.js";

export class WorldStateNotes extends LitElement {
  static properties = {
    // datestamp: { type: Number },
    _round: { state: true },
    _turn: { state: true },
    _quarterDay: { state: true },
    _day: { state: true },
  };

  static styles = [
    globalStyles,
    css`
      :host {
        box-shadow: 0px 0px 32px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        min-height: 400px;
        display: flex;
        flex-direction: column;
        padding: 30px;
        justify-content: flex-start;
        gap: 10px;
      }
      ul {
        padding-left: 10px;
      }
      .controls {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
        flex-flow: row wrap;
      }
      .controls > div {
        display: flex;
        flex-flow: row;
        align-items: center;
        justify-content: center;
        gap: 5px;
      }
      .w-150 {
        width: 150px;
      }
      .w-160 {
        width: 160px;
      }
      .w-170 {
        width: 170px;
      }
      .underline {
        border-bottom: 1px #fff solid;
      }
      .c-skill {
        text-transform: uppercase;
        font-weight: bold;
        color: firebrick;
      }
      .c-attribute {
        text-transform: uppercase;
        font-weight: bold;
        color: coral;
      }
      .c-modifier {
        font-weight: bold;
        color: darkkharki;
      }
      .c-condition {
        text-transform: uppercase;
        font-weight: bold;
        color: aqua;
      }
      .c-action {
        text-transform: uppercase;
        font-weight: bold;
        color: indianred;
      }
      .c-terrain {
        text-transform: uppercase;
        font-weight: bold;
        color: burlywood;
      }
      .c-consumable {
        text-transform: uppercase;
        font-weight: bold;
        color: chocolate;
      }
    `,
  ];

  get timestamp() {
    return Number(new URLSearchParams(window.location.search).get("timestamp"));
  }

  changeHandler(e) {
    // const options = window.localStorage.getItem(`options:${this.timestamp}`);
    // TODO: change weather to only store per day instead of every single round
    // const weather = window.localStorage.getItem(`weather:${this.timestamp}`);
    // populate notes
  }

  connectedCallback() {
    super.connectedCallback();

    // data.addEventListener("change", this.changeHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    // const options = window.localStorage.getItem(`options:${this.timestamp}`);
    // if (!options) {
    // populate notes
    // }
    // data.removeEventListener("change", this.changeHandler);
  }

  constructor() {
    super();
    this.changeHandler = this.changeHandler.bind(this);
  }

  buttonClick(e) {
    const { type, direction } = e.detail;

    if (type === "quarterDay") {
      if (direction === "+") data.nextQuarterDay();
      else if (direction === "-") data.prevQuarterDay();
    }
    if (type === "turn") {
      if (direction === "+") data.nextTurn();
      else if (direction === "-") data.prevTurn();
    }
    if (type === "round") {
      if (direction === "+") data.nextRound();
      else if (direction === "-") data.prevRound();
    }
  }

  // @ts-ignore
  render() {
    return html`
      <section class="controls">
        <div>
          <stepper-control class="w-170" type="quarterDay" @change="${this.buttonClick}">
            <quarterday-display timestamp="${this.timestamp}"></quarterday-display>
          </stepper-control>
        </div>
        <div>
          <stepper-control class="w-150" type="turn" @change="${this.buttonClick}"
            >Turn <turn-display timestamp="${this.timestamp}"></turn-display
          ></stepper-control>
        </div>
        <div>
          <stepper-control class="w-160" type="round" @change="${this.buttonClick}"
            >Round <round-display timestamp="${this.timestamp}"></round-display
          ></stepper-control>
        </div>
      </section>
      <section class="messages">
        <!-- 

        Make a component that 
        * listens to a state change event on the tracker 
        * gets passed the data structure for the day
        * iterates over the data structure for the day
        * uses note-data.js to construct notes for week/day/quarter day/turn and round for the given day
        * displays the notes in a nice way. See components/quarter-day-display-notes.js for an initial attempt to present quarter days

         -->

        <!-- <quarterday-display-notes active quarter-day="1" turn="1" round="1"></quarterday-display-notes> -->
        <!-- Day title eg. Harvestday 3 -->
        <!-- Day notes -->
        <!-- Quarter Day title eg. Morning -->
        <!-- Quarter Day notes eg. HIKE move 2 hexes in open terrain or 1 hex in difficult terrain each quarter day -->
        <!-- Quarter Day choices eg. hike, keep watch, lead the way -->
        <!-- Quarter Day title eg. Afternoon -->
        <!-- Quarter Day notes eg. HIKE move 2 hexes in open terrain or 1 hex in difficult terrain each quarter day -->
        <!-- Quarter Day choices eg. hike, keep watch, lead the way -->
        <!-- etc -->
      </section>
    `;
  }
}

/**
 

<div>
          <h2><dayname-display timestamp="${this.timestamp}"></dayname-display></h2>
          <ul>
            ${Notes.day(data.currentSelectedOptions, data.currentWeather, data.currentDark).map((note) => {
              return html`<li>${note}</li>`;
            })}
          </ul>

          ${Array.from(this._day?.quarterDayList.values()).map(
            (quarterDay) => html`
              <h3>
                <quarterday-display quarter-day="${quarterDay.quarterDay}"></quarterday-display>
              </h3>
              <div>
                <ul>
                  ${Notes.quarterDay(data.currentSelectedOptions, data.currentWeather, data.currentDark).map((note) => {
                    return html`<li>${note}</li>`;
                  })}
                </ul>
              </div>
            `
          )}
        </div>


 */
