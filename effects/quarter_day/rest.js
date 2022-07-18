/**
 * @param { import("../../types").State } state
 */
export default async (state) => {
  if (state.rest) {
    let message = "REST: PCs recover all attribute points";
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

    return [message];
  }
};
