export default async (weather, terrain, light, party) => {
  if (party.hike) {
    return ["HIKE, move 1 hex in open terrain, 2 hexes in difficult terrain."];
  }
};
