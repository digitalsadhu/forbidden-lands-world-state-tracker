import { html } from "../../dependencies/lit-all.min.js";

/**
 * @param { import("../../data-structures/selected-options").SelectedOptions } selectedOptions
 * @param { import("../../weather").Weather } weather
 * @param { boolean } dark
 * */
export default (selectedOptions, weather, dark) => {
  if (selectedOptions.makeCamp.value) {
    const modifiers = [];
    const explanations = [];
    if (weather.wind === "Strong Wind") {
      modifiers.push(-1);
      explanations.push("strong wind");
    }
    if (weather.wind === "Storm") {
      modifiers.push(-2);
      explanations.push("storm");
    }
    const extra = html` ${modifiers.reduce((accumulator, curr) => accumulator + curr, 0)} (${explanations.join(", ")})`;

    return [html`<span class="c-action">Make camp</span> roll <span class="c-skill">survival</span>${extra}.`];
  }
};
