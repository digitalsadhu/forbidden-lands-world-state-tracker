import { html } from "../../dependencies/lit-all.min.js";

/**
 * @param { import("../../types").State } state
 */
export default async (state) => {
  if (state.hunt) {
    const result = [];
    let message = html`<span class="c-action">Hunt</span> roll <span class="c-skill">survival</span>`;
    if (state.terrainPlains) {
      result.push(
        html`${message} modified by <span class="c-modifier">+1</span> for <span class="c-terrain">plains</span>`
      );
    }
    if (state.terrainForest) {
      result.push(
        html`${message} modified by <span class="c-modifier">+1</span> for <span class="c-terrain">forest</span>`
      );
    }
    if (state.terrainDarkForest) {
    }
    if (state.terrainHills) {
    }
    if (state.terrainMountains) {
      result.push(
        html`${message} modified by <span class="c-modifier">-1</span> for <span class="c-terrain">mountains</span>`
      );
    }
    if (state.terrainHighMountains) {
      result.push(
        html`<span class="c-action">hunt</span> no hunting is possible in
          <span class="c-terrain">high mountains</span>.`
      );
    }
    if (state.terrainLakeRiver) {
    }
    if (state.terrainMarshlands) {
      result.push(
        html`${message} modified by <span class="c-modifier">-1</span> for <span class="c-terrain">marshland</span>`
      );
    }
    if (state.terrainQuagmire) {
    }
    if (state.terrainRuins) {
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
