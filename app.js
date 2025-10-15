// Simple Bubble Game
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let bubbles = [];

function createBubble() {
  const x = Math.random() * canvas.width;
  const y = canvas.height + 20;
  const radius = Math.random() * 20 + 10;
  bubbles.push({ x, y, radius, speed: Math.random() * 2 + 1 });
}

function drawBubbles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  bubbles.forEach((b, i) => {
    b.y -= b.speed;
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.fill();

    if (b.y + b.radius < 0) bubbles.splice(i, 1);
  });
}

canvas.addEventListener("click", e => {
  const clickX = e.offsetX;
  const clickY = e.offsetY;
  bubbles = bubbles.filter(b => {
    const dist = Math.hypot(b.x - clickX, b.y - clickY);
    return dist > b.radius;
  });
});

function gameLoop() {
  if (Math.random() < 0.05) createBubble();
  drawBubbles();
  requestAnimationFrame(gameLoop);
}

gameLoop();
