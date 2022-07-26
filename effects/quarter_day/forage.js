import { html } from "../../dependencies/lit-all.min.js";

/**
 * @param { import("../../types").State } state
 */
export default async (state) => {
  if (state.forage) {
    const result = [];
    let message = html`<span class="c-action">Forage</span> roll <span class="c-skill">survival</span>`;
    if (state.terrainPlains) {
      result.push(
        html`${message} modified by <span class="c-modifier">-1</span> for <span class="c-terrain">plains</span>.`
      );
    }
    if (state.terrainForest) {
      result.push(
        html`${message} modified by <span class="c-modifier">+1</span> for <span class="c-terrain">forest</span>.`
      );
    }
    if (state.terrainDarkForest) {
      result.push(
        html`${message} modified by <span class="c-modifier">-1</span> for <span class="c-terrain">dark forest</span>.`
      );
    }
    if (state.terrainHills) {
      result.push(html`${message} unmodified for <span class="c-terrain">hills</span>.`);
    }
    if (state.terrainMountains) {
      result.push(
        html`${message} modified by <span class="c-modifier">-2</span> for <span class="c-terrain">mountains</span>`
      );
    }
    if (state.terrainHighMountains) {
      result.push(
        html`<span class="c-action">Forage</span> no foraging is possible in
          <span class="c-terrain">high mountains</span>`
      );
    }
    if (state.terrainLakeRiver) {
      result.push(
        html`<span class="c-action">Forage</span> no foraging is possible on
          <span class="c-terrain">lakes or rivers</span>.`
      );
    }
    if (state.terrainMarshlands) {
      result.push(
        html`${message} modified by <span class="c-modifier">+1</span> for <span class="c-terrain">marshland</span>.`
      );
    }
    if (state.terrainQuagmire) {
      result.push(
        html`${message} modified by <span class="c-modifier">-1</span> for <span class="c-terrain">quagmire</span>`
      );
    }
    if (state.terrainRuins) {
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
