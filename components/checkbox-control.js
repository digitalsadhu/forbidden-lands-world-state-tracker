import { LitElement, html, css } from "/dependencies/lit-all.min.js";

export class CheckboxControl extends LitElement {
  static properties = {
    name: { type: String },
    value: { type: String },
    checked: { type: Boolean },
  };

  static styles = css`
    :host {
      display: block;
      position: relative;
    }

    slot {
      display: inline-block;
      margin-left: 10px;
    }

    body {
      margin: 0;
    }

    input[type="checkbox"] {
      visibility: hidden;
    }

    .pseudo-checkbox {
      position: absolute;
      top: 0;
      left: 0;
      height: 20px;
      width: 20px;
      background-color: #d9d9d9;
      border-radius: 4px;
    }

    .pseudo-checkbox:after {
      content: "";
      position: absolute;
      display: none;
    }

    :host input:checked ~ .pseudo-checkbox:after {
      display: block;
    }

    :host .pseudo-checkbox:after {
      left: 7px;
      bottom: 5px;
      width: 4px;
      height: 10px;
      border-style: solid;
      border-color: #767676;
      border-image: initial;
      border-width: 0px 2px 2px 0px;
      transform: rotate(45deg);
    }
  `;

  change(e) {
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: {
          name: this.name,
          value: this.value,
          checked: e.currentTarget.checked,
        },
      })
    );
  }

  render() {
    return html`
      <label id="label">
        <input @change="${this.change}" id="input" type="checkbox" name="checkbox" .checked="${this.checked}" />
        <span class="pseudo-checkbox"></span>
        <slot></slot
      ></label>
    `;
  }
}
