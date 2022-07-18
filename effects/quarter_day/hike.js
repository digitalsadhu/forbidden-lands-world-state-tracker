const terrainTypes = {
  OPEN: "Open terrain",
  DIFFICULT: "Difficult terrain",
  IMPASSABLE: "Impassable",
  REQUIRES_BOAT_OR_RAFT: "Requires a boat or raft",
  REQUIRES_RAFT: "Requires a raft",
};

/**
 * @param { import("../../types").State } state
 */
export default async (state) => {
  if (state.hike) {
    let terrainType = null;
    if (state.terrainPlains) {
      terrainType = terrainTypes.OPEN;
    }
    if (state.terrainForest) {
      terrainType = terrainTypes.OPEN;
    }
    if (state.terrainDarkForest) {
      terrainType = terrainTypes.DIFFICULT;
    }
    if (state.terrainHills) {
      terrainType = terrainTypes.OPEN;
    }
    if (state.terrainMountains) {
      terrainType = terrainTypes.DIFFICULT;
    }
    if (state.terrainHighMountains) {
      terrainType = terrainTypes.IMPASSABLE;
    }
    if (state.terrainLakeRiver) {
      terrainType = terrainTypes.REQUIRES_BOAT_OR_RAFT;
    }
    if (state.terrainMarshlands) {
      terrainType = terrainTypes.REQUIRES_RAFT;
    }
    if (state.terrainQuagmire) {
      terrainType = terrainTypes.DIFFICULT;
    }
    if (state.terrainRuins) {
      terrainType = terrainTypes.DIFFICULT;
    }

    if (!terrainType) return ["HIKE: Move 2 hexes in open terrain or 1 hex in difficult terrain."];

    let message = "HIKE:";
    if (terrainType === terrainTypes.OPEN) message += ` Move 2 hexes (${terrainTypes.OPEN})`;
    if (terrainType === terrainTypes.DIFFICULT) message += ` Move 1 hex (${terrainTypes.DIFFICULT})`;
    if (terrainType === terrainTypes.IMPASSABLE)
      message += ` You cannot HIKE in this hex. The terrain is (${terrainTypes.IMPASSABLE})`;
    if (terrainType === terrainTypes.REQUIRES_BOAT_OR_RAFT) message += ` ${terrainTypes.REQUIRES_BOAT_OR_RAFT}`;
    if (terrainType === terrainTypes.REQUIRES_RAFT) message += ` ${terrainTypes.REQUIRES_RAFT}`;

    return [message];
  }
};
