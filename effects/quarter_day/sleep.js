export default async (weather, terrain, light, party) => {
  const result = [];
  if (party.bareGroundSleeping && party.sleep) {
    result.push("Make a SURVIVAL roll when sleeping without having first made camp (MAKE CAMP).");
  }

  if (party.hungry || party.thirsty) {
    result.push("SLEEP: PCs recover all attribute points. (Unless HUNGRY or THIRSTY).");
  } else {
    result.push("SLEEP: PCs recover all attribute points.");
  }

  return result;
};
