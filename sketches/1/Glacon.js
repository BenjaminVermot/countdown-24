import Easing from "./Easing.js";

export default class Glacon {
  constructor(ctx, x, y, s) {
    this.ctx = ctx;
    this.posX = x;
    this.posY = y;
    this.scale = s;

    this.glaconImg = new Image();

    this.glaconImg.src = "../../svgs/glacon.png"; // Remplacez par l'URL de votre image

    this.isLoaded = false;
    this.glaconImg.onload = () => {
      this.isLoaded = true;
    };

    this.isDisplayed = true;

    this.setup();
  }

  setup() {
    setInterval(() => {
      this.swapSprite();
    }, 500);
  }

  swapSprite() {}

  draw() {
    if (this.isLoaded && this.isDisplayed) {
      this.ctx.drawImage(
        this.glaconImg,
        this.posX - this.scale / 2,
        this.posY - this.scale / 2,
        this.scale,
        this.scale
      );
    }
  }

  checkMouseDistance(mouseX, mouseY) {
    this.distanceToMouse = this.calculateDistance(
      mouseX,
      mouseY,
      this.posX,
      this.posY
    );
    if (this.distanceToMouse < 400) {
      this.shrinkDown();
      this.instantiateParticles();
    } else {
      return;
    }
  }

  shrinkDown() {
    this.scale -= 1;
    console.log("shrink");

    if (this.scale <= 0.1) {
      this.isDisplayed = false;
    }
  }

  calculateDistance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  }
}
