function setup() {
  createCanvas(innerWidth, innerHeight);
  frameRate(4);
}
const size = 2;
const divider = 10;
let counter = 0;

function draw() {
  background(0, 0, 0);
  noStroke();
  for (let y = 0; y < height / size; y++) {
    for (let x = 0; x < width / size; x++) {
      const value = noise(x / divider, y / divider, counter) * size;

      if (value < size * 0.5) {
        fill(14, 254, 6);
      } else if (value < size * 0.75) {
        fill(239, 243, 1);
      } else {
        fill(255, 99, 36);
      }

      square(size / 2 + x * size, size / 2 + y * size, value);
    }
  }
  counter += 0.5;
}
