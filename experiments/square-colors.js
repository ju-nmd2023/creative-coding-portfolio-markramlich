function setup() {
  createCanvas(innerWidth, innerHeight);
  frameRate(8);
}
const size = 10;
const divider = 10;
let counter = 0;

function draw() {
  background(0, 0, 0);
  noStroke();
  for (let y = 0; y < height / size; y++) {
    for (let x = 0; x < width / size; x++) {
      const value = noise(x / divider, y / divider, counter) * size;

      if (value < size * 0.4) {
        fill(100, 13, 95);
      } else if (value < size * 0.75) {
        fill(217, 22, 86);
      } else {
        fill(238, 102, 166);
      }

      square(size / 2 + x * size, size / 2 + y * size, value);
    }
  }
  counter += 0.3;
}
