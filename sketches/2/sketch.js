import { createEngine } from "../../shared/engine.js";
import { Spring } from "../../shared/spring.js";
import Hamecon from "./hamecon.js";
import Fish from "./fish.js";
import Letter from "./letter.js";

const { renderer, input, math, run, finish } = createEngine();
const { ctx, canvas } = renderer;
run(update);

let width = window.innerWidth;
let height = window.innerHeight;
let hamecon = new Hamecon(ctx);
let fish = new Fish(ctx, canvas.width / 2, canvas.height / 2, 40, 5);
let letter = new Letter(ctx, width, height);

let isClicking = false;

let mouseX;
let mouseY;

window.addEventListener("mousedown", (event) => {
  isClicking = true;
  hamecon.timing = 0;

  const distanceToHamecon = calculateDistance(
    mouseX,
    mouseY,
    hamecon.posX,
    hamecon.posY
  );

  if (distanceToHamecon <= 400) {
    hamecon.isDragging = true;
  }
});

window.addEventListener("mouseup", (event) => {
  const distanceToFish = calculateDistance(
    mouseX,
    mouseY,
    fish.posX,
    fish.posY
  );

  if (hamecon.isDragging && distanceToFish <= 400) {
    hamecon.isCatched = true;
    letter.isActive = true;
    fish.isActive = false;
  }

  isClicking = false;
  hamecon.isDragging = false;
  hamecon.mouseUp(mouseX);
});

window.addEventListener("mousemove", (event) => {
  mouseX = event.clientX * 2;
  mouseY = event.clientY * 2;

  const distanceToHook = calculateDistance(
    mouseX,
    mouseY,
    hamecon.posX,
    hamecon.posY
  );

  if (isClicking && distanceToHook <= 400) {
    hamecon.followMouse(mouseX, mouseY);
  }

  const distanceToFish = calculateDistance(
    mouseX,
    mouseY,
    fish.posX,
    fish.posY
  );

  if (distanceToFish <= 60 && hamecon.isDragging) {
    fish.targetScaleX = 60;
    fish.targetScaleY = 5;
  } else {
    fish.targetScaleX = fish.originScaleX;
    fish.targetScaleY = fish.originScaleY;
  }
});

function update(deltaTime) {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  fish.draw();
  fish.scale(deltaTime);
  hamecon.move(deltaTime);
  hamecon.draw(mouseX);
  if (!letter.isActive) {
  } else {
    letter.draw();
    letter.scaleLetter();
    letter.rotateLetter();
    console.log("letter");
  }
}

function calculateDistance(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}
