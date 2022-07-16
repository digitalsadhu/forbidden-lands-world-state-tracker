import { LitElement, html, css, classMap } from "https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js";

export class WorldStateOptions extends LitElement {
  constructor() {
    super();
    this.overEncumbered = false;
    this.noWarmClothes = false;
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
  }
  static properties = {
    overEncumbered: { type: Boolean },
    noWarmClothes: { type: Boolean },
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
        <h4>Is anyone in the party...</h4>
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
      </section>
      <section>
        <h3>Drowning</h3>
        <h4>Is anyone in the party...</h4>
        <div>
          <label for="in-water">In water?</label>
          <input
            @change="${this.selectionChange}"
            type="checkbox"
            id="in-water"
            name="in-water"
            value="inWater"
            ?checked="${this.inWater}"
          />
        </div>
        <div>
          <label for="wearing-armor">Wearing armor?</label>
          <input
            @change="${this.selectionChange}"
            type="checkbox"
            id="wearing-armor"
            name="wearing-armor"
            value="wearingArmor"
            ?checked="${this.wearingArmor}"
          />
        </div>
      </section>
      <section>
        <h3>Other</h3>
        <h4>Is anyone in the party...</h4>
        <div>
          <label for="over-encumbered">over encumbered?</label>
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
          <label for="no-warm-clothes">not wearing warm clothing?</label>
          <input
            @change="${this.selectionChange}"
            type="checkbox"
            id="no-warm-clothes"
            name="no-warm-clothes"
            value="noWarmClothes"
            ?checked="${this.noWarmClothes}"
          />
        </div>
        <div>
          <label for="poisoned">Poisoned?</label>
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
          <label for="injured">Injured?</label>
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
          <label for="diseased">Diseased?</label>
          <input
            @change="${this.selectionChange}"
            type="checkbox"
            id="diseased"
            name="diseased"
            value="diseased"
            ?checked="${this.diseased}"
          />
        </div>
        <div>
          <label for="bare-ground-sleeping">Sleeping on bare ground?</label>
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
          <label for="using-arrows">Using arrows?</label>
          <input
            @change="${this.selectionChange}"
            type="checkbox"
            id="using-arrows"
            name="using-arrows"
            value="usingArrows"
            ?checked="${this.usingArrows}"
          />
        </div>
      </section>
      <section>
        <h3>Stronghold</h3>
        <h4>Does the party...</h4>
        <div>
          <label for="own-stronghold">Own a stronghold?</label>
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
          <label for="have-hirelings">Have any hirelings?</label>
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
          <label for="sleep">SLEEP</label>
          <input
            @change="${this.selectionChange}"
            type="checkbox"
            id="sleep"
            name="sleep"
            value="sleep"
            ?checked="${this.sleep}"
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
    `;
  }
}
