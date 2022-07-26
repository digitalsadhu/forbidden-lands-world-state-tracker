import { html } from "../../dependencies/lit-all.min.js";

/**
 * @param { import("../../types").State } state
 */
export default async (state) => {
  if (state.forcedMarch === 1) {
    return [
      html`Making a <span class="c-action">forced march</span> of 1 extra quarter day requires an
        <span class="c-skill">endurance</span> roll.`,
    ];
  }
};
