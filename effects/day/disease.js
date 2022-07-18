/**
 * @param { import("../../types").State } state
 */
export default async (state) => {
  if (state.diseased) return ["Roll ENDURANCE or continue to be SICK/DISEASED"];
};
