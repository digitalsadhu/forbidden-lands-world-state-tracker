export default async (weather, terrain, light, party) => {
  if (party.noWarmClothes) {
    return ["PCs without adequate warm clothing must roll ENDURANCE in cold conditions."];
  }
};
