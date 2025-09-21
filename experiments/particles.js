class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    const a = Math.random() * Math.PI * 2;
    const v = 0.2 + Math.random();
    this.velocity = createVector(Math.cos(a) * v, Math.sin(a) * v);
    this.lifespan = 100 + Math.random() * 100;
  }

  update() {
    this.lifespan--;

    this.velocity.mult(0.999999999);
    this.position.add(this.velocity);
  }

  draw() {
    push();
    translate(this.position.x, this.position.y);
    noStroke();
    // fill(200, 200, 0, 10);
    fill(random(255), 50, random(255), 10);
    ellipse(0, 0, 10);
    pop();
  }

  isDead() {
    return this.lifespan <= 50;
  }
}

function setup() {
  createCanvas(innerWidth, innerHeight);
}

function generateParticles(x, y) {
  for (let i = 0; i < 100; i++) {
    const px = x + random(-10, 10);
    const py = y + random(-10, 10);
    const particle = new Particle(px, py);
    particles.push(particle);
  }
}

let particles = [];

function draw() {
  background(0, 0, 0);

  if (mouseIsPressed) {
    generateParticles(mouseX, mouseY);
  }

  for (let particle of particles) {
    particle.update();
    particle.draw();

    if (particle.isDead()) {
      particles.splice(particles.indexOf(particle), 1);
    }
  }
}

// function mouseClicked() {
//   generateParticles(mouseX, mouseY);
// }
