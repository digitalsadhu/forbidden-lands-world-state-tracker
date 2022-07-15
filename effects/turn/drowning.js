export default async (weather, terrain, light, party) => {
  if (party.isInWater && !party.isWearingArmor) return "PCs in water and not wearing armor must roll ENDURANCE.";
};
