/**
 * @param { import("../../types").State } state
 */
export default (state) => {
  if (state.ownStronghold.value) {
    return [
      "Roll CRAFTING for stronghold upkeep. This roll automatically fails if noone has spent one quarter day each day on maintenance during the week.",
    ];
  }
};
