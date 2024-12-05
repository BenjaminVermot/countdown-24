import Easing from "./Easing.js";

export default class BG {
  constructor(ctx, sX, sY) {
    this.ctx = ctx;
    this.posX = 0;
    this.posY = 0;
    this.scaleX = sX;
    this.scaleY = sY;

    this.bgImg = new Image();
    //this.matchImg2 = new Image();
    this.bgImg.src = "../../svgs/Background.png"; // Remplacez par l'URL de votre image
    //this.matchImg2.src = "../../svgs/match2.png"; // Remplacez par l'URL de votre image
    this.isLoaded = false;
    this.bgImg.onload = () => {
      this.isLoaded = true;
    };
  }

  draw() {
    if (this.isLoaded) {
      this.ctx.drawImage(
        this.bgImg,
        this.posX,
        this.posY,
        this.scaleX,
        this.scaleY
      );
    }
  }
}
