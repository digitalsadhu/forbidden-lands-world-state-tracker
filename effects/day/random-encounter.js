import { html } from "../../dependencies/lit-all.min.js";

/**
 * @param { import("../../types").State } state
 */
export default (state) => {
  if (!state.hike.value) {
    return [html`Roll once per day for a random encounter when staying in the same place.`];
  }
};
