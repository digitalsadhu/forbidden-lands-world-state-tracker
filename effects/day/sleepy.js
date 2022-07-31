import { html } from "../../dependencies/lit-all.min.js";

/**
 * @param { import("../../types").State } state
 */
export default (state) => {
  return [html`PCs must sleep at least one quarter day to avoid being <span class="c-condition">sleepy</span>`];
};
