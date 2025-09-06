function setup() {
  createCanvas(innerWidth, innerHeight);
  noLoop();
}

function draw() {
  background(0, 0, 0);
  stroke(255, 255, 255);
  const originalY = 60;
  const divider = 20;
  noiseSeed(3);

  for (let i = 0.6; i < 3; i++) {
    push();
    translate(0, i * 100);
    beginShape(1);
    for (let x = 0; x < 600; x++) {
      const y = originalY + noise(x / divider) * i * 30;
      vertex(x, y);
    }
    endShape();
    pop();
  }
}
