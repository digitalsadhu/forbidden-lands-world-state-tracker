import { html } from "../../dependencies/lit-all.min.js";

/**
 * @param { import("../../data-structures/selected-options").SelectedOptions } selectedOptions
 * @param { import("../../weather").Weather } weather
 * @param { boolean } dark
 * */
export default (selectedOptions, weather, dark) => {
  if (!selectedOptions.hike.value) {
    return [html`Roll once per day for a random encounter when staying in the same place.`];
  }
};
