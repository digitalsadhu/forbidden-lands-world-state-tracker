/**
 * @param { import("../../types").State } state
 */
export default async (state) => {
  if (state.inWater) return ["PCs in water (and not wearing armor) must roll ENDURANCE."];
};
