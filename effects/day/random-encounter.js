/**
 * @param { import("../../types").State } state
 */
export default async (state) => {
  if (!state.hike) {
    return ["Roll once per day for a random encounter when staying in the same place."];
  }
};
