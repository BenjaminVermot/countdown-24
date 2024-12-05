import { createEngine } from "../../shared/engine.js";
import Mover from "./mover.js";
import Sifflet from "./sifflet.js";
import Utils from "./utils.js";

const { renderer, input, math, run, finish } = createEngine();
const { ctx, canvas } = renderer;
run(update);

let width = window.innerWidth;
let height = window.innerHeight;

let mouseX;
let mouseY;

let isClicking = false;

let movers = [];
let moversAmount = 600;

let sifflet;

let points = [];

setup();

window.addEventListener("mousemove", (event) => {
  mouseX = event.clientX * 2;
  mouseY = event.clientY * 2;
});

function setup() {
  sifflet = new Sifflet(ctx);
  for (let i = 0; i < moversAmount; i++) {
    const randomX = Math.random() * width * 2;
    const randomY = Math.random() * height * 2;
    const n = new Mover(ctx, randomX, randomY);
    movers.push(n);
  }
  sifflet = new Sifflet(ctx);
  console.log("setup");
  console.log("SVGform");
}

window.addEventListener("mousemove", (event) => {
  mouseX = event.clientX * 2;
  mouseY = event.clientY * 2;
});

window.addEventListener("mousedown", (event) => {
  sifflet.timing = 0;
  sifflet.isSiffling = true;
  isClicking = true;
});
window.addEventListener("mouseup", (event) => {
  sifflet.timing = 0;
  sifflet.isSiffling = false;
  isClicking = false;
});

function update() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  movers.forEach((element) => {
    element.draw();
    if (isClicking) {
      element.checkMouseDistance(mouseX, mouseY, sifflet.scale);
    }
  });

  sifflet.draw(mouseX, mouseY);
  sifflet.siffle();
}
