export default async (weather, terrain, light, party) => {
  if (party.inWater && !party.wearingArmor) return ["PCs in water and not wearing armor must roll ENDURANCE."];
};
