const DrawDiscardPile = require("../../core/DrawDiscardPile");

module.exports = class SecretDictatorDrawDiscardPile extends DrawDiscardPile {
  constructor() {
    super();
  }

  initCards() {
    let liberalPile = Array(6).fill("Liberal");
    let fascistPile = Array(11).fill("Fascist");
    liberalPile.push(...fascistPile);
    super.initCards(liberalPile);
  }

  peekMultipleDraw(numToPeek) {
    this.refill();
    return super.peekMultipleDraw(numToPeek);
  }

  draw() {
    this.refill();
    return super.draw();
  }

  drawMultiple(numToDraw) {
    this.refill();
    return super.drawMultiple(numToDraw);
  }

  refill() {
    if (this.getDrawPileSize() < 3) {
      this.refillDrawFromDiscard();
      this.shuffle();
    }
  }
};
