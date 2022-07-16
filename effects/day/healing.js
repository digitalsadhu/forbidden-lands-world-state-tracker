export default async (weather, terrain, light, party) => {
  if (party.injured) {
    return [
      "Injured PCs reduce number or recovery days remaining or move one step closer to death for fatal injuries.",
    ];
  }
};
