import Easing from "./Easing.js";

export default class Mask {
  constructor(ctx, sX, sY) {
    this.ctx = ctx;
    this.posX = 300;
    this.posY = 300;
    this.velX = 0;
    this.velY = 0;
    this.targetPosX = 300;
    this.targetPosY = 300;
    this.scaleX = sX;
    this.scaleY = sY;

    this.maskImage = new Image();
    this.maskImage.src = "../../svgs/Mask.png"; // Remplacez par l'URL de votre image
    this.isLoaded = false;
    this.maskImage.onload = () => {
      this.isLoaded = true;
    };
  }

  draw(mouseX, mouseY) {
    if (this.isLoaded) {
      this.targetPosX = mouseX;
      this.targetPosY = mouseY;
      this.ctx.drawImage(
        this.maskImage,
        this.posX - this.scaleX / 2,
        this.posY - this.scaleY / 2,
        this.scaleX,
        this.scaleY
      );
    }
  }

  move(deltaTime) {
    if (this.isLoaded) {
      const distToTargetX = this.targetPosX - this.posX;
      const distToTargetY = this.targetPosY - this.posY;
      const springForce = 50;
      const springDamping = 10;
      const forceX = distToTargetX * springForce - this.velX * springDamping; // * this.easing.elasticInOut(this.timing);
      const forceY = distToTargetY * springForce - this.velY * springDamping; //* this.easing.elasticInOut(this.timing);
      this.velX += forceX * deltaTime;
      this.velY += forceY * deltaTime;
      this.posX += this.velX * deltaTime;
      this.posY += this.velY * deltaTime;
    }
  }

  checkMouseDistance(mouseX, mouseY) {
    this.distanceToMouse = this.calculateDistance(
      mouseX,
      mouseY,
      this.posX,
      this.posY
    );
  }

  calculateDistance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  }

  grow() {
    this.scaleX += 1920 / 1.5;
    this.scaleY += 1080 / 1.5;
  }
}
