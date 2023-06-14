const Card = require("../../Card");
const { PRIORITY_INVESTIGATIVE_DEFAULT } = require("../../const/Priority");

module.exports = class CryOutVisitors extends Card {
  constructor(role) {
    super(role);

    this.actions = [
      {
        priority: PRIORITY_INVESTIGATIVE_DEFAULT,
        labels: ["hidden", "absolute"],
        run() {
          if (this.game.getStateName() != "Night") return;

          const visitors = this.getVisitors();
          if (visitors?.length) {
            const names = visitors?.map((visitor) => visitor.name);
            this.game.queueAlert(
              `:sy1e: Someone shouts during the night: ` +
                `Curses! ${names.join(", ")} disturbed my slumber!`
            );
            this.actor.role.data.visitors = [];
          }
        },
      },
    ];
  }
};
