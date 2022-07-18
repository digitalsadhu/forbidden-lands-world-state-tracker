/**
 * @param { import("../../types").State } state
 */
export default async (state) => {
  if (state.forage) {
    return ["FORAGE: Roll SURVIVAL modified by season and terrain."];
  }
};
