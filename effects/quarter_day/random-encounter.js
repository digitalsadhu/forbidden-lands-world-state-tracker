import { html } from "../../dependencies/lit-all.min.js";
/**
 * @param { import("../../types").State } state
 */
export default async (state) => {
  if (state.hike) {
    return [html`Roll once per quarter day for a random encounter when on a <span class="c-action">HIKE</span>.`];
  }
};
