function setup() {
  createCanvas(innerWidth, innerHeight);
  background(0, 0, 0);
}

let size = 100;
let layers = 10;
let maxLayers = 10;
let currentLayer = 0;

function getRandomValue(pos, variance) {
  return pos + map(Math.random(), 0, 1, -variance, variance);
}

function drawLayers(x, y, size, layers) {
  const variance = size / 20;
  noFill();

  for (let i = 0; i < layers; i++) {
    stroke(random(255), random(255), random(255));
    if (Math.random() > 0.8) {
      continue;
    }
    const half = ((size / maxLayers) * i) / 2;
    beginShape();
    vertex(
      getRandomValue(x - half, variance),
      getRandomValue(y - half, variance)
    );
    vertex(
      getRandomValue(x + half, variance),
      getRandomValue(y - half, variance)
    );
    vertex(
      getRandomValue(x + half, variance),
      getRandomValue(y + half, variance)
    );
    vertex(
      getRandomValue(x - half, variance),
      getRandomValue(y + half, variance)
    );
    endShape(CLOSE);
  }
}
function draw() {
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      drawLayers(size / 2 + x * size, size / 2 + y * size, size, currentLayer);
    }
  }

  noLoop();
}

function mouseClicked() {
  if (currentLayer < maxLayers) {
    currentLayer++;
    loop();
  } else {
    layers = 0;
    currentLayer = 0;
    background(0, 0, 0);
  }
}
