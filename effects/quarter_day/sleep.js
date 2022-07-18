/**
 * @param { import("../../types").State } state
 */
export default async (state) => {
  const result = [];

  if (state.sleep) {
    if (state.bareGroundSleeping) {
      result.push("SLEEP: Make a SURVIVAL roll when sleeping without having first made camp (MAKE CAMP).");
    }

    let message = "SLEEP: PCs recover all attribute points";
    const exceptions = [];
    if (state.hungry) {
      exceptions.push("HUNGRY");
    }

    if (state.thirsty) {
      exceptions.push("THIRSTY");
    }

    if (state.diseased) {
      exceptions.push("SICK (Diseased PCs recover WITS and EMPATHY only)");
    }

    if (state.cold) {
      exceptions.push("COLD (Cold PCs recover AGILITY and EMPATHY only)");
    }

    if (exceptions.length) {
      message = `${message} unless ${exceptions.join(" or ")}`;
    }

    message += ".";

    result.push(message);

    if (state.sleepy) {
      result.push("PCs recover from the SLEEPY condition.");
    }
  }

  return result;
};
