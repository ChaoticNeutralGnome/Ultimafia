const Effect = require("../Effect");
const Action = require("../Action");
const Random = require("../../../../lib/Random");

module.exports = class Werewolf extends Effect {
  constructor() {
    super("Werewolf");

    this.listeners = {
      state(stateInfo) {
        if (!this.player.alive) return;

        if (stateInfo.name.match(/Night/) && stateInfo.dayCount % 2 == 1)
          this.game.stateEvents["Full Moon"] = true;
      },
      actionsNext(actionQueue) {
        if (!this.player.alive) return;

        const stateInfo = this.game.getStateInfo();

        if (!stateInfo.name.match(/Night/) || stateInfo.dayCount % 2 != 1)
          return;

        const nonMosters = this.game.players.filter(
          (p) => p.role.alignment != "Monsters" && p.alive && p != this.player
        );
        const target = Random.randArrayVal(nonMosters);

        this.game.queueAction(
          new Action({
            actor: this.player,
            target,
            game: this.player.game,
            labels: ["kill", "werewolf"],
            run() {
              if (this.dominates()) this.target.kill("basic", this.actor);
            },
          })
        );
      },
    };
  }
};
