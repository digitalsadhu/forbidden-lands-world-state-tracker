import { html } from "../../dependencies/lit-all.min.js";

/**
 * @param { import("../../data-structures/selected-options").SelectedOptions } selectedOptions
 * @param { import("../../weather").Weather } weather
 * @param { boolean } dark
 * */
export default (selectedOptions, weather, dark) => {
  if (selectedOptions.forage.value) {
    const result = [];
    let message = html`<span class="c-action">Forage</span> roll <span class="c-skill">survival</span>`;
    if (selectedOptions.terrainPlains.value) {
      result.push(
        html`${message} modified by <span class="c-modifier">-1</span> for <span class="c-terrain">plains</span>.`
      );
    }
    if (selectedOptions.terrainForest.value) {
      result.push(
        html`${message} modified by <span class="c-modifier">+1</span> for <span class="c-terrain">forest</span>.`
      );
    }
    if (selectedOptions.terrainDarkForest.value) {
      result.push(
        html`${message} modified by <span class="c-modifier">-1</span> for <span class="c-terrain">dark forest</span>.`
      );
    }
    if (selectedOptions.terrainHills.value) {
      result.push(html`${message} unmodified for <span class="c-terrain">hills</span>.`);
    }
    if (selectedOptions.terrainMountains.value) {
      result.push(
        html`${message} modified by <span class="c-modifier">-2</span> for <span class="c-terrain">mountains</span>`
      );
    }
    if (selectedOptions.terrainHighMountains.value) {
      result.push(
        html`<span class="c-action">Forage</span> no foraging is possible in
          <span class="c-terrain">high mountains</span>`
      );
    }
    if (selectedOptions.terrainLakeRiver.value) {
      result.push(
        html`<span class="c-action">Forage</span> no foraging is possible on
          <span class="c-terrain">lakes or rivers</span>.`
      );
    }
    if (selectedOptions.terrainMarshlands.value) {
      result.push(
        html`${message} modified by <span class="c-modifier">+1</span> for <span class="c-terrain">marshland</span>.`
      );
    }
    if (selectedOptions.terrainQuagmire.value) {
      result.push(
        html`${message} modified by <span class="c-modifier">-1</span> for <span class="c-terrain">quagmire</span>`
      );
    }
    if (selectedOptions.terrainRuins.value) {
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
