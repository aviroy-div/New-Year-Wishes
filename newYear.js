// Fireworks Animation Code
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
  constructor(x, y, color, speed, angle) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = speed;
    this.angle = angle;
    this.alpha = 1;
    this.gravity = 0.02;
  }

  update() {
    this.x += this.speed * Math.cos(this.angle);
    this.y += this.speed * Math.sin(this.angle) + this.gravity;
    this.alpha -= 0.01;
  }

  draw() {
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

class Firework {
  constructor(x, y, colors) {
    this.x = x;
    this.y = y;
    this.colors = colors;
    this.particles = [];
    for (let i = 0; i < 100; i++) {
      const speed = Math.random() * 3 + 2;
      const angle = Math.random() * Math.PI * 2;
      const color = colors[Math.floor(Math.random() * colors.length)];
      this.particles.push(new Particle(x, y, color, speed, angle));
    }
  }

  update() {
    this.particles = this.particles.filter((p) => p.alpha > 0);
    this.particles.forEach((p) => p.update());
  }

  draw() {
    this.particles.forEach((p) => p.draw());
  }
}

const fireworks = [];
const colors = [
  "#ff0000",
  "#00ff00",
  "#0000ff",
  "#ffff00",
  "#ff00ff",
  "#00ffff",
];

function launchFirework() {
  const x = Math.random() * canvas.width;
  const y = (Math.random() * canvas.height) / 2;
  fireworks.push(new Firework(x, y, colors));
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  fireworks.forEach((firework) => {
    firework.update();
    firework.draw();
  });
  requestAnimationFrame(animate);
}

setInterval(launchFirework, 800);
animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
