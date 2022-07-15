export default async (weather, terrain, light, party) => {
  if (!party.haveWarmClothing && weather.isBiting) return "PCs without adequate warm clothing must roll ENDURANCE.";
};
