/**
 * @param { import("../../types").State } state
 */
export default (state) => {
  if (state.environmentDark.value && !state.lightSource.value)
    return [
      "PCs without a light source must make a MOVE roll when they RUN in the dark (1 point of damage if they fail).",
    ];
};
