import { createSpringSettings, Spring } from "../../shared/spring.js";
import { createEngine } from "../../shared/engine.js";
import Easing from "./Easing.js";

export default class Letter {
  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.posX = x;
    this.posY = y;
    this.scale = 150;
    this.scaleOrigin = 150;
    this.scaleTarget = 600;
    this.easing = new Easing();

    this.rotation = Math.PI / 2;
    this.originRotation = Math.PI / 2;
    this.targetRotation = Math.PI * 1.5;

    this.speed = 0.004;
    this.timing = 0;

    this.isActive = false;
  }

  draw() {
    if (this.isActive) {
      this.ctx.save();
      this.ctx.translate(this.posX, this.posY); // Déplacer au centre du texte
      this.ctx.rotate(Math.PI / 2); // Appliquer la rotation
      this.ctx.rotate(this.rotation); // Appliquer la rotation
      this.ctx.translate(-this.posX, -this.posY); // Revenir au point d'origine
      this.ctx.font = `${this.scale}px NeueCorp`; // Taille et police
      this.ctx.fillStyle = "white"; // Couleur de remplissage
      this.ctx.textAlign = "center"; // Alignement horizontal
      this.ctx.textBaseline = "middle"; // Alignement vertical

      // Dessiner le texte
      this.ctx.fillText("2", this.posX, this.posY);
      this.ctx.restore();
    }
  }

  scaleLetter() {
    this.timing += this.speed;
    this.scale =
      this.scaleOrigin +
      (this.scaleTarget - this.scaleOrigin) *
        this.easing.elasticOut(this.timing);
  }

  rotateLetter() {
    // Calculer la nouvelle rotation avec interpolation
    this.rotation =
      this.originRotation +
      (this.targetRotation - this.originRotation) *
        this.easing.elasticOut(this.timing);
  }
}
