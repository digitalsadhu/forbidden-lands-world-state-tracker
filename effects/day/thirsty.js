import { html } from "../../dependencies/lit-all.min.js";

/**
 * @param { import("../../types").State } state
 */
export default (state) => {
  return [
    html`PCs must drink at least 1 unit of water per day to avoid being <span class="c-condition">thirsty</span>.`,
  ];
};
