import { html } from "../../dependencies/lit-all.min.js";

/**
 * @param { import("../../types").State } state
 */
export default (state) => {
  if (state.rest.value) {
    let message = "REST: PCs recover all attribute points";
    const exceptions = [];
    if (state.hungry.value) {
      exceptions.push("HUNGRY");
    }

    if (state.thirsty.value) {
      exceptions.push("THIRSTY");
    }

    if (state.diseased.value) {
      exceptions.push("SICK (Diseased PCs recover WITS and EMPATHY only)");
    }

    if (state.cold.value) {
      exceptions.push("COLD (Cold PCs recover AGILITY and EMPATHY only)");
    }

    if (exceptions.length) {
      message = `${message} unless ${exceptions.join(" or ")}`;
    }

    message += ".";

    return [message];
  }
};
