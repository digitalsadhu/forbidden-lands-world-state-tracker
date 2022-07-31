import { html } from "../../dependencies/lit-all.min.js";

/**
 * @param { import("../../types").State } state
 */
export default (state) => {
  if (state.leadTheWay.value) {
    const modifiers = [];
    const explanations = [];
    if (state.weather.rain === "Light Rain") {
      modifiers.push(-1);
      explanations.push("light rain");
    }
    if (state.weather.rain === "Light Snow") {
      modifiers.push(-1);
      explanations.push("light snow");
    }
    if (state.weather.rain === "Heavy Rain") {
      modifiers.push(-2);
      explanations.push("heavy rain");
    }
    if (state.weather.rain === "Heavy Snow") {
      modifiers.push(-2);
      explanations.push("heavy snow");
    }
    if (state.environmentDark.value) {
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
