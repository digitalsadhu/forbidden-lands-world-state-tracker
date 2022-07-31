import { html } from "../../dependencies/lit-all.min.js";

/**
 * @param { import("../../types").State } state
 */
export default (state) => {
  if (state.overEncumbered.value && state.hike.value)
    return [
      html`Overencumbered PCs that try to <span class="c-action">hike</span> for a quarter day must roll
        <span class="c-skill">ENDURANCE</span>`,
    ];
};
