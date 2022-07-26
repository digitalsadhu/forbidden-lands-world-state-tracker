import { html } from "../../dependencies/lit-all.min.js";

/**
 * @param { import("../../types").State } state
 */
export default async (state) => {
  if (state.keepWatch && state.hike) {
    return [
      html`<span class="c-action">Keep watch</span> roll <span class="c-skill">scouting</span> for each hex travelled.`,
    ];
  }
  if (state.keepWatch) {
    return [html`<span class="c-action">Keep watch</span> roll <span class="c-skill">scouting</span>.`];
  }
};
