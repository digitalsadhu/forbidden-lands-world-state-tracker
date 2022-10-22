import { html } from "../../dependencies/lit-all.min.js";

/**
 * @param { import("../../data-structures/selected-options").SelectedOptions } selectedOptions
 * @param { import("../../weather").Weather } weather
 * @param { boolean } dark
 * */
export default (selectedOptions, weather, dark) => {
  if (selectedOptions.fish.value) {
    return [html`<span class="c-action">Fishing</span> roll <span class="c-skill">survival</span>.`];
  }
  return [];
};
