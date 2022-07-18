/**
 * @param { import("../../types").State } state
 */
export default async (state) => {
  if (state.forage) {
    const result = [];
    let message = "FORAGE: Roll SURVIVAL";
    if (state.terrainPlains) {
      result.push(`${message} modified by -1 for plains`);
    }
    if (state.terrainForest) {
      result.push(`${message} modified by +1 for forest`);
    }
    if (state.terrainDarkForest) {
      result.push(`${message} modified by -1 for dark forest`);
    }
    if (state.terrainHills) {
      result.push(message);
    }
    if (state.terrainMountains) {
      result.push(`${message} modified by -2 for mountains`);
    }
    if (state.terrainHighMountains) {
      result.push("FORAGE: No foraging is possible in high mountains");
    }
    if (state.terrainLakeRiver) {
      result.push("FORAGE: No foraging is possible on lakes or rivers");
    }
    if (state.terrainMarshlands) {
      result.push(`${message} modified by +1 for marshland`);
    }
    if (state.terrainQuagmire) {
      result.push(`${message} modified by -1 for quagmire`);
    }
    if (state.terrainRuins) {
      result.push(`${message} modified by -2 for ruins`);
    }

    if (!result.length) {
      result.push(message);
    }
    return result;
  }
};
