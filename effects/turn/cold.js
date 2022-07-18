/**
 * @param { import("../../types").State } state
 */
export default async (state) => {
  if (state.environmentCold && !state.warmClothes) return ["PCs without adequate warm clothing must roll ENDURANCE."];
};
