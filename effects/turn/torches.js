/**
 * @param { import("../../types").State } state
 */
export default async (state) => {
  if (state.environmentDark && !state.noLightSource) {
    return ["A new torch needs to be lit, roll for TORCHES"];
  }
};
