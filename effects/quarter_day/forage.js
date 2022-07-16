export default async (weather, terrain, light, party) => {
  if (party.forage) {
    return ["FORAGE: Roll SURVIVAL modified by season and terrain."];
  }
};
