import { html } from "../../dependencies/lit-all.min.js";

/**
 * @param { import("../../types").State } state
 */
export default (state) => {
  if (state.diseased.value)
    return [
      html`Roll <span class="c-skill">endurance</span> or continue to be <span class="c-condition">diseased</span>`,
    ];
};
