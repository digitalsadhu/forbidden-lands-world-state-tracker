export default async (state) => {
  if (state.environmentDark && state.noLightSource)
    return [
      "PCs without a light source must make a MOVE roll when they RUN in the dark (1 point of damage if you fail).",
    ];
};
