import { html } from "../../dependencies/lit-all.min.js";

/**
 * @param { import("../../data-structures/selected-options").SelectedOptions } selectedOptions
 * @param { import("../../weather").Weather } weather
 * @param { boolean } dark
 * */
export default (selectedOptions, weather, dark) => {
  if (selectedOptions.overEncumbered.value && selectedOptions.hike.value)
    return [
      html`Overencumbered PCs that try to <span class="c-action">hike</span> for a quarter day must roll
        <span class="c-skill">ENDURANCE</span>`,
    ];
};
