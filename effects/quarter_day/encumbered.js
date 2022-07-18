/**
 * @param { import("../../types").State } state
 */
export default async (state) => {
  if (state.overEncumbered && state.hike)
    return ["Overencumbered PCs that try to HIKE for a quarter day must roll ENDURANCE"];
};
