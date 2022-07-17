export default async (weather, terrain, light, party) => {
  const result = [];

  if (party.sleep) {
    if (party.bareGroundSleeping) {
      result.push("SLEEP: Make a SURVIVAL roll when sleeping without having first made camp (MAKE CAMP).");
    }

    let message = "SLEEP: PCs recover all attribute points";
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

    result.push(message);

    if (party.sleepy) {
      result.push("PCs recover from the SLEEPY condition.");
    }
  }

  return result;
};
