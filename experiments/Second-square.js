function setup() {
  createCanvas(innerWidth, innerHeight);
}
const size = 100;
const layers = 100;
function getRandomValue(pos, variance) {
  return pos + map(Math.random(), 0, 4, -variance, variance);
}
function drawLayers(x, y, size, layers, col) {
  const variance = size / 20;
  noFill();
  stroke(col);

  for (let i = 0; i < layers; i++) {
    if (Math.random() > 0.7) {
      continue;
    }
    const s = (size / layers) * i;
    const half = s / 2;
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
  background(0, 0, 0);

  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 14; x++) {
      let col = color(random(255), 50, random(255));
      drawLayers(size / 2 + x * size, size / 2 + y * size, size, layers, col);
    }
  }
  noLoop();
}
