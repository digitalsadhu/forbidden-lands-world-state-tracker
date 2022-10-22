import { html } from "../../dependencies/lit-all.min.js";

/**
 * @param { import("../../data-structures/selected-options").SelectedOptions } selectedOptions
 * @param { import("../../weather").Weather } weather
 * @param { boolean } dark
 * */
export default (selectedOptions, weather, dark) => {
  const messages = [];
  if (weather.cold !== "Mild") {
    const gear = [];
    if (!selectedOptions.warmClothes.value) {
      gear.push("adequate warm clothing");
    }

    if (selectedOptions.sleep.value) {
      gear.push("a camp fire");
    }

    const message = html`PCs without ${gear.join(" or ")} must roll <strong class="c-skill">endurance</strong> in
      <strong class="c-condition">${weather.cold === "Biting" ? "biting " : ""}cold</strong> conditions
      ${weather.cold === "Biting" ? "every 15 minutes " : "every quarter day "}or become
      <strong class="c-condition">cold</strong>.`;

    if (gear.length > 0) messages.push(message);

    if (selectedOptions.cold.value && !selectedOptions.warmClothes.value) {
      messages.push(
        html`PCs with the <strong class="c-condition">cold</strong> condition continue to roll
          <strong class="c-skill">endurance</strong> ${weather.cold === "Biting"
            ? "every 15 minutes "
            : "every quarter day "}until
          no longer cold. Failure results in <i class="c-modifier">-1</i>
          <strong class="c-attribute">strength</strong> and <i class="c-modifier">-1</i>
          <strong class="c-attribute">wits</strong>. PCs broken in <strong class="c-attribute">strength</strong> in this
          way die on the next failed roll.`
      );
    }
  }
  if (selectedOptions.cold.value && selectedOptions.sleep.value) {
    messages.push(
      html`PCs with the <strong class="c-condition">cold</strong> condition that sleep around a campfire are no longer
        <strong class="c-condition">cold</strong>`
    );
  }

  if (messages.length) {
    return [
      html`<h4 class="c-condition">COLD</h4>
        <ul>
          ${messages.map((message) => html`<li>${message}</li>`)}
        </ul>`,
    ];
  }
  return [];
};
