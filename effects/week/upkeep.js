export default async (weather, terrain, light, party) => {
  if (party.ownStronghold) {
    return [
      "Roll CRAFTING for stronghold upkeep. This roll automatically fails if noone has spent one quarter day each day on maintenance during the week.",
    ];
  }
};
