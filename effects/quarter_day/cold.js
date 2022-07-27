import { html } from "../../dependencies/lit-all.min.js";

/**
 * @param { import("../../types").State } state
 */
export default async (state) => {
  const messages = [];
  if (state.weather.cold !== "Mild") {
    const gear = [];
    if (!state.warmClothes) {
      gear.push("adequate warm clothing");
    }

    if (state.sleep) {
      gear.push("a camp fire");
    }

    const message = html`PCs without ${gear.join(" or ")} must roll <strong class="c-skill">endurance</strong> in
      <strong class="c-condition">${state.weather.cold === "Biting" ? "biting " : ""}cold</strong> conditions
      ${state.weather.cold === "Biting" ? "every 15 minutes " : "every quarter day "}or become
      <strong class="c-condition">cold</strong>.`;

    if (gear.length > 0) messages.push(message);

    if (state.cold && !state.warmClothes) {
      messages.push(
        html`PCs with the <strong class="c-condition">cold</strong> condition continue to roll
          <strong class="c-skill">endurance</strong> ${state.weather.cold === "Biting"
            ? "every 15 minutes "
            : "every quarter day "}until
          no longer cold. Failure results in <i class="c-modifier">-1</i>
          <strong class="c-attribute">strength</strong> and <i class="c-modifier">-1</i>
          <strong class="c-attribute">wits</strong>. PCs broken in <strong class="c-attribute">strength</strong> in this
          way die on the next failed roll.`
      );
    }
  }
  if (state.cold && state.sleep) {
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
