/**
 * @param { import("../../types").State } state
 */
export default async (state) => {
  if (state.hike) {
    return ["HIKE, move 1 hex in open terrain, 2 hexes in difficult terrain."];
  }
};
