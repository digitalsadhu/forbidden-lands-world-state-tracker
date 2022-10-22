import { html } from "../../dependencies/lit-all.min.js";

/**
 * @param { import("../../data-structures/selected-options").SelectedOptions } selectedOptions
 * @param { import("../../weather").Weather } weather
 * @param { boolean } dark
 * */
export default (selectedOptions, weather, dark) => {
  if (selectedOptions.leadTheWay.value) {
    const modifiers = [];
    const explanations = [];
    if (weather.rain === "Light Rain") {
      modifiers.push(-1);
      explanations.push("light rain");
    }
    if (weather.rain === "Light Snow") {
      modifiers.push(-1);
      explanations.push("light snow");
    }
    if (weather.rain === "Heavy Rain") {
      modifiers.push(-2);
      explanations.push("heavy rain");
    }
    if (weather.rain === "Heavy Snow") {
      modifiers.push(-2);
      explanations.push("heavy snow");
    }
    if (selectedOptions.environmentDark.value) {
      modifiers.push(-2);
      explanations.push("darkness");
    }

    const mod = modifiers.reduce((accumulator, curr) => accumulator + curr, 0);
    const extra = mod > 0 || mod < 0 ? html`${mod} (${explanations.join(", ")}) ` : "";

    return [
      html`<span class="c-action">lead the way</span> roll <span class="c-skill">survival</span> ${extra}for each hex
        travelled.`,
    ];
  }
};
