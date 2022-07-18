/**
 * @param { import("../../types").State } state
 */
export default async (state) => {
  if (state.environmentCold && state.noWarmClothes) return ["PCs without adequate warm clothing must roll ENDURANCE."];
};
