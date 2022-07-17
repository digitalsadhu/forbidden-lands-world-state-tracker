export default async (weather, terrain, light, party) => {
  if (party.environmentCold && party.noWarmClothes)
    return ["PCs without adequate warm clothing or a campfire must roll ENDURANCE."];
};
