import { html } from "../../dependencies/lit-all.min.js";

/**
 * @param { import("../../types").State } state
 */
export default (state) => {
  if (state.forage.value) {
    const result = [];
    let message = html`<span class="c-action">Forage</span> roll <span class="c-skill">survival</span>`;
    if (state.terrainPlains.value) {
      result.push(
        html`${message} modified by <span class="c-modifier">-1</span> for <span class="c-terrain">plains</span>.`
      );
    }
    if (state.terrainForest.value) {
      result.push(
        html`${message} modified by <span class="c-modifier">+1</span> for <span class="c-terrain">forest</span>.`
      );
    }
    if (state.terrainDarkForest.value) {
      result.push(
        html`${message} modified by <span class="c-modifier">-1</span> for <span class="c-terrain">dark forest</span>.`
      );
    }
    if (state.terrainHills.value) {
      result.push(html`${message} unmodified for <span class="c-terrain">hills</span>.`);
    }
    if (state.terrainMountains.value) {
      result.push(
        html`${message} modified by <span class="c-modifier">-2</span> for <span class="c-terrain">mountains</span>`
      );
    }
    if (state.terrainHighMountains.value) {
      result.push(
        html`<span class="c-action">Forage</span> no foraging is possible in
          <span class="c-terrain">high mountains</span>`
      );
    }
    if (state.terrainLakeRiver.value) {
      result.push(
        html`<span class="c-action">Forage</span> no foraging is possible on
          <span class="c-terrain">lakes or rivers</span>.`
      );
    }
    if (state.terrainMarshlands.value) {
      result.push(
        html`${message} modified by <span class="c-modifier">+1</span> for <span class="c-terrain">marshland</span>.`
      );
    }
    if (state.terrainQuagmire.value) {
      result.push(
        html`${message} modified by <span class="c-modifier">-1</span> for <span class="c-terrain">quagmire</span>`
      );
    }
    if (state.terrainRuins.value) {
      result.push(
        html`${message} modified by <span class="c-modifier">-2</span> for <span class="c-terrain">ruins</span>`
      );
    }

    if (!result.length) {
      result.push(message);
    }
    return result;
  }
};
