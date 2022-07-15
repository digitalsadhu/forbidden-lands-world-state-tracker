import { Tracker } from "./tracker.js";
import { LitElement, html, css, classMap } from "https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js";

const tracker = new Tracker();

class WorldStateControls extends LitElement {
  static properties = {
    round: { type: Number },
    turn: { type: Number },
    quarterDay: { type: Number },
    day: { type: Number },
    week: { type: Number },
  };

  static styles = css`
    :host {
      font-family: Arial, Helvetica, sans-serif;
    }

    .controls {
      display: flex;
    }

    .controls > div {
      flex-grow: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .value-display {
      margin: 10px;
      font-size: x-large;
    }

    .btn {
      align-items: center;
      background-color: initial;
      background-image: linear-gradient(#464d55, #25292e);
      border-radius: 8px;
      border-width: 0;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.05);
      box-sizing: border-box;
      color: #fff;
      cursor: pointer;
      display: inline-flex;
      flex-direction: column;
      font-family: expo-brand-demi, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
        Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
      font-size: 18px;
      height: 52px;
      justify-content: center;
      line-height: 1;
      margin: 0;
      outline: none;
      overflow: hidden;
      padding: 0 32px;
      text-align: center;
      text-decoration: none;
      transform: translate3d(0, 0, 0);
      transition: all 150ms;
      vertical-align: baseline;
      white-space: nowrap;
      user-select: none;
      -webkit-user-select: none;
      touch-action: manipulation;
    }

    .btn:hover {
      box-shadow: rgba(0, 1, 0, 0.2) 0 2px 8px;
      opacity: 0.85;
    }

    .btn:active {
      outline: 0;
    }

    .btn:focus {
      box-shadow: rgba(0, 0, 0, 0.5) 0 0 0 3px;
    }

    @media (max-width: 420px) {
      .btn {
        height: 48px;
      }
    }
  `;

  buttonClick(type) {
    this.dispatchEvent(
      new CustomEvent("click", {
        detail: { type },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <section class="controls">
        <div>
          <button @click=${() => this.buttonClick("round")} class="btn" id="round-btn">Round</button>
          <div class="value-display" id="round-display">${this.round || "--"}</div>
        </div>
        <div>
          <button @click=${() => this.buttonClick("turn")} class="btn" id="turn-btn">Turn</button>
          <div class="value-display" id="turn-display">${this.turn || "--"}</div>
        </div>
        <div>
          <button @click=${() => this.buttonClick("quarterDay")} class="btn" id="quarter-day-btn">Quarter Day</button>
          <div class="value-display" id="quarter-day-display">${this.quarterDay || "--"}</div>
        </div>
        <div>
          <button @click=${() => this.buttonClick("day")} class="btn" id="day-btn">Day</button>
          <div class="value-display" id="day-display">${this.day || "--"}</div>
        </div>
        <div>
          <button @click=${() => this.buttonClick("week")} class="btn" id="week-btn">Week</button>
          <div class="value-display" id="week-display">${this.week || "--"}</div>
        </div>
      </section>
    `;
  }
}

class WorldStateNotes extends LitElement {
  constructor() {
    super();
    this.roundMessages = [];
    this.turnMessages = [];
    this.quarterDayMessages = [];
    this.dayMessages = [];
    this.weekMessages = [];
  }

  static properties = {
    activeSection: { type: String },
    roundMessages: { type: Object },
    turnMessages: { type: Object },
    quarterDayMessages: { type: Object },
    dayMessages: { type: Object },
    weekMessages: { type: Object },
  };

  static styles = css`
    :host {
      font-family: Arial, Helvetica, sans-serif;
    }

    .messages {
      display: flex;
      flex-direction: column;
    }

    .messages > div,
    .messages > message-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .messages > div,
    .messages > message-section {
      animation-duration: 1s;
      animation-name: showit;
    }

    .messages > div.animate-out,
    .messages > message-section.animate-out {
      animation-duration: 0.5s;
      animation-name: hideit;
    }

    .messages > div.hidden,
    .messages > message-section.hidden {
      display: none;
    }

    @keyframes showit {
      from {
        opacity: 0;
      }

      to {
        opacity: 1;
      }
    }

    @keyframes hideit {
      from {
        opacity: 1;
      }

      to {
        opacity: 0;
      }
    }
  `;

  render() {
    return html`
      <section class="messages">
        <message-section
          title="New Round"
          ?active="${this.activeSection === "round"}"
          messages="${JSON.stringify(this.roundMessages)}"
        ></message-section>
        <message-section
          title="New Turn"
          ?active="${this.activeSection === "turn"}"
          messages="${JSON.stringify(this.turnMessages)}"
        ></message-section>
        <message-section
          title="New Quarter Day"
          ?active="${this.activeSection === "quarterDay"}"
          messages="${JSON.stringify(this.quarterDayMessages)}"
        ></message-section>
        <message-section
          title="New Day"
          ?active="${this.activeSection === "day"}"
          messages="${JSON.stringify(this.dayMessages)}"
        ></message-section>
        <message-section
          title="New Week"
          ?active="${this.activeSection === "week"}"
          messages="${JSON.stringify(this.weekMessages)}"
        ></message-section>
      </section>
    `;
  }
}

class MessageSection extends LitElement {
  static properties = {
    active: { type: Boolean },
    title: { type: String },
    type: { type: String },
    messages: { type: Array },
  };
  static styles = css`
    :host {
      font-family: Arial, Helvetica, sans-serif;
    }

    :host {
      display: flex;
      flex-direction: column;
    }

    :host > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    :host > div {
      animation-duration: 1s;
      animation-name: showit;
    }

    :host > div.animate-out {
      animation-duration: 0.5s;
      animation-name: hideit;
    }

    :host .hidden {
      display: none;
    }

    @keyframes showit {
      from {
        opacity: 0;
      }

      to {
        opacity: 1;
      }
    }

    @keyframes hideit {
      from {
        opacity: 1;
      }

      to {
        opacity: 0;
      }
    }
  `;
  render() {
    return html`
      <div class="${classMap({ hidden: !this.active })}">
        <h2>${this.title}</h2>
        <div>
          <ul>
            ${this.messages.map((message) => html`<li>${message}</li>`)}
          </ul>
        </div>
      </div>
    `;
  }
}

class WorldStateTracker extends LitElement {
  constructor() {
    super();
    this._roundMessages = [];
    this._turnMessages = [];
    this._quarterDayMessages = [];
    this._dayMessages = [];
    this._weekMessages = [];
  }
  static properties = {
    _activeSection: { state: true },
    _round: { state: true },
    _turn: { state: true },
    _quarterDay: { state: true },
    _day: { state: true },
    _week: { state: true },
    _roundMessages: { state: true },
    _turnMessages: { state: true },
    _quarterDayMessages: { state: true },
    _dayMessages: { state: true },
    _weekMessages: { state: true },
  };
  connectedCallback() {
    super.connectedCallback();
    tracker.addEventListener("round-messages-change", () => {
      this._roundMessages = tracker.roundMessages;
      this._activeSection = "round";
    });
    tracker.addEventListener("turn-messages-change", () => {
      this._turnMessages = tracker.turnMessages;
      this._activeSection = "turn";
    });
    tracker.addEventListener("quarter-day-messages-change", () => {
      this._quarterDayMessages = tracker.quarterDayMessages;
      this._activeSection = "quarterDay";
    });
    tracker.addEventListener("day-messages-change", () => {
      this._dayMessages = tracker.dayMessages;
      this._activeSection = "day";
    });
    tracker.addEventListener("week-messages-change", () => {
      this._weekMessages = tracker.weekMessages;
      this._activeSection = "week";
    });
    tracker.addEventListener("round-change", () => {
      this._round = tracker.round;
    });
    tracker.addEventListener("turn-change", () => {
      this._turn = tracker.turn;
    });
    tracker.addEventListener("quarter-day-change", () => {
      this._quarterDay = tracker.quarterDay;
    });
    tracker.addEventListener("day-change", () => {
      this._day = tracker.day;
    });
    tracker.addEventListener("week-change", () => {
      this._week = tracker.week;
    });
  }
  disconnectedCallback() {
    tracker.removeEventListener("round-messages-change");
    tracker.removeEventListener("turn-messages-change");
    tracker.removeEventListener("quarter-day-messages-change");
    tracker.removeEventListener("day-messages-change");
    tracker.removeEventListener("week-messages-change");
    tracker.removeEventListener("round-change");
    tracker.removeEventListener("turn-change");
    tracker.removeEventListener("quarter-day-change");
    tracker.removeEventListener("day-change");
    tracker.removeEventListener("week-change");
  }

  buttonClicked(event) {
    tracker.advance(event.detail.type);
  }

  render() {
    return html`
      <section class="container">
        <world-state-controls
          round="${this._round}"
          turn="${this._turn}"
          quarterDay="${this._quarterDay}"
          day="${this._day}"
          week="${this._week}"
          @click=${this.buttonClicked}
        ></world-state-controls>
        <world-state-notes
          activeSection="${this._activeSection}"
          roundMessages="${JSON.stringify(this._roundMessages)}"
          turnMessages="${JSON.stringify(this._turnMessages)}"
          quarterDayMessages="${JSON.stringify(this._quarterDayMessages)}"
          dayMessages="${JSON.stringify(this._dayMessages)}"
          weekMessages="${JSON.stringify(this._weekMessages)}"
        ></world-state-notes>
      </section>
    `;
  }
}

customElements.define("world-state-tracker", WorldStateTracker);
customElements.define("world-state-controls", WorldStateControls);
customElements.define("world-state-notes", WorldStateNotes);
customElements.define("message-section", MessageSection);

// window.addEventListener("load", () => {
// const roundMessagesContainer = document.querySelector("#new-round");
// const turnMessagesContainer = document.querySelector("#new-turn");
// const quarterDayMessagesContainer = document.querySelector("#new-quarter-day");
// const dayMessagesContainer = document.querySelector("#new-day");
// const weekMessagesContainer = document.querySelector("#new-week");

//   const roundMessagesDisplay = document.querySelector("#round-messages-display");
//   tracker.addEventListener("round-messages-change", () => {
//     roundMessagesDisplay.innerHTML = `<ul><li>${tracker.roundMessages.join("</li><li>")}</li></ul>`;
//     turnMessagesDisplay.innerHTML = "";
//     quarterDayMessagesDisplay.innerHTML = "";
//     dayMessagesDisplay.innerHTML = "";
//     weekMessagesDisplay.innerHTML = "";

//     roundMessagesContainer.classList.add("hidden");
//     requestAnimationFrame(() => {
//       roundMessagesContainer.classList.remove("hidden");
//     });
//     turnMessagesContainer.classList.add("hidden");
//     quarterDayMessagesContainer.classList.add("hidden");
//     dayMessagesContainer.classList.add("hidden");
//     weekMessagesContainer.classList.add("hidden");
//   });
//   const turnMessagesDisplay = document.querySelector("#turn-messages-display");
//   tracker.addEventListener("turn-messages-change", () => {
//     roundMessagesDisplay.innerHTML = "";
//     turnMessagesDisplay.innerHTML = `<ul><li>${tracker.turnMessages.join("</li><li>")}</li></ul>`;
//     quarterDayMessagesDisplay.innerHTML = "";
//     dayMessagesDisplay.innerHTML = "";
//     weekMessagesDisplay.innerHTML = "";

//     roundMessagesContainer.classList.add("hidden");
//     turnMessagesContainer.classList.add("hidden");
//     requestAnimationFrame(() => {
//       turnMessagesContainer.classList.remove("hidden");
//     });
//     quarterDayMessagesContainer.classList.add("hidden");
//     dayMessagesContainer.classList.add("hidden");
//     weekMessagesContainer.classList.add("hidden");
//   });
//   const quarterDayMessagesDisplay = document.querySelector("#quarter-day-messages-display");
//   tracker.addEventListener("quarter-day-messages-change", () => {
//     roundMessagesDisplay.innerHTML = "";
//     turnMessagesDisplay.innerHTML = "";
//     quarterDayMessagesDisplay.innerHTML = `<ul><li>${tracker.quarterDayMessages.join("</li><li>")}</li></ul>`;
//     dayMessagesDisplay.innerHTML = "";
//     weekMessagesDisplay.innerHTML = "";

//     roundMessagesContainer.classList.add("hidden");
//     turnMessagesContainer.classList.add("hidden");
//     quarterDayMessagesContainer.classList.add("hidden");
//     requestAnimationFrame(() => {
//       quarterDayMessagesContainer.classList.remove("hidden");
//     });
//     dayMessagesContainer.classList.add("hidden");
//     weekMessagesContainer.classList.add("hidden");
//   });
//   const dayMessagesDisplay = document.querySelector("#day-messages-display");
//   tracker.addEventListener("day-messages-change", () => {
//     roundMessagesDisplay.innerHTML = "";
//     turnMessagesDisplay.innerHTML = "";
//     quarterDayMessagesDisplay.innerHTML = "";
//     dayMessagesDisplay.innerHTML = `<ul><li>${tracker.dayMessages.join("</li><li>")}</li></ul>`;
//     weekMessagesDisplay.innerHTML = "";

//     roundMessagesContainer.classList.add("hidden");
//     turnMessagesContainer.classList.add("hidden");
//     quarterDayMessagesContainer.classList.add("hidden");
//     dayMessagesContainer.classList.add("hidden");
//     requestAnimationFrame(() => {
//       dayMessagesContainer.classList.remove("hidden");
//     });
//     weekMessagesContainer.classList.add("hidden");
//   });
//   const weekMessagesDisplay = document.querySelector("#week-messages-display");
//   tracker.addEventListener("week-messages-change", () => {
//     roundMessagesDisplay.innerHTML = "";
//     turnMessagesDisplay.innerHTML = "";
//     quarterDayMessagesDisplay.innerHTML = "";
//     dayMessagesDisplay.innerHTML = "";
//     weekMessagesDisplay.innerHTML = `<ul><li>${tracker.weekMessages.join("</li><li>")}</li></ul>`;

//     roundMessagesContainer.classList.add("hidden");
//     turnMessagesContainer.classList.add("hidden");
//     quarterDayMessagesContainer.classList.add("hidden");
//     dayMessagesContainer.classList.add("hidden");
//     weekMessagesContainer.classList.add("hidden");
//     requestAnimationFrame(() => {
//       weekMessagesContainer.classList.remove("hidden");
//     });
//   });

//   const roundBtn = document.querySelector("#round-btn");
//   const roundDisplay = document.querySelector("#round-display");
//   roundBtn.addEventListener("click", async () => {
//     await tracker.advance("round");
//   });

//   tracker.addEventListener("round-change", () => {
//     if (!tracker.round) roundDisplay.innerHTML = `<span>--</span>`;
//     else roundDisplay.innerHTML = `<span>${tracker.round}</span>`;
//   });

//   const turnBtn = document.querySelector("#turn-btn");
//   const turnDisplay = document.querySelector("#turn-display");
//   turnBtn.addEventListener("click", async () => {
//     await tracker.advance("turn");
//   });
//   tracker.addEventListener("turn-change", () => {
//     if (!tracker.turn) turnDisplay.innerHTML = `<span>--</span>`;
//     else turnDisplay.innerHTML = `<span>${tracker.turn}</span>`;
//   });

//   const quarterDayBtn = document.querySelector("#quarter-day-btn");
//   const quarterDayDisplay = document.querySelector("#quarter-day-display");
//   quarterDayBtn.addEventListener("click", async () => {
//     await tracker.advance("quarterDay");
//   });
//   tracker.addEventListener("quarter-day-change", () => {
//     if (!tracker.quarterDay) quarterDayDisplay.innerHTML = `<span>--</span>`;
//     else quarterDayDisplay.innerHTML = `<span>${tracker.quarterDay}</span>`;
//   });

//   const dayBtn = document.querySelector("#day-btn");
//   const dayDisplay = document.querySelector("#day-display");
//   dayBtn.addEventListener("click", async () => {
//     await tracker.advance("day");
//   });
//   tracker.addEventListener("day-change", () => {
//     if (!tracker.day) dayDisplay.innerHTML = `<span>--</span>`;
//     else dayDisplay.innerHTML = `<span>${tracker.day}</span>`;
//   });

//   const weekBtn = document.querySelector("#week-btn");
//   const weekDisplay = document.querySelector("#week-display");
//   weekBtn.addEventListener("click", async () => {
//     await tracker.advance("week");
//   });
//   tracker.addEventListener("week-change", () => {
//     if (!tracker.week) weekDisplay.innerHTML = `<span>--</span>`;
//     else weekDisplay.innerHTML = `<span>${tracker.week}</span>`;
//   });
// });
