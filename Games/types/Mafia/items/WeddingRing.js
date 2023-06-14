const Item = require("../Item");

module.exports = class WeddingRing extends Item {
  constructor(proposer) {
    super("Wedding Ring");

    this.proposer = proposer;

    const meetingName = `Accept Proposal from ${this.proposer.name}`;
    this.meetings[meetingName] = {
      meetingName: "Accept Proposal",
      states: ["Day"],
      flags: ["voting", "instant"],
      inputType: "boolean",
      action: {
        labels: ["marriage"],
        item: this,
        run() {
          let isAccepted = "rejected";
          if (this.target == "Yes") {
            isAccepted = "accepted";

            if (!this.item.proposer.alive) {
              this.actor.role.revealToAll();
              this.game.queueAlert(
                `${this.actor.name} weeps at the dead bride.`
              );
              return;
            }

            this.item.proposer.role.isMarried = true;
            this.item.proposer.role.revealToAll();
            this.actor.role.revealToAll();
          }

          this.game.queueAlert(
            `${this.actor.name} ${isAccepted} the proposal.`
          );
          this.item.drop();
        },
      },
    };
  }
};
