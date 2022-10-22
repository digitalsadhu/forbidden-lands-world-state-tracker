import { html } from "../../dependencies/lit-all.min.js";

/**
 * @param { import("../../data-structures/selected-options").SelectedOptions } selectedOptions
 * @param { import("../../weather").Weather } weather
 * @param { boolean } dark
 * */
export default (selectedOptions, weather, dark) => {
  return [
    html`PCs must drink at least 1 unit of water per day to avoid being <span class="c-condition">thirsty</span>.`,
  ];
};
