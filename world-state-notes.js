import { LitElement, html, css, classMap } from "https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js";

export class WorldStateNotes extends LitElement {
  constructor() {
    super();
    this.title = "";
    this.messages = [];
  }

  static properties = {
    title: { type: String },
    messages: { type: Array },
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
        <div>
          <h2>${this.title}</h2>
          <div>
            <ul>
              ${this.messages.map((message) => html`<li>${message}</li>`)}
            </ul>
          </div>
        </div>
      </section>
    `;
  }
}
