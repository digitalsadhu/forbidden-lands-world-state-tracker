/**
 * @param { import("../../types").State } state
 */
export default (state) => {
  if (state.environmentCold.value && !state.warmClothes.value)
    return ["PCs without adequate warm clothing must roll ENDURANCE."];
};
