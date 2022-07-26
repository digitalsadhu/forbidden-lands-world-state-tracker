import { html } from "../../dependencies/lit-all.min.js";

/**
 * @param { import("../../types").State } state
 */
export default async (state) => {
  if (state.forcedMarch === 2) {
    return [
      html`Making a <span class="c-action">forced march</span> of 2 extra quarter days requires an
        <span class="c-skill">endurance</span> roll at <span class="c-modifier">-2</span>.`,
    ];
  }
};
