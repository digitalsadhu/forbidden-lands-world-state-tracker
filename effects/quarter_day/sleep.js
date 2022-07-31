import { html } from "../../dependencies/lit-all.min.js";

/**
 * @param { import("../../types").State } state
 */
export default (state) => {
  const result = [];

  if (state.sleep.value) {
    if (state.bareGroundSleeping.value) {
      result.push("SLEEP: Make a SURVIVAL roll when sleeping without having first made camp (MAKE CAMP).");
    }

    let message = "SLEEP: PCs recover all attribute points";
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

    result.push(message);

    if (state.sleepy.value) {
      result.push("PCs recover from the SLEEPY condition.");
    }
  }

  return result;
};
