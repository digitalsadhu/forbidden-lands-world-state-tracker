/**
 * @param { import("../../types").State } state
 */
export default (state) => {
  if (state.ownStronghold.value) {
    return ["Roll for a stronghold event each week (p12 Gamemasters guide)."];
  }
};
