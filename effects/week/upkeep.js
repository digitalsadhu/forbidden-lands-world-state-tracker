export default async (state) => {
  if (state.ownStronghold) {
    return [
      "Roll CRAFTING for stronghold upkeep. This roll automatically fails if noone has spent one quarter day each day on maintenance during the week.",
    ];
  }
};
