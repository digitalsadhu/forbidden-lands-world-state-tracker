import { html } from "../../dependencies/lit-all.min.js";

/**
 * @param { import("../../types").State } state
 */
export default (state) => {
  return [html`PCs must eat at least 1 ration per day to avoid being <span class="c-condition">hungry</span>`];
};
