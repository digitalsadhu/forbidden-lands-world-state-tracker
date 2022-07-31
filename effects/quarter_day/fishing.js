import { html } from "../../dependencies/lit-all.min.js";

/**
 * @param { import("../../types").State } state
 */
export default (state) => {
  if (state.fish.value) {
    return [html`<span class="c-action">Fishing</span> roll <span class="c-skill">survival</span>.`];
  }
};
