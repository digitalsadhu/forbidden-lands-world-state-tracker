export default async (weather, terrain, light, party) => {
  if (party.environmentDark && party.noLightSource) {
    const result = ["PCs without a light source must make a SCOUT roll when trying to hit an enemy."];

    if (party.usingArrows) {
      result.push(
        ...[
          "PCs cannot SHOOT at targets at SHORT range or more in the dark.",
          "PCs can shoot opponents at ARM'S LENGTH or NEAR range, but only if they make a SCOUT roll.",
          "All ranged attacks in darkness are modified by -2.",
        ]
      );
    }

    return result;
  }
};
