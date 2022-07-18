/**
 * @param { import("../../types").State } state
 */
export default async (state) => {
  if (state.inWater && !state.wearingArmor) return ["PCs in water and not wearing armor must roll ENDURANCE."];
};
