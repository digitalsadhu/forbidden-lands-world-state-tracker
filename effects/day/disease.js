import { html } from "../../dependencies/lit-all.min.js";

/**
 * @param { import("../../data-structures/selected-options").SelectedOptions } selectedOptions
 * @param { import("../../weather").Weather } weather
 * @param { boolean } dark
 * */
export default (selectedOptions, weather, dark) => {
  if (selectedOptions.diseased.value)
    return [
      html`Roll <span class="c-skill">endurance</span> or continue to be <span class="c-condition">diseased</span>`,
    ];
};
