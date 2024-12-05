export default class Star {
  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.posX = x;
    this.posY = y;
    this.vel = 0;
    this.scale = Math.random() * (10 - 1) + 1;
    this.originScale = this.scale;
    this.targetScale = this.scale * 1.3;

    this.amplitude = 2;
  }

  draw() {
    this.ctx.beginPath();

    this.ctx.arc(this.posX, this.posY, this.scale, 0, Math.PI * 2);
    this.ctx.fillStyle = "white";
    this.ctx.fill();

    this.ctx.closePath();
  }

  //   updateStar(deltaTime) {
  //     // Augmenter le temps en fonction de deltaTime
  //     this.time += deltaTime;

  //     // Osciller la taille de l'étoile avec une fonction sinusoïdale
  //     this.scale = this.originScale + Math.sin(this.time) * this.amplitude;
  //   }

  //   scaleStar(deltaTime) {
  //     const distToTarget = this.targetScale - this.scale;
  //     const springForce = 150;
  //     const springDamping = 10;
  //     const force = distToTarget * springForce - this.vel * springDamping;
  //     this.vel += force * deltaTime;
  //     this.scale += this.vel * deltaTime;
  //   }
}
