import { html } from "../../dependencies/lit-all.min.js";

/**
 * @param { import("../../data-structures/selected-options").SelectedOptions } selectedOptions
 * @param { import("../../weather").Weather } weather
 * @param { boolean } dark
 * */
export default (selectedOptions, weather, dark) => {
  if (selectedOptions.keepWatch.value && selectedOptions.hike.value) {
    return [
      html`<span class="c-action">Keep watch</span> roll <span class="c-skill">scouting</span> for each hex travelled.`,
    ];
  }
  if (selectedOptions.keepWatch.value) {
    return [html`<span class="c-action">Keep watch</span> roll <span class="c-skill">scouting</span>.`];
  }
  return [];
};
