import { LitElement, html, css, classMap } from "https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js";

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
  static styles = css`
    :host {
      display: flex;
      flex-direction: row;
    }
  `;
  selectionChange(e) {
    this.dispatchEvent(new CustomEvent("change", { detail: { name: e.target.value, selected: e.target.checked } }));
  }
  radioSelectionChange(e) {
    this.dispatchEvent(
      new CustomEvent("change", { detail: { name: e.target.name, selected: Number(e.target.value) } })
    );
  }
  render() {
    return html`
      <section>
        <h3>Conditions</h3>
        <div>
          <label for="hungry">HUNGRY</label>
          <input
            @change="${this.selectionChange}"
            type="checkbox"
            id="hungry"
            name="hungry"
            value="hungry"
            ?checked="${this.hungry}"
          />
        </div>
        <div>
          <label for="thirsty">THIRSTY</label>
          <input
            @change="${this.selectionChange}"
            type="checkbox"
            id="thirsty"
            name="thirsty"
            value="thirsty"
            ?checked="${this.thirsty}"
          />
        </div>
        <div>
          <label for="sleepy">SLEEPY</label>
          <input
            @change="${this.selectionChange}"
            type="checkbox"
            id="sleepy"
            name="sleepy"
            value="sleepy"
            ?checked="${this.sleepy}"
          />
        </div>
        <div>
          <label for="cold">COLD</label>
          <input
            @change="${this.selectionChange}"
            type="checkbox"
            id="cold"
            name="cold"
            value="cold"
            ?checked="${this.cold}"
          />
        </div>
        <div>
          <label for="poisoned">POISONED</label>
          <input
            @change="${this.selectionChange}"
            type="checkbox"
            id="poisoned"
            name="poisoned"
            value="poisoned"
            ?checked="${this.poisoned}"
          />
        </div>
        <div>
          <label for="injured">INJURED</label>
          <input
            @change="${this.selectionChange}"
            type="checkbox"
            id="injured"
            name="injured"
            value="injured"
            ?checked="${this.injured}"
          />
        </div>
        <div>
          <label for="diseased">SICK/DISEASED</label>
          <input
            @change="${this.selectionChange}"
            type="checkbox"
            id="diseased"
            name="diseased"
            value="diseased"
            ?checked="${this.diseased}"
          />
        </div>
      </section>
      <section>
        <h3>Gear</h3>
        <div>
          <label for="over-encumbered">Over encumbered</label>
          <input
            @change="${this.selectionChange}"
            type="checkbox"
            id="over-encumbered"
            name="over-encumbered"
            value="overEncumbered"
            ?checked="${this.overEncumbered}"
          />
        </div>
        <div>
          <label for="using-arrows">Arrows</label>
          <input
            @change="${this.selectionChange}"
            type="checkbox"
            id="using-arrows"
            name="using-arrows"
            value="usingArrows"
            ?checked="${this.usingArrows}"
          />
        </div>
        <div>
          <label for="wearing-armor">Armor</label>
          <input
            @change="${this.selectionChange}"
            type="checkbox"
            id="wearing-armor"
            name="wearing-armor"
            value="wearingArmor"
            ?checked="${this.wearingArmor}"
          />
        </div>
        <div>
          <label for="warm-clothes">Warm clothes</label>
          <input
            @change="${this.selectionChange}"
            type="checkbox"
            id="warm-clothes"
            name="warm-clothes"
            value="warmClothes"
            ?checked="${this.warmClothes}"
          />
        </div>
        <div>
          <label for="light-source">Light source</label>
          <input
            @change="${this.selectionChange}"
            type="checkbox"
            id="light-source"
            name="lightSource"
            value="lightSource"
            ?checked="${this.lightSource}"
          />
        </div>
      </section>
      <section>
        <h3>Stronghold</h3>
        <div>
          <label for="own-stronghold">Stronghold</label>
          <input
            @change="${this.selectionChange}"
            type="checkbox"
            id="own-stronghold"
            name="own-stronghold"
            value="ownStronghold"
            ?checked="${this.ownStronghold}"
          />
        </div>
        <div>
          <label for="have-hirelings">Hirelings</label>
          <input
            @change="${this.selectionChange}"
            type="checkbox"
            id="have-hirelings"
            name="have-hirelings"
            value="haveHirelings"
            ?checked="${this.haveHirelings}"
          />
        </div>
      </section>
      <section>
        <h3>Journeys</h3>
        <div>
          <label for="explore">EXPLORE</label>
          <input
            @change="${this.selectionChange}"
            type="checkbox"
            id="explore"
            name="explore"
            value="explore"
            ?checked="${this.explore}"
          />
        </div>
        <div>
          <label for="hike">HIKE</label>
          <input
            @change="${this.selectionChange}"
            type="checkbox"
            id="hike"
            name="hike"
            value="hike"
            ?checked="${this.hike}"
          />
        </div>
        <div>
          <label for="fish">FISH</label>
          <input
            @change="${this.selectionChange}"
            type="checkbox"
            id="fish"
            name="fish"
            value="fish"
            ?checked="${this.fish}"
          />
        </div>
        <div>
          <label for="forage">FORAGE</label>
          <input
            @change="${this.selectionChange}"
            type="checkbox"
            id="forage"
            name="forage"
            value="forage"
            ?checked="${this.forage}"
          />
        </div>
        <div>
          <label for="hunt">HUNT</label>
          <input
            @change="${this.selectionChange}"
            type="checkbox"
            id="hunt"
            name="hunt"
            value="hunt"
            ?checked="${this.hunt}"
          />
        </div>
        <div>
          <label for="keep-watch">KEEP WATCH</label>
          <input
            @change="${this.selectionChange}"
            type="checkbox"
            id="keep-watch"
            name="keep-watch"
            value="keepWatch"
            ?checked="${this.keepWatch}"
          />
        </div>
        <div>
          <label for="lead-the-way">LEAD THE WAY</label>
          <input
            @change="${this.selectionChange}"
            type="checkbox"
            id="lead-the-way"
            name="lead-the-way"
            value="leadTheWay"
            ?checked="${this.leadTheWay}"
          />
        </div>
        <div>
          <label for="rest">REST</label>
          <input
            @change="${this.selectionChange}"
            type="checkbox"
            id="rest"
            name="rest"
            value="rest"
            ?checked="${this.rest}"
          />
        </div>
        <div>
          <label for="make-camp">MAKE CAMP</label>
          <input
            @change="${this.selectionChange}"
            type="checkbox"
            id="make-camp"
            name="make-camp"
            value="makeCamp"
            ?checked="${this.makeCamp}"
          />
        </div>
        <div>
          <label for="sleep">SLEEP</label>
          <input
            @change="${this.selectionChange}"
            type="checkbox"
            id="sleep"
            name="sleep"
            value="sleep"
            ?checked="${this.sleep}"
          />
          <label for="bare-ground-sleeping">(didn't make camp first)</label>
          <input
            @change="${this.selectionChange}"
            type="checkbox"
            id="bare-ground-sleeping"
            name="bare-ground-sleeping"
            value="bareGroundSleeping"
            ?checked="${this.bareGroundSleeping}"
          />
        </div>
        <div>
          FORCED MARCH
          <label>
            <input
              @change="${this.radioSelectionChange}"
              type="radio"
              name="forcedMarch"
              value="0"
              ?checked="${this.forcedMarch === 0}"
            />No
          </label>
          <label>
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
          </label>
        </div>
      </section>
      <section>
        <h3>Environment</h3>
        <div>
          <label for="environment-dark">DARK</label>
          <input
            @change="${this.selectionChange}"
            type="checkbox"
            id="environment-dark"
            name="environmentDark"
            value="environmentDark"
            .checked="${this.environmentDark}"
          />
        </div>
        <div>
          <label for="environment-cold">COLD</label>
          <input
            @change="${this.selectionChange}"
            type="checkbox"
            id="environment-cold"
            name="environmentCold"
            value="environmentCold"
            ?checked="${this.environmentCold}"
          />
        </div>
        <div>
          <label for="in-water">WATER</label>
          <input
            @change="${this.selectionChange}"
            type="checkbox"
            id="in-water"
            name="in-water"
            value="inWater"
            ?checked="${this.inWater}"
          />
        </div>
      </section>
      <section>
        <h3>Terrain</h3>
        <div>
          <label for="terrain-plains">Plains</label>
          <input
            @change="${this.selectionChange}"
            type="checkbox"
            id="terrain-plains"
            name="terrainPlains"
            value="terrainPlains"
            ?checked="${this.terrainPlains}"
          />
        </div>
        <div>
          <label for="terrain-forest">forest</label>
          <input
            @change="${this.selectionChange}"
            type="checkbox"
            id="terrain-forest"
            name="terrainForest"
            value="terrainForest"
            ?checked="${this.terrainForest}"
          />
        </div>
        <div>
          <label for="terrain-dark-forest">Dark Forest</label>
          <input
            @change="${this.selectionChange}"
            type="checkbox"
            id="terrain-dark-forest"
            name="terrainDarkForest"
            value="terrainDarkForest"
            ?checked="${this.terrainDarkForest}"
          />
        </div>
        <div>
          <label for="terrain-hills">Hills</label>
          <input
            @change="${this.selectionChange}"
            type="checkbox"
            id="terrain-hills"
            name="terrainHills"
            value="terrainHills"
            ?checked="${this.terrainHills}"
          />
        </div>
        <div>
          <label for="terrain-mountains">Mountains</label>
          <input
            @change="${this.selectionChange}"
            type="checkbox"
            id="terrain-mountains"
            name="terrainMountains"
            value="terrainMountains"
            ?checked="${this.terrainMountains}"
          />
        </div>
        <div>
          <label for="terrain-high-mountains">High Mountains</label>
          <input
            @change="${this.selectionChange}"
            type="checkbox"
            id="terrain-high-mountains"
            name="terrainHighMountains"
            value="terrainHighMountains"
            ?checked="${this.terrainHighMountains}"
          />
        </div>
        <div>
          <label for="terrain-lake-river">Lake/River</label>
          <input
            @change="${this.selectionChange}"
            type="checkbox"
            id="terrain-lake-river"
            name="terrainLakeRiver"
            value="terrainLakeRiver"
            ?checked="${this.terrainLakeRiver}"
          />
        </div>
        <div>
          <label for="terrain-marshlands">Marshlands</label>
          <input
            @change="${this.selectionChange}"
            type="checkbox"
            id="terrain-marshlands"
            name="terrainMarshlands"
            value="terrainMarshlands"
            ?checked="${this.terrainMarshlands}"
          />
        </div>
        <div>
          <label for="terrain-quagmire">Quagmire</label>
          <input
            @change="${this.selectionChange}"
            type="checkbox"
            id="terrain-quagmire"
            name="terrainQuagmire"
            value="terrainQuagmire"
            ?checked="${this.terrainQuagmire}"
          />
        </div>
        <div>
          <label for="terrain-ruins">Ruins</label>
          <input
            @change="${this.selectionChange}"
            type="checkbox"
            id="terrain-ruins"
            name="terrainRuins"
            value="terrainRuins"
            ?checked="${this.terrainRuins}"
          />
        </div>
      </section>
    `;
  }
}
