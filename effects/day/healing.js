import { html } from "../../dependencies/lit-all.min.js";

/**
 * @param { import("../../data-structures/selected-options").SelectedOptions } selectedOptions
 * @param { import("../../weather").Weather } weather
 * @param { boolean } dark
 * */
export default (selectedOptions, weather, dark) => {
  if (selectedOptions.injured.value) {
    return [
      html`At the end of each day, injured PCs the reduce number of recovery days remaining or move one step closer to
      death for fatal injuries.`,
    ];
  }
};
