export default async (weather, terrain, light, party) => {
  if (party.environmentDark && !party.noLightSource) {
    return ["A new torch needs to be lit, roll for TORCHES"];
  }
};
