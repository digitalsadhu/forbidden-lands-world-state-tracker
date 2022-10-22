import { html } from "../../dependencies/lit-all.min.js";

/**
 * @param { import("../../data-structures/selected-options").SelectedOptions } selectedOptions
 * @param { import("../../weather").Weather } weather
 * @param { boolean } dark
 * */
export default (selectedOptions, weather, dark) => {
  if (selectedOptions.environmentCold.value && !selectedOptions.warmClothes.value)
    return [html`PCs without adequate warm clothing or a campfire must roll <span class="c-skill">endurance</span>.`];
};
