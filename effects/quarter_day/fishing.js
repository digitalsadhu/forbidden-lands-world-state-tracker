/**
 * @param { import("../../types").State } state
 */
export default async (state) => {
  if (state.fish) {
    return ["FISHING: Roll SURVIVAL."];
  }
};
