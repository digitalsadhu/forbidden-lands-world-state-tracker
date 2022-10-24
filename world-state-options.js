import { LitElement, html, css, classMap } from "./dependencies/lit-all.min.js";
import { globalStyles } from "./global-styles.js";
import { background } from "./background.js";
import { Database } from "./data-structures/database.js";

export class WorldStateOptions extends LitElement {
  static properties = {
    _options: { state: true },
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
        flex-direction: column;
        gap: 20px;
        flex-wrap: wrap;
        align-items: flex-start;
      }
      .other {
        width: 180px;
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
      .environment > div {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .indent {
        margin-left: 20px;
      }
    `,
  ];

  constructor() {
    super();
    this._options = {};
  }

  async connectedCallback() {
    super.connectedCallback();
    if (await Database.initialize("options").has(String(this.timestamp))) {
      this._options = await Database.initialize("options").get(String(this.timestamp));
    }
    // const options = window.localStorage.getItem(`options:${this.timestamp}`);
    // if (options) {
    //   this._options = JSON.parse(options);
    // }
  }

  get timestamp() {
    return Number(new URLSearchParams(window.location.search).get("timestamp"));
  }

  selectionChange(e) {
    this._options[e.detail.value] = e.detail.checked;
    // this.dispatchEvent(new CustomEvent("change", { detail: { name: e.detail.value, selected: e.detail.checked } }));

    Database.initialize("options").set(String(this.timestamp), this._options);
    // window.localStorage.setItem(`options:${this.timestamp}`, JSON.stringify(this._options));
    // data.updateSelectedOptions();
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

    this._options.environmentCold = value;
    // data.update({ environmentCold: value });
    // this.dispatchEvent(new CustomEvent("cold-change", { detail: { name: "environmentCold", value } }));
    // window.localStorage.setItem(`options:${this.timestamp}`, JSON.stringify(this._options));
    // data.updateSelectedOptions();
    Database.initialize("options").set(String(this.timestamp), this._options);
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

    this._options.environmentRain = value;
    Database.initialize("options").set(String(this.timestamp), this._options);
    // window.localStorage.setItem(`options:${this.timestamp}`, JSON.stringify(this._options));
    // data.update({ environmentRain: value });
    // this.dispatchEvent(new CustomEvent("rain-change", { detail: { name: "environmentRain", value } }));
    // data.updateSelectedOptions();
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

    this._options.environmentWind = value;
    // window.localStorage.setItem(`options:${this.timestamp}`, JSON.stringify(this._options));
    // data.updateSelectedOptions();
    Database.initialize("options").set(String(this.timestamp), this._options);
    // data.update({ environmentWind: value });
    // this.dispatchEvent(new CustomEvent("wind-change", { detail: { name: "environmentWind", value } }));
  }

  radioSelectionChange(e) {
    // this.dispatchEvent(
    //   new CustomEvent("change", {
    //     detail: { name: e.target.name, selected: Number(e.target.value) },
    //   })
    // );
    // data.update({ [e.target.name]: Number(e.target.value) });

    this._options[e.target.name] = Number(e.target.value);
    // window.localStorage.setItem(`options:${this.timestamp}`, JSON.stringify(this._options));
    // data.updateSelectedOptions();
    Database.initialize("options").set(String(this.timestamp), this._options);
  }

  terrainChange(e) {
    const { name, value, checked } = e.detail;
    if (checked) background.set(name);
    else background.clear();
    // data.update({ [value]: checked });
    this._options[value] = checked;
    // window.localStorage.setItem(`options:${this.timestamp}`, JSON.stringify(this._options));
    // data.updateSelectedOptions();
    Database.initialize("options").set(String(this.timestamp), this._options);
  }

  conditionsTemplate() {
    return html`
      <div class="checkbox-group">
        <checkbox-control
          @change="${this.selectionChange}"
          name="hungry"
          value="hungry"
          ?checked="${this._options.hungry}"
          >Hungry</checkbox-control
        >
        <checkbox-control
          @change="${this.selectionChange}"
          name="thirsty"
          value="thirsty"
          ?checked="${this._options.thirsty}"
          >Thirsty</checkbox-control
        >
        <checkbox-control
          @change="${this.selectionChange}"
          name="sleepy"
          value="sleepy"
          ?checked="${this._options.sleepy}"
          >Sleepy</checkbox-control
        >
        <checkbox-control @change="${this.selectionChange}" name="cold" value="cold" ?checked="${this._options.cold}"
          >Cold</checkbox-control
        >
        <checkbox-control
          @change="${this.selectionChange}"
          name="poisoned"
          value="poisoned"
          ?checked="${this._options.poisoned}"
          >Poisoned</checkbox-control
        >
        <checkbox-control
          @change="${this.selectionChange}"
          name="injured"
          value="injured"
          ?checked="${this._options.injured}"
          >Injured</checkbox-control
        >
        <checkbox-control
          @change="${this.selectionChange}"
          name="diseased"
          value="diseased"
          ?checked="${this._options.diseased}"
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
          ?checked="${this._options.overEncumbered}"
          >Over encumbered</checkbox-control
        >
        <checkbox-control
          @change="${this.selectionChange}"
          name="using-arrows"
          value="usingArrows"
          ?checked="${this._options.usingArrows}"
          >Arrows</checkbox-control
        >
        <checkbox-control
          @change="${this.selectionChange}"
          name="wearing-armor"
          value="wearingArmor"
          ?checked="${this._options.wearingArmor}"
          >Armor</checkbox-control
        >
        <checkbox-control
          @change="${this.selectionChange}"
          name="warm-clothes"
          value="warmClothes"
          ?checked="${this._options.warmClothes}"
          >Warm clothes</checkbox-control
        >
        <checkbox-control
          @change="${this.selectionChange}"
          name="light-source"
          value="lightSource"
          ?checked="${this._options.lightSource}"
          >Light source</checkbox-control
        >
      </div>
    `;
  }

  environmentTemplate() {
    return html`
      <div class="checkbox-group environment">
        <checkbox-control
          @change="${this.selectionChange}"
          name="environment-dark"
          value="environmentDark"
          ?checked="${this._options.environmentDark}"
          >Dark</checkbox-control
        >
        <div>
          <checkbox-control
            @change="${this.coldChange}"
            name="environment-cold"
            value="environmentCold"
            ?checked="${this._options.environmentCold === "Cold" || this._options.environmentCold === "Biting"}"
            >Cold</checkbox-control
          >
          <checkbox-control
            class="${classMap({ hidden: this._options.environmentCold === "Mild", indent: true })}"
            @change="${this.coldChange}"
            name="environment-biting"
            value="environmentBiting"
            ?checked="${this._options.environmentCold === "Biting"}"
            >Biting</checkbox-control
          >
        </div>
        <div>
          <checkbox-control
            @change="${this.rainChange}"
            name="environment-rain"
            value="environmentRain"
            ?checked="${this._options.environmentRain === "Light Rain" ||
            this._options.environmentRain === "Light Snow" ||
            this._options.environmentRain === "Heavy Rain" ||
            this._options.environmentRain === "Heavy Snow"}"
            >Rain</checkbox-control
          >
          <checkbox-control
            class="${classMap({ hidden: this._options.environmentRain === "No Rain", indent: true })}"
            @change="${this.rainChange}"
            name="environment-light-rain"
            value="environmentLightRain"
            ?checked="${this._options.environmentRain === "Light Rain"}"
            >Light Rain</checkbox-control
          >
          <checkbox-control
            class="${classMap({ hidden: this._options.environmentRain === "No Rain", indent: true })}"
            @change="${this.rainChange}"
            name="environment-light-snow"
            value="environmentLightSnow"
            ?checked="${this._options.environmentRain === "Light Snow"}"
            >Light Snow</checkbox-control
          >
          <checkbox-control
            class="${classMap({ hidden: this._options.environmentRain === "No Rain", indent: true })}"
            @change="${this.rainChange}"
            name="environment-heavy-rain"
            value="environmentHeavyRain"
            ?checked="${this._options.environmentRain === "Heavy Rain"}"
            >Heavy Rain</checkbox-control
          >
          <checkbox-control
            class="${classMap({ hidden: this._options.environmentRain === "No Rain", indent: true })}"
            @change="${this.rainChange}"
            name="environment-heavy-snow"
            value="environmentHeavySnow"
            ?checked="${this._options.environmentRain === "Heavy Snow"}"
            >Heavy Snow</checkbox-control
          >
        </div>
        <div>
          <checkbox-control
            @change="${this.windChange}"
            name="environment-wind"
            value="environmentWind"
            ?checked="${this._options.environmentWind === "Strong Wind" || this._options.environmentWind === "Storm"}"
          >
            Wind
          </checkbox-control>
          <checkbox-control
            class="${classMap({ hidden: this._options.environmentWind === "Light Breeze", indent: true })}"
            @change="${this.windChange}"
            name="environment-strong-wind"
            value="environmentStrongWind"
            ?checked="${this._options.environmentWind === "Strong Wind"}"
          >
            Strong Wind
          </checkbox-control>
          <checkbox-control
            class="${classMap({ hidden: this._options.environmentWind === "Light Breeze", indent: true })}"
            @change="${this.windChange}"
            name="environment-storm"
            value="environmentStorm"
            ?checked="${this._options.environmentWind === "Storm"}"
            >Storm</checkbox-control
          >
        </div>
        <checkbox-control
          @change="${this._options.selectionChange}"
          name="in-water"
          value="inWater"
          ?checked="${this._options.inWater}"
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
          ?checked="${this._options.ownStronghold}"
          >Stronghold</checkbox-control
        >
        <checkbox-control
          @change="${this.selectionChange}"
          name="have-hirelings"
          value="haveHirelings"
          ?checked="${this._options.haveHirelings}"
          >Hirelings</checkbox-control
        >
      </div>
    `;
  }

  actionsTemplate() {
    return html`
      <div class="checkbox-group">
        <checkbox-control @change="${this.selectionChange}" name="explore" value="explore" ?checked="${
      this._options.explore
    }"
          >Explore</checkbox-control
        >
        <checkbox-control @change="${this.selectionChange}" name="hike" value="hike" ?checked="${this._options.hike}"
          >Hike</checkbox-control
        >
        <checkbox-control @change="${this.selectionChange}" name="fish" value="fish" ?checked="${this._options.fish}"
          >Fish</checkbox-control
        >
        <checkbox-control @change="${this.selectionChange}" name="forage" value="forage" ?checked="${
      this._options.forage
    }"
          >Forage</checkbox-control
        >
        <checkbox-control @change="${this.selectionChange}" name="hunt" value="hunt" ?checked="${this._options.hunt}"
          >Hunt</checkbox-control
        >
        <checkbox-control
          @change="${this.selectionChange}"
          name="keep-watch"
          value="keepWatch"
          ?checked="${this._options.keepWatch}"
          >Keep Watch</checkbox-control
        >
        <checkbox-control
          @change="${this.selectionChange}"
          name="lead-the-way"
          value="leadTheWay"
          ?checked="${this._options.leadTheWay}"
          >Lead the way</checkbox-control
        >
        <checkbox-control @change="${this.selectionChange}" name="rest" value="rest" ?checked="${this._options.rest}"
          >Rest</checkbox-control
        >
        <checkbox-control
          @change="${this.selectionChange}"
          name="make-camp"
          value="makeCamp"
          ?checked="${this._options.makeCamp}"
          >Make Camp</checkbox-control
        >
        <checkbox-control @change="${this.selectionChange}" name="sleep" value="sleep" ?checked="${this._options.sleep}"
          >Sleep</checkbox-control
        >


          <!-- <input
          @change="${this.selectionChange}"
          type="checkbox"
          id="bare-ground-sleeping"
          name="bare-ground-sleeping"
          value="bareGroundSleeping"
          ?checked="${this._options.bareGroundSleeping}"
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
            ?checked="${this._options.forcedMarch === 0}"
          />No
        </label> -->
          <!-- <label>
          <input
            @change="${this.radioSelectionChange}"
            type="radio"
            name="forcedMarch"
            value="1"
            ?checked="${this._options.forcedMarch === 1}"
          />1 quarter day
        </label>
        <label>
          <input
            @change="${this.radioSelectionChange}"
            type="radio"
            name="forcedMarch"
            value="2"
            ?checked="${this._options.forcedMarch === 2}"
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
          @change="${this.terrainChange}"
          name="plains"
          value="terrainPlains"
          ?checked="${this._options.terrainPlains}"
          >Plains</checkbox-control
        >
        <checkbox-control
          @change="${this.terrainChange}"
          name="forest"
          value="terrainForest"
          ?checked="${this._options.terrainForest}"
          >Forest</checkbox-control
        >
        <checkbox-control
          @change="${this.terrainChange}"
          name="dark-forest"
          value="terrainDarkForest"
          ?checked="${this._options.terrainDarkForest}"
          >Dark Forest</checkbox-control
        >
        <checkbox-control
          @change="${this.terrainChange}"
          name="hills"
          value="terrainHills"
          ?checked="${this._options.terrainHills}"
          >Hills</checkbox-control
        >
        <checkbox-control
          @change="${this.terrainChange}"
          name="mountains"
          value="terrainMountains"
          ?checked="${this._options.terrainMountains}"
          >Mountains</checkbox-control
        >
        <checkbox-control
          @change="${this.terrainChange}"
          name="high-mountains"
          value="terrainHighMountains"
          ?checked="${this._options.terrainHighMountains}"
          >High mountains</checkbox-control
        >
        <checkbox-control
          @change="${this.terrainChange}"
          name="lake-river"
          value="terrainLakeRiver"
          ?checked="${this._options.terrainLakeRiver}"
          >Lake / river</checkbox-control
        >
        <checkbox-control
          @change="${this.terrainChange}"
          name="marshlands"
          value="terrainMarshlands"
          ?checked="${this._options.terrainMarshlands}"
          >Marshlands</checkbox-control
        >
        <checkbox-control
          @change="${this.terrainChange}"
          name="quagmire"
          value="terrainQuagmire"
          ?checked="${this._options.terrainQuagmire}"
          >Quagmire</checkbox-control
        >
        <checkbox-control
          @change="${this.terrainChange}"
          name="ruins"
          value="terrainRuins"
          ?checked="${this._options.terrainRuins}"
          >Ruins</checkbox-control
        >
      </div>
    `;
  }

  // @ts-ignore
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
            <div class="stronghold">
              <h3>Stronghold</h3>
              ${this.strongholdTemplate()}
            </div>
          </section>
        </section>
      </section>
      <section class="middle">
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
      <section class="right">
        <section class="other">
          <h2>Other</h2>
          <section>
            <div class="environment">
              <h3>Environment</h3>
              ${this.environmentTemplate()}
            </div>
          </section>
        </section>
      </section>
    `;
  }
}
