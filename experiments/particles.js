// Had help from a classmate, Reinis Muiznieks, to help set up tone js and just get it started as I was having trouble
// lerned how to create the particles from here: https://codepen.io/pixelkind/pen/gOZwoVX
let synth, analyser;
let notes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"];

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
  if (typeof Tone !== "undefined") {
    synth = new Tone.Synth({
      oscillator: { type: "triangle" },
      envelope: {
        attack: 2,
        decay: 3,
        sustain: 1,
        release: 20,
        frequency: 4,
        depth: 5,
      },
    }).toDestination();
    analyser = new Tone.Analyser("fft", 64);
    synth.connect(analyser);
  }
}

function generateParticles(x, y) {
  for (let i = 0; i < 100; i++) {
    const px = x + random(-10, 10);
    const py = y + random(-10, 10);
    const particle = new Particle(px, py);
    particles.push(particle);
  }
  if (synth) {
    let noteIndex = floor(map(y, 0, height, notes.length - 1, 0));
    synth.triggerAttackRelease(notes[noteIndex], "8n");
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
