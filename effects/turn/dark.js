export default async (weather, terrain, light, party) => {
  if (party.environmentDark && party.noLightSource)
    return ["PCs without a light source must make a MOVE roll when they RUN in the dark."];
};
