const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const segments = [];
const numSegments = 20;
const segmentSize = 30;
const colors = ["#3cba54", "#a8e6cf", "#dcedc1", "#ffd3b6", "#ffaaa5", "#ff8b94"];

let mouseX = canvas.width / 2;
let mouseY = canvas.height / 2;

// Initialize segments
for (let i = 0; i < numSegments; i++) {
  segments.push({ x: mouseX, y: mouseY });
}

canvas.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function drawSegment(x, y, color, isHead = false) {
  // Body
  ctx.beginPath();
  ctx.arc(x, y, segmentSize, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();

  if (isHead) {
    // Eyes
    const eyeOffsetX = 6;
    const eyeOffsetY = -6;
    const eyeRadius = 4;

    // Left Eye - white
    ctx.beginPath();
    ctx.arc(x - eyeOffsetX, y + eyeOffsetY, eyeRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();

    // Left Eye - black pupil
    ctx.beginPath();
    ctx.arc(x - eyeOffsetX, y + eyeOffsetY, 2, 0, Math.PI * 2);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();

    // Right Eye - white
    ctx.beginPath();
    ctx.arc(x + eyeOffsetX, y + eyeOffsetY, eyeRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();

    // Right Eye - black pupil
    ctx.beginPath();
    ctx.arc(x + eyeOffsetX, y + eyeOffsetY, 2, 0, Math.PI * 2);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();

    // Mouth
    ctx.beginPath();
    ctx.arc(x, y + 4, 5, 0, Math.PI); // smile
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.closePath();
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Move segments
  for (let i = segments.length - 1; i > 0; i--) {
    segments[i].x = segments[i - 1].x;
    segments[i].y = segments[i - 1].y;
  }

  // Head follows mouse
  segments[0].x += (mouseX - segments[0].x) * 0.1;
  segments[0].y += (mouseY - segments[0].y) * 0.1;

  // Draw tail first
  for (let i = segments.length - 1; i >= 1; i--) {
    drawSegment(segments[i].x, segments[i].y, colors[i % colors.length], false);
  }

  // Draw head last with face
  drawSegment(segments[0].x, segments[0].y, colors[0], true);

  requestAnimationFrame(animate);
}

animate();
