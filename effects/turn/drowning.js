/**
 * @param { import("../../types").State } state
 */
export default (state) => {
  if (state.inWater.value) return ["PCs in water (and not wearing armor) must roll ENDURANCE."];
};
