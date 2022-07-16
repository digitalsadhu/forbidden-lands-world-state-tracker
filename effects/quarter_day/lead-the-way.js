export default async (weather, terrain, light, party) => {
  if (party.leadTheWay) {
    return ["LEAD THE WAY: roll SURVIVAL for each hex modified by light and weather."];
  }
};
