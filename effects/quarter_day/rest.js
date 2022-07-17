export default async (weather, terrain, light, party) => {
  if (party.rest) {
    let message = "REST: PCs recover all attribute points";
    const exceptions = [];
    if (party.hungry) {
      exceptions.push("HUNGRY");
    }

    if (party.thirsty) {
      exceptions.push("THIRSTY");
    }

    if (party.diseased) {
      exceptions.push("SICK (Diseased PCs recover WITS and EMPATHY only)");
    }

    if (party.cold) {
      exceptions.push("COLD (Cold PCs recover AGILITY and EMPATHY only)");
    }

    if (exceptions.length) {
      message = `${message} unless ${exceptions.join(" or ")}`;
    }

    message += ".";

    return [message];
  }
};
