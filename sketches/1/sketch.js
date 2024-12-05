import { createEngine } from "../../shared/engine.js";
import Match from "./Match.js";
import Glacon from "./Glacon.js";
import Letter from "./Letter.js";

const { renderer, input, math, run, finish } = createEngine();
const { ctx, canvas } = renderer;
let width = window.innerWidth;
let height = window.innerHeight;

let match = new Match(ctx, 300);
let glacon = new Glacon(ctx, width, height, 600);
let letter = new Letter(ctx, width, height, 600);

let mouseX;
let mouseY;

run(update);

window.addEventListener("mousemove", (event) => {
  mouseX = event.clientX * 2;
  mouseY = event.clientY * 2;
});

function update() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  letter.draw();
  glacon.draw();
  match.draw(mouseX, mouseY);

  match.checkMouseDistance(mouseX, mouseY);
  glacon.checkMouseDistance(mouseX, mouseY);
}
