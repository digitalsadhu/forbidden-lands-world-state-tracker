import { html } from "../../dependencies/lit-all.min.js";

const terrainTypes = {
  OPEN: "Open terrain",
  DIFFICULT: "Difficult terrain",
  IMPASSABLE: "Impassable",
  REQUIRES_BOAT_OR_RAFT: "Requires a boat or raft",
  REQUIRES_RAFT: "Requires a raft",
};

/**
 * @param { import("../../data-structures/selected-options").SelectedOptions } selectedOptions
 * @param { import("../../weather").Weather } weather
 * @param { boolean } dark
 * */
export default (selectedOptions, weather, dark) => {
  if (selectedOptions.hike.value) {
    let terrainType = null;
    let terrainName = "";
    if (selectedOptions.terrainPlains.value) {
      terrainName = "plains";
      terrainType = terrainTypes.OPEN;
    }
    if (selectedOptions.terrainForest.value) {
      terrainName = "forest";
      terrainType = terrainTypes.OPEN;
    }
    if (selectedOptions.terrainDarkForest.value) {
      terrainName = "dark forest";
      terrainType = terrainTypes.DIFFICULT;
    }
    if (selectedOptions.terrainHills.value) {
      terrainName = "hills";
      terrainType = terrainTypes.OPEN;
    }
    if (selectedOptions.terrainMountains.value) {
      terrainName = "mountains";
      terrainType = terrainTypes.DIFFICULT;
    }
    if (selectedOptions.terrainHighMountains.value) {
      terrainName = "high mountains";
      terrainType = terrainTypes.IMPASSABLE;
    }
    if (selectedOptions.terrainLakeRiver.value) {
      terrainName = "lake / river";
      terrainType = terrainTypes.REQUIRES_BOAT_OR_RAFT;
    }
    if (selectedOptions.terrainMarshlands.value) {
      terrainName = "marshlands";
      terrainType = terrainTypes.REQUIRES_RAFT;
    }
    if (selectedOptions.terrainQuagmire.value) {
      terrainName = "quagmire";
      terrainType = terrainTypes.DIFFICULT;
    }
    if (selectedOptions.terrainRuins.value) {
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

    if (weather.wind === "Storm" && weather.rain === "Heavy Rain")
      message = html`${message} hiking in a storm and heavy rain requires an <span class="c-skill">endurance</span> -2
        roll each quarter day.`;
    else if (weather.wind === "Storm")
      message = html`${message} hiking in a storm requires an <span class="c-skill">endurance</span> roll each quarter
        day.`;
    else if (weather.rain === "Heavy Rain")
      message = html`${message} hiking in heavy rain requires an <span class="c-skill">endurance</span> roll each
        quarter day.`;

    return [message, html`<span class="c-action">hike</span> roll for a random encounter each quarter day.`];
  }
};
