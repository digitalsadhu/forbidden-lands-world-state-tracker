export default async (weather, terrain, light, party) => {
  if (party.isWearingArmor && party.isInWater) return "PCs in water and wearing armor must roll ENDURANCE.";
};
