import { html } from "../../dependencies/lit-all.min.js";

/**
 * @param { import("../../types").State } state
 */
export default (state) => {
  if (state.makeCamp.value) {
    const modifiers = [];
    const explanations = [];
    if (state.weather.wind === "Strong Wind") {
      modifiers.push(-1);
      explanations.push("strong wind");
    }
    if (state.weather.wind === "Storm") {
      modifiers.push(-2);
      explanations.push("storm");
    }

    const extra = html` ${modifiers.reduce((accumulator, curr) => accumulator + curr, 0)} (${explanations.join(", ")})`;

    return [html`<span class="c-action">Make camp</span> roll <span class="c-skill">survival</span>${extra}.`];
  }
};
