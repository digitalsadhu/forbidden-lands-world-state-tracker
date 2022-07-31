/**
 * @param { import("../../types").State } state
 */
export default (state) => {
  if (state.overEncumbered.value) return ["Overencumbered PCs that try to RUN must roll ENDURANCE"];
};
