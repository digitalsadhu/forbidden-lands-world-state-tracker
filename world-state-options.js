import { LitElement, html, css, classMap } from "./dependencies/lit-all.min.js";
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
    environmentCold: { type: String, attribute: "environment-cold" },
    environmentRain: { type: String, attribute: "environment-rain" },
    environmentWind: { type: String, attribute: "environment-wind" },
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
        padding: 0 30px 30px 30px;
        border-radius: 8px;
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
        gap: 40px;
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
      .checkbox-group {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .hidden {
        display: none;
      }
      .cold > div {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .indent {
        margin-left: 20px;
      }
    `,
  ];

  selectionChange(e) {
    this.dispatchEvent(new CustomEvent("change", { detail: { name: e.detail.value, selected: e.detail.checked } }));
  }

  coldChange(e) {
    let value = "Mild";
    if (e.detail.value === "environmentCold" && e.detail.checked) {
      value = "Cold";
    }
    if (e.detail.value === "environmentBiting") {
      if (e.detail.checked) {
        value = "Biting";
      } else {
        value = "Cold";
      }
    }

    this.dispatchEvent(new CustomEvent("cold-change", { detail: { name: "environmentCold", value } }));
  }

  rainChange(e) {
    let value = "No Rain";
    if (e.detail.value === "environmentRain" && e.detail.checked) {
      value = "Light Rain";
    }
    if (e.detail.value === "environmentLightRain" && e.detail.checked) {
      value = "Light Rain";
    }
    if (e.detail.value === "environmentLightSnow" && e.detail.checked) {
      value = "Light Snow";
    }
    if (e.detail.value === "environmentHeavyRain" && e.detail.checked) {
      value = "Heavy Rain";
    }
    if (e.detail.value === "environmentHeavySnow" && e.detail.checked) {
      value = "Heavy Snow";
    }

    this.dispatchEvent(new CustomEvent("rain-change", { detail: { name: "environmentRain", value } }));
  }

  windChange(e) {
    let value = "Light Breeze";
    if (e.detail.value === "environmentWind" && e.detail.checked) {
      value = "Strong Wind";
    }
    if (e.detail.value === "environmentStrongWind" && e.detail.checked) {
      value = "Strong Wind";
    }
    if (e.detail.value === "environmentStorm" && e.detail.checked) {
      value = "Storm";
    }

    this.dispatchEvent(new CustomEvent("wind-change", { detail: { name: "environmentWind", value } }));
  }

  radioSelectionChange(e) {
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: { name: e.target.name, selected: Number(e.target.value) },
      })
    );
  }

  conditionsTemplate() {
    return html`
      <div class="checkbox-group">
        <checkbox-control @change="${this.selectionChange}" name="hungry" value="hungry" ?checked="${this.hungry}"
          >Hungry</checkbox-control
        >
        <checkbox-control @change="${this.selectionChange}" name="thirsty" value="thirsty" ?checked="${this.thirsty}"
          >Thirsty</checkbox-control
        >
        <checkbox-control @change="${this.selectionChange}" name="sleepy" value="sleepy" ?checked="${this.sleepy}"
          >Sleepy</checkbox-control
        >
        <checkbox-control @change="${this.selectionChange}" name="cold" value="cold" ?checked="${this.cold}"
          >Cold</checkbox-control
        >
        <checkbox-control @change="${this.selectionChange}" name="poisoned" value="poisoned" ?checked="${this.poisoned}"
          >Poisoned</checkbox-control
        >
        <checkbox-control @change="${this.selectionChange}" name="injured" value="injured" ?checked="${this.injured}"
          >Injured</checkbox-control
        >
        <checkbox-control @change="${this.selectionChange}" name="diseased" value="diseased" ?checked="${this.diseased}"
          >Sick</checkbox-control
        >
      </div>
    `;
  }

  gearTemplate() {
    return html`
      <div class="checkbox-group">
        <checkbox-control
          @change="${this.selectionChange}"
          name="over-encumbered"
          value="overEncumbered"
          ?checked="${this.overEncumbered}"
          >Over encumbered</checkbox-control
        >
        <checkbox-control
          @change="${this.selectionChange}"
          name="using-arrows"
          value="usingArrows"
          ?checked="${this.usingArrows}"
          >Arrows</checkbox-control
        >
        <checkbox-control
          @change="${this.selectionChange}"
          name="wearing-armor"
          value="wearingArmor"
          ?checked="${this.wearingArmor}"
          >Armor</checkbox-control
        >
        <checkbox-control
          @change="${this.selectionChange}"
          name="warm-clothes"
          value="warmClothes"
          ?checked="${this.warmClothes}"
          >Warm clothes</checkbox-control
        >
        <checkbox-control
          @change="${this.selectionChange}"
          name="light-source"
          value="lightSource"
          ?checked="${this.lightSource}"
          >Light source</checkbox-control
        >
      </div>
    `;
  }

  environmentTemplate() {
    return html`
      <div class="checkbox-group cold">
        <checkbox-control
          @change="${this.selectionChange}"
          name="environment-dark"
          value="environmentDark"
          ?checked="${this.environmentDark}"
          >Dark</checkbox-control
        >
        <div>
          <checkbox-control
            @change="${this.coldChange}"
            name="environment-cold"
            value="environmentCold"
            ?checked="${this.environmentCold === "Cold" || this.environmentCold === "Biting"}"
            >Cold</checkbox-control
          >
          <checkbox-control
            class="${classMap({ hidden: this.environmentCold === "Mild", indent: true })}"
            @change="${this.coldChange}"
            name="environment-biting"
            value="environmentBiting"
            ?checked="${this.environmentCold === "Biting"}"
            >Biting</checkbox-control
          >
        </div>
        <div>
          <checkbox-control
            @change="${this.rainChange}"
            name="environment-rain"
            value="environmentRain"
            ?checked="${this.environmentRain === "Light Rain" ||
            this.environmentRain === "Light Snow" ||
            this.environmentRain === "Heavy Rain" ||
            this.environmentRain === "Heavy Snow"}"
            >Rain</checkbox-control
          >
          <checkbox-control
            class="${classMap({ hidden: this.environmentRain === "No Rain", indent: true })}"
            @change="${this.rainChange}"
            name="environment-light-rain"
            value="environmentLightRain"
            ?checked="${this.environmentRain === "Light Rain"}"
            >Light Rain</checkbox-control
          >
          <checkbox-control
            class="${classMap({ hidden: this.environmentRain === "No Rain", indent: true })}"
            @change="${this.rainChange}"
            name="environment-light-snow"
            value="environmentLightSnow"
            ?checked="${this.environmentRain === "Light Snow"}"
            >Light Snow</checkbox-control
          >
          <checkbox-control
            class="${classMap({ hidden: this.environmentRain === "No Rain", indent: true })}"
            @change="${this.rainChange}"
            name="environment-heavy-rain"
            value="environmentHeavyRain"
            ?checked="${this.environmentRain === "Heavy Rain"}"
            >Heavy Rain</checkbox-control
          >
          <checkbox-control
            class="${classMap({ hidden: this.environmentRain === "No Rain", indent: true })}"
            @change="${this.rainChange}"
            name="environment-heavy-snow"
            value="environmentHeavySnow"
            ?checked="${this.environmentRain === "Heavy Snow"}"
            >Heavy Snow</checkbox-control
          >
        </div>
        <div>
          <checkbox-control
            @change="${this.windChange}"
            name="environment-wind"
            value="environmentWind"
            ?checked="${this.environmentWind === "Strong Wind" || this.environmentWind === "Storm"}"
          >
            Wind
          </checkbox-control>
          <checkbox-control
            class="${classMap({ hidden: this.environmentWind === "Light Breeze", indent: true })}"
            @change="${this.windChange}"
            name="environment-strong-wind"
            value="environmentStrongWind"
            ?checked="${this.environmentWind === "Strong Wind"}"
          >
            Strong Wind
          </checkbox-control>
          <checkbox-control
            class="${classMap({ hidden: this.environmentWind === "Light Breeze", indent: true })}"
            @change="${this.windChange}"
            name="environment-storm"
            value="environmentStorm"
            ?checked="${this.environmentWind === "Storm"}"
            >Storm</checkbox-control
          >
        </div>
        <checkbox-control @change="${this.selectionChange}" name="in-water" value="inWater" ?checked="${this.inWater}"
          >Water</checkbox-control
        >
      </div>
    `;
  }

  strongholdTemplate() {
    return html`
      <div class="checkbox-group">
        <checkbox-control
          @change="${this.selectionChange}"
          name="own-stronghold"
          value="ownStronghold"
          ?checked="${this.ownStronghold}"
          >Stronghold</checkbox-control
        >
        <checkbox-control
          @change="${this.selectionChange}"
          name="have-hirelings"
          value="haveHirelings"
          ?checked="${this.haveHirelings}"
          >Hirelings</checkbox-control
        >
      </div>
    `;
  }

  actionsTemplate() {
    return html`
      <div class="checkbox-group">
        <checkbox-control @change="${this.selectionChange}" name="explore" value="explore" ?checked="${this.explore}"
          >Explore</checkbox-control
        >
        <checkbox-control @change="${this.selectionChange}" name="hike" value="hike" ?checked="${this.hike}"
          >Hike</checkbox-control
        >
        <checkbox-control @change="${this.selectionChange}" name="fish" value="fish" ?checked="${this.fish}"
          >Fish</checkbox-control
        >
        <checkbox-control @change="${this.selectionChange}" name="forage" value="forage" ?checked="${this.forage}"
          >Forage</checkbox-control
        >
        <checkbox-control @change="${this.selectionChange}" name="hunt" value="hunt" ?checked="${this.hunt}"
          >Hunt</checkbox-control
        >
        <checkbox-control
          @change="${this.selectionChange}"
          name="keep-watch"
          value="keepWatch"
          ?checked="${this.keepWatch}"
          >Keep Watch</checkbox-control
        >
        <checkbox-control
          @change="${this.selectionChange}"
          name="lead-the-way"
          value="leadTheWay"
          ?checked="${this.leadTheWay}"
          >Lead the way</checkbox-control
        >
        <checkbox-control @change="${this.selectionChange}" name="rest" value="rest" ?checked="${this.rest}"
          >Rest</checkbox-control
        >
        <checkbox-control
          @change="${this.selectionChange}"
          name="make-camp"
          value="makeCamp"
          ?checked="${this.makeCamp}"
          >Make Camp</checkbox-control
        >
        <checkbox-control @change="${this.selectionChange}" name="sleep" value="sleep" ?checked="${this.sleep}"
          >Sleep</checkbox-control
        >


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
      </div>
    `;
  }

  terrainTemplate() {
    return html`
      <div class="checkbox-group">
        <checkbox-control
          @change="${this.selectionChange}"
          name="terrain-plains"
          value="terrainPlains"
          ?checked="${this.terrainPlains}"
          >Plains</checkbox-control
        >
        <checkbox-control
          @change="${this.selectionChange}"
          name="terrain-forest"
          value="terrainForest"
          ?checked="${this.terrainForest}"
          >Forest</checkbox-control
        >
        <checkbox-control
          @change="${this.selectionChange}"
          name="terrain-dark-forest"
          value="terrainDarkForest"
          ?checked="${this.terrainDarkForest}"
          >Dark Forest</checkbox-control
        >
        <checkbox-control
          @change="${this.selectionChange}"
          name="terrain-hills"
          value="terrainHills"
          ?checked="${this.terrainHills}"
          >Hills</checkbox-control
        >
        <checkbox-control
          @change="${this.selectionChange}"
          name="terrain-mountains"
          value="terrainMountains"
          ?checked="${this.terrainMountains}"
          >Mountains</checkbox-control
        >
        <checkbox-control
          @change="${this.selectionChange}"
          name="terrain-high-mountains"
          value="terrainHighMountains"
          ?checked="${this.terrainHighMountains}"
          >High mountains</checkbox-control
        >
        <checkbox-control
          @change="${this.selectionChange}"
          name="terrain-lake-river"
          value="terrainLakeRiver"
          ?checked="${this.terrainLakeRiver}"
          >Lake / river</checkbox-control
        >
        <checkbox-control
          @change="${this.selectionChange}"
          name="terrain-marshlands"
          value="terrainMarshlands"
          ?checked="${this.terrainMarshlands}"
          >Marshlands</checkbox-control
        >
        <checkbox-control
          @change="${this.selectionChange}"
          name="terrain-quagmire"
          value="terrainQuagmire"
          ?checked="${this.terrainQuagmire}"
          >Quagmire</checkbox-control
        >
        <checkbox-control
          @change="${this.selectionChange}"
          name="terrain-ruins"
          value="terrainRuins"
          ?checked="${this.terrainRuins}"
          >Ruins</checkbox-control
        >
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
