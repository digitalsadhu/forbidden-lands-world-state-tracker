import { html } from "../../dependencies/lit-all.min.js";

/**
 * @param { import("../../types").State } state
 */
export default (state) => {
  if (state.hunt.value) {
    const result = [];
    let message = html`<span class="c-action">Hunt</span> roll <span class="c-skill">survival</span>`;
    if (state.terrainPlains.value) {
      result.push(
        html`${message} modified by <span class="c-modifier">+1</span> for <span class="c-terrain">plains</span>`
      );
    }
    if (state.terrainForest.value) {
      result.push(
        html`${message} modified by <span class="c-modifier">+1</span> for <span class="c-terrain">forest</span>`
      );
    }
    if (state.terrainDarkForest.value) {
    }
    if (state.terrainHills.value) {
    }
    if (state.terrainMountains.value) {
      result.push(
        html`${message} modified by <span class="c-modifier">-1</span> for <span class="c-terrain">mountains</span>`
      );
    }
    if (state.terrainHighMountains.value) {
      result.push(
        html`<span class="c-action">hunt</span> no hunting is possible in
          <span class="c-terrain">high mountains</span>.`
      );
    }
    if (state.terrainLakeRiver.value) {
    }
    if (state.terrainMarshlands.value) {
      result.push(
        html`${message} modified by <span class="c-modifier">-1</span> for <span class="c-terrain">marshland</span>`
      );
    }
    if (state.terrainQuagmire.value) {
    }
    if (state.terrainRuins.value) {
      result.push(
        html`${message} modified by <span class="c-modifier">-1</span> for <span class="c-terrain">ruins</span>`
      );
    }

    if (!result.length) {
      result.push(message);
    }
    return result;
  }
};
