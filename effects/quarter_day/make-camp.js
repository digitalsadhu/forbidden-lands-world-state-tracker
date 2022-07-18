/**
 * @param { import("../../types").State } state
 */
export default async (state) => {
  if (state.makeCamp) {
    return ["MAKE CAMP: Roll SURVIVAL."];
  }
};
