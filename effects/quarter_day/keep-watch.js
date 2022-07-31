import { html } from "../../dependencies/lit-all.min.js";

/**
 * @param { import("../../types").State } state
 */
export default (state) => {
  if (state.keepWatch.value && state.hike.value) {
    return [
      html`<span class="c-action">Keep watch</span> roll <span class="c-skill">scouting</span> for each hex travelled.`,
    ];
  }
  if (state.keepWatch.value) {
    return [html`<span class="c-action">Keep watch</span> roll <span class="c-skill">scouting</span>.`];
  }
};
