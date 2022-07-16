export default async (weather, terrain, light, party) => {
  if (party.noWarmClothes) {
    return ["PCs without adequate warm clothing or a campfire must roll ENDURANCE when sleeping in cold conditions."];
  }
};
