export default async (weather, terrain, light, party) => {
  if (party.wearingArmor && party.inWater) return ["PCs in water and wearing armor must roll ENDURANCE."];
};
