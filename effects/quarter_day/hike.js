import { html } from "../../dependencies/lit-all.min.js";

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
    let terrainName = "";
    if (state.terrainPlains) {
      terrainName = "plains";
      terrainType = terrainTypes.OPEN;
    }
    if (state.terrainForest) {
      terrainName = "forest";
      terrainType = terrainTypes.OPEN;
    }
    if (state.terrainDarkForest) {
      terrainName = "dark forest";
      terrainType = terrainTypes.DIFFICULT;
    }
    if (state.terrainHills) {
      terrainName = "hills";
      terrainType = terrainTypes.OPEN;
    }
    if (state.terrainMountains) {
      terrainName = "mountains";
      terrainType = terrainTypes.DIFFICULT;
    }
    if (state.terrainHighMountains) {
      terrainName = "high mountains";
      terrainType = terrainTypes.IMPASSABLE;
    }
    if (state.terrainLakeRiver) {
      terrainName = "lake / river";
      terrainType = terrainTypes.REQUIRES_BOAT_OR_RAFT;
    }
    if (state.terrainMarshlands) {
      terrainName = "marshlands";
      terrainType = terrainTypes.REQUIRES_RAFT;
    }
    if (state.terrainQuagmire) {
      terrainName = "quagmire";
      terrainType = terrainTypes.DIFFICULT;
    }
    if (state.terrainRuins) {
      terrainName = "ruins";
      terrainType = terrainTypes.DIFFICULT;
    }

    let message = html`<span class="c-action">hike</span>`;

    if (!terrainType)
      message = html`${message} move 2 hexes in open terrain or 1 hex in difficult terrain each quarter day`;
    if (terrainType === terrainTypes.OPEN)
      message = html`${message} move 2 hexes in <span class="c-terrain">${terrainName}</span> (${terrainTypes.OPEN})`;
    if (terrainType === terrainTypes.DIFFICULT)
      message = html`${message} move 1 hex in <span class="c-terrain">${terrainName}</span> (${terrainTypes.DIFFICULT})
        each quarter day`;
    if (terrainType === terrainTypes.IMPASSABLE)
      message = html`${message} You cannot <span class="c-action">hike</span> in this hex.
        <span class="c-terrain">${terrainName}</span> terrain is ${terrainTypes.IMPASSABLE}`;
    if (terrainType === terrainTypes.REQUIRES_BOAT_OR_RAFT)
      message = html`${message} ${terrainName} ${terrainTypes.REQUIRES_BOAT_OR_RAFT}`;
    if (terrainType === terrainTypes.REQUIRES_RAFT)
      message = html`${message} ${terrainName} ${terrainTypes.REQUIRES_RAFT}`;

    if (state.weather.wind === "Storm" && state.weather.rain === "Heavy Rain")
      message = html`${message} hiking in a storm and heavy rain requires an <span class="c-skill">endurance</span> -2
        roll each quarter day.`;
    else if (state.weather.wind === "Storm")
      message = html`${message} hiking in a storm requires an <span class="c-skill">endurance</span> roll each quarter
        day.`;
    else if (state.weather.rain === "Heavy Rain")
      message = html`${message} hiking in heavy rain requires an <span class="c-skill">endurance</span> roll each
        quarter day.`;

    return [message, html`<span class="c-action">hike</span> roll for a random encounter each quarter day.`];
  }
};
