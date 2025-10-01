// Had help from a classmate, Reinis Muiznieks, to help set up tone js and just get it started as I was having trouble
// Learned how to create the particles from here: https://codepen.io/pixelkind/pen/gOZwoVX
let startflower = 0;
let particles = [];
let lines = [];
let flowerPositions = [];
let nextIndex = 0;
let startTime = 0;
let synth, analyser;
let notes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"];
let currentNoteIndex = 0;

class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);

    const a = Math.random() * Math.PI * 2;
    const v = 0.2 + Math.random();
    this.velocity = createVector(Math.cos(a) * v, Math.sin(a) * v);
    this.lifespan = 100 + Math.random() * 100;

    this.color = color(random(200, 255), random(100, 160), random(0, 50), 255);
  }

  update() {
    this.lifespan--;

    this.velocity.mult(0.99);
    this.position.add(this.velocity);
  }

  draw() {
    push();
    translate(this.position.x, this.position.y);
    noStroke();

    fill(red(this.color), green(this.color), blue(this.color), 1);
    ellipse(0, 0, 6);
    pop();
  }

  isDead() {
    return this.lifespan <= 0;
  }
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  blendMode(ADD);
  let xPos = 50;

  while (xPos < innerWidth) {
    flowerPositions.push({ x: xPos, y: random(100, 500) });
    xPos += random(20, 120);
  }
  startTime = millis();

  if (typeof Tone !== "undefined") {
    synth = new Tone.Synth({
      oscillator: { type: "sine" },
      envelope: {
        attack: 0.2,
        decay: 0.3,
        sustain: 0.5,
        release: 20,
        frequency: 4,
        depth: 0.5,
      },
    }).toDestination();
    analyser = new Tone.Analyser("fft", 64);
    synth.connect(analyser);
  }
}

function generateParticles(x, y) {
  for (let i = 0; i < 400; i++) {
    const px = x + random(-10, 10);
    const py = y + random(-10, 10);
    const particle = new Particle(px, py);
    particles.push(particle);
  }

  if (synth) {
    synth.triggerAttackRelease(notes[currentNoteIndex], "8n");
    currentNoteIndex = (currentNoteIndex + 1) % notes.length;
  }
}

function draw() {
  background(0, 0, 0);
  if (
    nextIndex < flowerPositions.length &&
    millis() - startTime > nextIndex * 1000
  ) {
    let pos = flowerPositions[nextIndex];
    generateParticles(pos.x, pos.y);
    lines.push({ x: pos.x, y: pos.y });
    nextIndex++;
  }
  for (let particle of particles) {
    particle.update();
    particle.draw();

    if (particle.isDead()) {
      particles.splice(particles.indexOf(particle), 1);
    }
  }
  stroke(0.8);
  strokeWeight(0.5);
  for (let linePos of lines) {
    line(linePos.x, linePos.y, linePos.x, height);
  }
}
