/**
 * @param { import("../../types").State } state
 */
export default async (state) => {
  if (state.injured) {
    return [
      "Injured PCs reduce number or recovery days remaining or move one step closer to death for fatal injuries.",
    ];
  }
};
