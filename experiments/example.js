function setup() {
  createCanvas(innerWidth, innerHeight);
  background(0, 0, 0);
}

function draw() {
  let x1 = 0;

  for (let i = 1.6; i <= 30; i += 1) {
    let y1 = height / i;
    x1 = 0;
    stroke(random(255), random(255), random(255));
    for (let x2 = 10; x2 <= width; x2 += 10) {
      let y2 = height / i + random(-20, 20);

      line(x1, y1, x2, y2);
      x1 = x2;
      y1 = y2;
    }
  }

  noLoop();
}
