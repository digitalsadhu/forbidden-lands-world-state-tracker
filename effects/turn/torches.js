/**
 * @param { import("../../types").State } state
 */
export default (state) => {
  if (state.environmentDark.value && state.lightSource.value) {
    return ["A new torch needs to be lit, roll for TORCHES"];
  }
};
