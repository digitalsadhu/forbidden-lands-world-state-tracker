import { html } from "../../dependencies/lit-all.min.js";

/**
 * @param { import("../../data-structures/selected-options").SelectedOptions } selectedOptions
 * @param { import("../../weather").Weather } weather
 * @param { boolean } dark
 * */
export default (selectedOptions, weather, dark) => {
  if (selectedOptions.hunt.value) {
    const result = [];
    let message = html`<span class="c-action">Hunt</span> roll <span class="c-skill">survival</span>`;
    if (selectedOptions.terrainPlains.value) {
      result.push(
        html`${message} modified by <span class="c-modifier">+1</span> for <span class="c-terrain">plains</span>`
      );
    }
    if (selectedOptions.terrainForest.value) {
      result.push(
        html`${message} modified by <span class="c-modifier">+1</span> for <span class="c-terrain">forest</span>`
      );
    }
    if (selectedOptions.terrainDarkForest.value) {
    }
    if (selectedOptions.terrainHills.value) {
    }
    if (selectedOptions.terrainMountains.value) {
      result.push(
        html`${message} modified by <span class="c-modifier">-1</span> for <span class="c-terrain">mountains</span>`
      );
    }
    if (selectedOptions.terrainHighMountains.value) {
      result.push(
        html`<span class="c-action">hunt</span> no hunting is possible in
          <span class="c-terrain">high mountains</span>.`
      );
    }
    if (selectedOptions.terrainLakeRiver.value) {
    }
    if (selectedOptions.terrainMarshlands.value) {
      result.push(
        html`${message} modified by <span class="c-modifier">-1</span> for <span class="c-terrain">marshland</span>`
      );
    }
    if (selectedOptions.terrainQuagmire.value) {
    }
    if (selectedOptions.terrainRuins.value) {
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
