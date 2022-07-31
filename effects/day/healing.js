import { html } from "../../dependencies/lit-all.min.js";

/**
 * @param { import("../../types").State } state
 */
export default (state) => {
  if (state.injured.value) {
    return [
      html`At the end of each day, injured PCs the reduce number of recovery days remaining or move one step closer to
      death for fatal injuries.`,
    ];
  }
};
