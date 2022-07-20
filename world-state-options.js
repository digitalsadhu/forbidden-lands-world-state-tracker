import { LitElement, html, css, classMap } from "https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js";
import { globalStyles } from "./global-styles.js";

export class WorldStateOptions extends LitElement {
  constructor() {
    super();
    this.overEncumbered = false;
    this.warmClothes = false;
    this.inWater = false;
    this.poisoned = false;
    this.injured = false;
    this.diseased = false;
    this.bareGroundSleeping = false;
    this.usingArrows = false;
    this.wearingArmor = false;
    this.ownStronghold = false;
    this.haveHirelings = false;
    this.hike = false;
    this.fish = false;
    this.forage = false;
    this.hunt = false;
    this.keepWatch = false;
    this.leadTheWay = false;
    this.rest = false;
    this.sleep = false;
    this.makeCamp = false;
    this.forcedMarch = 0;
    this.environmentCold = false;
    this.environmentDark = false;
    this.lightSource = false;
    this.plains = false;
    this.forest = false;
    this.darkForest = false;
    this.hills = false;
    this.mountains = false;
    this.highMountains = false;
    this.lakeRiver = false;
    this.marshlands = false;
    this.quagmire = false;
    this.ruins = false;
  }

  static properties = {
    overEncumbered: { type: Boolean },
    warmClothes: { type: Boolean },
    inWater: { type: Boolean },
    poisoned: { type: Boolean },
    injured: { type: Boolean },
    diseased: { type: Boolean },
    bareGroundSleeping: { type: Boolean },
    usingArrows: { type: Boolean },
    wearingArmor: { type: Boolean },
    ownStronghold: { type: Boolean },
    haveHirelings: { type: Boolean },
    explore: { type: Boolean },
    hike: { type: Boolean },
    fish: { type: Boolean },
    forage: { type: Boolean },
    hunt: { type: Boolean },
    keepWatch: { type: Boolean },
    leadTheWay: { type: Boolean },
    rest: { type: Boolean },
    sleep: { type: Boolean },
    makeCamp: { type: Boolean },
    forcedMarch: { type: Number },
    environmentCold: { type: Boolean },
    environmentDark: { type: Boolean, attribute: "environment-dark" },
    lightSource: { type: Boolean },
    plains: { type: Boolean },
    forest: { type: Boolean },
    darkForest: { type: Boolean },
    hills: { type: Boolean },
    mountains: { type: Boolean },
    highMountains: { type: Boolean },
    lakeRiver: { type: Boolean },
    marshlands: { type: Boolean },
    quagmire: { type: Boolean },
    ruins: { type: Boolean },
  };

  static styles = [
    globalStyles,
    css`
      :host {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 20px;
      }
      .party > section {
        display: flex;
        flex-direction: row;
        gap: 20px;
        flex-wrap: wrap;
        align-items: flex-start;
      }
      .other > section {
        display: flex;
        flex-direction: row;
        gap: 20px;
        flex-wrap: wrap;
        align-items: flex-start;
      }
      .left {
        display: flex;
        flex-direction: column;
        gap: 20px;
        align-items: flex-start;
      }
      .right {
        display: flex;
        flex-direction: row;
        gap: 40px;
        align-items: flex-start;
      }
      .journey > section {
        display: flex;
        flex-direction: row;
        gap: 40px;
        align-items: flex-start;
      }
      .left > section > section > div {
        min-width: 140px;
      }
    `,
  ];

  selectionChange(e) {
    this.dispatchEvent(new CustomEvent("change", { detail: { name: e.target.value, selected: e.target.checked } }));
  }

  radioSelectionChange(e) {
    this.dispatchEvent(
      new CustomEvent("change", { detail: { name: e.target.name, selected: Number(e.target.value) } })
    );
  }

  conditionsTemplate() {
    return html`
      <div>
        <input
          @change="${this.selectionChange}"
          type="checkbox"
          id="hungry"
          name="hungry"
          value="hungry"
          ?checked="${this.hungry}"
        />
        <label for="hungry">Hungry</label>
      </div>
      <div>
        <input
          @change="${this.selectionChange}"
          type="checkbox"
          id="thirsty"
          name="thirsty"
          value="thirsty"
          ?checked="${this.thirsty}"
        />
        <label for="thirsty">Thirsty</label>
      </div>
      <div>
        <input
          @change="${this.selectionChange}"
          type="checkbox"
          id="sleepy"
          name="sleepy"
          value="sleepy"
          ?checked="${this.sleepy}"
        />
        <label for="sleepy">Sleepy</label>
      </div>
      <div>
        <input
          @change="${this.selectionChange}"
          type="checkbox"
          id="cold"
          name="cold"
          value="cold"
          ?checked="${this.cold}"
        />
        <label for="cold">Cold</label>
      </div>
      <div>
        <input
          @change="${this.selectionChange}"
          type="checkbox"
          id="poisoned"
          name="poisoned"
          value="poisoned"
          ?checked="${this.poisoned}"
        />
        <label for="poisoned">Poisoned</label>
      </div>
      <div>
        <input
          @change="${this.selectionChange}"
          type="checkbox"
          id="injured"
          name="injured"
          value="injured"
          ?checked="${this.injured}"
        />
        <label for="injured">Injured</label>
      </div>
      <div>
        <input
          @change="${this.selectionChange}"
          type="checkbox"
          id="diseased"
          name="diseased"
          value="diseased"
          ?checked="${this.diseased}"
        />
        <label for="diseased">Sick</label>
      </div>
    `;
  }

  gearTemplate() {
    return html`
      <div>
        <input
          @change="${this.selectionChange}"
          type="checkbox"
          id="over-encumbered"
          name="over-encumbered"
          value="overEncumbered"
          ?checked="${this.overEncumbered}"
        />
        <label for="over-encumbered">Over encumbered</label>
      </div>
      <div>
        <input
          @change="${this.selectionChange}"
          type="checkbox"
          id="using-arrows"
          name="using-arrows"
          value="usingArrows"
          ?checked="${this.usingArrows}"
        />
        <label for="using-arrows">Arrows</label>
      </div>
      <div>
        <input
          @change="${this.selectionChange}"
          type="checkbox"
          id="wearing-armor"
          name="wearing-armor"
          value="wearingArmor"
          ?checked="${this.wearingArmor}"
        />
        <label for="wearing-armor">Armor</label>
      </div>
      <div>
        <input
          @change="${this.selectionChange}"
          type="checkbox"
          id="warm-clothes"
          name="warm-clothes"
          value="warmClothes"
          ?checked="${this.warmClothes}"
        />
        <label for="warm-clothes">Warm clothes</label>
      </div>
      <div>
        <input
          @change="${this.selectionChange}"
          type="checkbox"
          id="light-source"
          name="lightSource"
          value="lightSource"
          ?checked="${this.lightSource}"
        />
        <label for="light-source">Light source</label>
      </div>
    `;
  }

  environmentTemplate() {
    return html`
      <div>
        <input
          @change="${this.selectionChange}"
          type="checkbox"
          id="environment-dark"
          name="environmentDark"
          value="environmentDark"
          .checked="${this.environmentDark}"
        />
        <label for="environment-dark">Dark</label>
      </div>
      <div>
        <input
          @change="${this.selectionChange}"
          type="checkbox"
          id="environment-cold"
          name="environmentCold"
          value="environmentCold"
          ?checked="${this.environmentCold}"
        />
        <label for="environment-cold">Cold</label>
      </div>
      <div>
        <input
          @change="${this.selectionChange}"
          type="checkbox"
          id="in-water"
          name="in-water"
          value="inWater"
          ?checked="${this.inWater}"
        />
        <label for="in-water">Water</label>
      </div>
    `;
  }

  strongholdTemplate() {
    return html`
      <div>
        <input
          @change="${this.selectionChange}"
          type="checkbox"
          id="own-stronghold"
          name="own-stronghold"
          value="ownStronghold"
          ?checked="${this.ownStronghold}"
        />
        <label for="own-stronghold">Stronghold</label>
      </div>
      <div>
        <input
          @change="${this.selectionChange}"
          type="checkbox"
          id="have-hirelings"
          name="have-hirelings"
          value="haveHirelings"
          ?checked="${this.haveHirelings}"
        />
        <label for="have-hirelings">Hirelings</label>
      </div>
    `;
  }

  actionsTemplate() {
    return html`
      <div>
        <input
          @change="${this.selectionChange}"
          type="checkbox"
          id="explore"
          name="explore"
          value="explore"
          ?checked="${this.explore}"
        />
        <label for="explore">Explore</label>
      </div>
      <div>
        <input
          @change="${this.selectionChange}"
          type="checkbox"
          id="hike"
          name="hike"
          value="hike"
          ?checked="${this.hike}"
        />
        <label for="hike">Hike</label>
      </div>
      <div>
        <input
          @change="${this.selectionChange}"
          type="checkbox"
          id="fish"
          name="fish"
          value="fish"
          ?checked="${this.fish}"
        />
        <label for="fish">Fish</label>
      </div>
      <div>
        <input
          @change="${this.selectionChange}"
          type="checkbox"
          id="forage"
          name="forage"
          value="forage"
          ?checked="${this.forage}"
        />
        <label for="forage">Forage</label>
      </div>
      <div>
        <input
          @change="${this.selectionChange}"
          type="checkbox"
          id="hunt"
          name="hunt"
          value="hunt"
          ?checked="${this.hunt}"
        />
        <label for="hunt">Hunt</label>
      </div>
      <div>
        <input
          @change="${this.selectionChange}"
          type="checkbox"
          id="keep-watch"
          name="keep-watch"
          value="keepWatch"
          ?checked="${this.keepWatch}"
        />
        <label for="keep-watch">Keep watch</label>
      </div>
      <div>
        <input
          @change="${this.selectionChange}"
          type="checkbox"
          id="lead-the-way"
          name="lead-the-way"
          value="leadTheWay"
          ?checked="${this.leadTheWay}"
        />
        <label for="lead-the-way">Lead the way</label>
      </div>
      <div>
        <input
          @change="${this.selectionChange}"
          type="checkbox"
          id="rest"
          name="rest"
          value="rest"
          ?checked="${this.rest}"
        />
        <label for="rest">Rest</label>
      </div>
      <div>
        <input
          @change="${this.selectionChange}"
          type="checkbox"
          id="make-camp"
          name="make-camp"
          value="makeCamp"
          ?checked="${this.makeCamp}"
        />
        <label for="make-camp">Make camp</label>
      </div>
      <div>
        <input
          @change="${this.selectionChange}"
          type="checkbox"
          id="sleep"
          name="sleep"
          value="sleep"
          ?checked="${this.sleep}"
        />
        <label for="sleep">Sleep</label>

        <!-- <input
          @change="${this.selectionChange}"
          type="checkbox"
          id="bare-ground-sleeping"
          name="bare-ground-sleeping"
          value="bareGroundSleeping"
          ?checked="${this.bareGroundSleeping}"
        />
        <label for="bare-ground-sleeping">(didn't make camp first)</label> -->
      </div>
      <div>
        <!-- Forced march
        <label>
          <input
            @change="${this.radioSelectionChange}"
            type="radio"
            name="forcedMarch"
            value="0"
            ?checked="${this.forcedMarch === 0}"
          />No
        </label> -->
        <!-- <label>
          <input
            @change="${this.radioSelectionChange}"
            type="radio"
            name="forcedMarch"
            value="1"
            ?checked="${this.forcedMarch === 1}"
          />1 quarter day
        </label>
        <label>
          <input
            @change="${this.radioSelectionChange}"
            type="radio"
            name="forcedMarch"
            value="2"
            ?checked="${this.forcedMarch === 2}"
          />2 quarter days
        </label> -->
      </div>
    `;
  }

  terrainTemplate() {
    return html`
      <div>
        <input
          @change="${this.selectionChange}"
          type="checkbox"
          id="terrain-plains"
          name="terrainPlains"
          value="terrainPlains"
          ?checked="${this.terrainPlains}"
        />
        <label for="terrain-plains">Plains</label>
      </div>
      <div>
        <input
          @change="${this.selectionChange}"
          type="checkbox"
          id="terrain-forest"
          name="terrainForest"
          value="terrainForest"
          ?checked="${this.terrainForest}"
        />
        <label for="terrain-forest">Forest</label>
      </div>
      <div>
        <input
          @change="${this.selectionChange}"
          type="checkbox"
          id="terrain-dark-forest"
          name="terrainDarkForest"
          value="terrainDarkForest"
          ?checked="${this.terrainDarkForest}"
        />
        <label for="terrain-dark-forest">Dark forest</label>
      </div>
      <div>
        <input
          @change="${this.selectionChange}"
          type="checkbox"
          id="terrain-hills"
          name="terrainHills"
          value="terrainHills"
          ?checked="${this.terrainHills}"
        />
        <label for="terrain-hills">Hills</label>
      </div>
      <div>
        <input
          @change="${this.selectionChange}"
          type="checkbox"
          id="terrain-mountains"
          name="terrainMountains"
          value="terrainMountains"
          ?checked="${this.terrainMountains}"
        />
        <label for="terrain-mountains">Mountains</label>
      </div>
      <div>
        <input
          @change="${this.selectionChange}"
          type="checkbox"
          id="terrain-high-mountains"
          name="terrainHighMountains"
          value="terrainHighMountains"
          ?checked="${this.terrainHighMountains}"
        />
        <label for="terrain-high-mountains">High mountains</label>
      </div>
      <div>
        <input
          @change="${this.selectionChange}"
          type="checkbox"
          id="terrain-lake-river"
          name="terrainLakeRiver"
          value="terrainLakeRiver"
          ?checked="${this.terrainLakeRiver}"
        />
        <label for="terrain-lake-river">Lake / river</label>
      </div>
      <div>
        <input
          @change="${this.selectionChange}"
          type="checkbox"
          id="terrain-marshlands"
          name="terrainMarshlands"
          value="terrainMarshlands"
          ?checked="${this.terrainMarshlands}"
        />
        <label for="terrain-marshlands">Marshlands</label>
      </div>
      <div>
        <input
          @change="${this.selectionChange}"
          type="checkbox"
          id="terrain-quagmire"
          name="terrainQuagmire"
          value="terrainQuagmire"
          ?checked="${this.terrainQuagmire}"
        />
        <label for="terrain-quagmire">Quagmire</label>
      </div>
      <div>
        <input
          @change="${this.selectionChange}"
          type="checkbox"
          id="terrain-ruins"
          name="terrainRuins"
          value="terrainRuins"
          ?checked="${this.terrainRuins}"
        />
        <label for="terrain-ruins">Ruins</label>
      </div>
    `;
  }

  render() {
    return html`
      <section class="left">
        <section class="party">
          <h2>Party</h2>
          <section>
            <div class="conditions">
              <h3>Conditions</h3>
              ${this.conditionsTemplate()}
            </div>
            <div class="gear">
              <h3>Gear</h3>
              ${this.gearTemplate()}
            </div>
          </section>
        </section>
        <section class="other">
          <h2>Other</h2>
          <section>
            <div class="environment">
              <h3>Environment</h3>
              ${this.environmentTemplate()}
            </div>
            <div class="stronghold">
              <h3>Stronghold</h3>
              ${this.strongholdTemplate()}
            </div>
          </section>
        </section>
      </section>
      <section class="right">
        <section class="journey">
          <h2>Journey</h2>
          <section>
            <div class="actions">
              <h3>Actions</h3>
              ${this.actionsTemplate()}
            </div>
            <div class="terrain">
              <h3>Terrain</h3>
              ${this.terrainTemplate()}
            </div>
          </section>
        </section>
      </section>
    `;
  }
}
