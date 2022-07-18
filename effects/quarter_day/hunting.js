/**
 * @param { import("../../types").State } state
 */
export default async (state) => {
  if (state.hunt) {
    const result = [];
    let message = "HUNT: Roll SURVIVAL";
    if (state.terrainPlains) {
      result.push(`${message} modified by +1 for plains`);
    }
    if (state.terrainForest) {
      result.push(`${message} modified by +1 for forest`);
    }
    if (state.terrainDarkForest) {
    }
    if (state.terrainHills) {
    }
    if (state.terrainMountains) {
      result.push(`${message} modified by -1 for mountains`);
    }
    if (state.terrainHighMountains) {
      result.push("HUNT: No hunting is possible in high mountains");
    }
    if (state.terrainLakeRiver) {
    }
    if (state.terrainMarshlands) {
      result.push(`${message} modified by -1 for marshland`);
    }
    if (state.terrainQuagmire) {
    }
    if (state.terrainRuins) {
      result.push(`${message} modified by -1 for ruins`);
    }

    if (!result.length) {
      result.push(message);
    }
    return result;
  }
};
