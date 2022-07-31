import { html } from "../../dependencies/lit-all.min.js";

/**
 * @param { import("../../types").State } state
 */
export default (state) => {
  if (state.environmentCold.value && !state.warmClothes.value)
    return [html`PCs without adequate warm clothing or a campfire must roll <span class="c-skill">endurance</span>.`];
};
