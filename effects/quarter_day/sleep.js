import { html } from "../../dependencies/lit-all.min.js";

/**
 * @param { import("../../data-structures/selected-options").SelectedOptions } selectedOptions
 * @param { import("../../weather").Weather } weather
 * @param { boolean } dark
 * */
export default (selectedOptions, weather, dark) => {
  const result = [];

  if (selectedOptions.sleep.value) {
    // if (selectedOptions.bareGroundSleeping.value) {
    //   result.push("SLEEP: Make a SURVIVAL roll when sleeping without having first made camp (MAKE CAMP).");
    // }

    let message = "SLEEP: PCs recover all attribute points";
    const exceptions = [];
    if (selectedOptions.hungry.value) {
      exceptions.push("HUNGRY");
    }

    if (selectedOptions.thirsty.value) {
      exceptions.push("THIRSTY");
    }

    if (selectedOptions.diseased.value) {
      exceptions.push("SICK (Diseased PCs recover WITS and EMPATHY only)");
    }

    if (selectedOptions.cold.value) {
      exceptions.push("COLD (Cold PCs recover AGILITY and EMPATHY only)");
    }

    if (exceptions.length) {
      message = `${message} unless ${exceptions.join(" or ")}`;
    }

    message += ".";

    result.push(message);

    if (selectedOptions.sleepy.value) {
      result.push("PCs recover from the SLEEPY condition.");
    }
  }

  return result;
};
