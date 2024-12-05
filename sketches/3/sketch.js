import { createEngine } from "../../shared/engine.js";
import Mask from "./Mask.js";
import BG from "./BG.js";
import Constellation from "./Constallation.js";
import Star from "./Star.js";

const { renderer, input, math, run, finish } = createEngine();
const { ctx, canvas } = renderer;
run(update);

let width = window.innerWidth;
let height = window.innerHeight;

let mask = new Mask(ctx, 1920 * 5, 1080 * 5);
let bg = new BG(ctx, width * 2, height * 2);
let constellation = new Constellation(ctx, width * 2, height * 2);

let mouseX;
let mouseY;
let lastCircle = false;
let size = 0;

let stars = [];

setup();

window.addEventListener("mousemove", (event) => {
  mouseX = event.clientX * 2;
  mouseY = event.clientY * 2;
});

function setup() {
  for (let i = 0; i < 100; i++) {
    const n = new Star(
      ctx,
      Math.random() * width * 2,
      Math.random() * height * 2
    );
    stars.push(n);
  }
}

function update(dt) {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  bg.draw(mouseX, mouseY);
  stars.forEach((element) => {
    //element.updateStar(dt);
    element.draw();
  });
  constellation.draw(mouseX, mouseY);
  constellation.checkMouseDistance(mouseX, mouseY, width, height);
  mask.draw(mouseX, mouseY);
  mask.move(dt);

  if (constellation.opacity >= 1) {
    console.log("scaleMask");
    mask.grow();
    setTimeout(() => {
      lastCircle = true;
    }, "1000");
  }
  endInteraction();
}

function endInteraction() {
  if (lastCircle) {
    size += 10;
    console.log("spawnCircle");
    ctx.beginPath(); // Commence un nouveau chemin
    ctx.arc(width, height, size, 0, Math.PI * 2); // arc(x, y, rayon, angleDépart, angleFin)
    ctx.fillStyle = "black"; // Couleur de remplissage
    ctx.strokeStyle = "white";
    ctx.stroke();
    ctx.fill(); // Remplir le cercle
    ctx.closePath(); // Terminer le chemin
  }
}
