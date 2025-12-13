const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let score = 0;
let cx = canvas.width / 2;
const carW = 60;
const carH = 100;
const speed = 7;

const carImg = document.getElementById("c1");
const coinImg = document.getElementById("cn");

let left = false;
let right = false;

let coins = [];
let enemies = [];
let gameOver = false;

document.getElementById("playBtn").onclick = () => {
  document.getElementById("startPage").style.display = "none";
  document.getElementById("mainContainer").style.display = "block";
  document.getElementById("playAgainBtn").style.display = "none";
  score = 0;
  document.getElementById("score").innerText = score;
  cx = canvas.width / 2;
  coins = [];
  enemies = [];
  gameOver = false;
  requestAnimationFrame(loop);
};

document.getElementById("playAgainBtn").onclick = () => {
  document.getElementById("playAgainBtn").style.display = "none";
  score = 0;
  document.getElementById("score").innerText = score;
  cx = canvas.width / 2;
  coins = [];
  enemies = [];
  gameOver = false;
  requestAnimationFrame(loop);
};

function loop() {
  if (gameOver) {
    ctx.fillStyle = "black";
    ctx.font = "48px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2 - 50);
    document.getElementById("playAgainBtn").style.display = "block";
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Spawn coins
  if (Math.random() < 0.01) {
    coins.push({x: canvas.width/2 - 130 + Math.random() * 260, y: -30, speed: 5});
  }

  // Spawn enemies
  if (Math.random() < 0.005) {
    enemies.push({x: canvas.width/2 - 130 + Math.random() * 260, y: -100, speed: 3});
  }

  // Drum
  ctx.fillStyle = "#555";
  ctx.fillRect(canvas.width/2 - 150, 0, 300, canvas.height);

  // Mașină
  if (left && cx > canvas.width/2 - 130) cx -= speed;
  if (right && cx < canvas.width/2 + 130) cx += speed;

  ctx.drawImage(carImg, cx - carW/2, canvas.height - carH - 20, carW, carH);

  // Draw coins
  coins.forEach(coin => {
    ctx.drawImage(coinImg, coin.x - 15, coin.y - 15, 30, 30);
  });

  // Draw enemies
  enemies.forEach(enemy => {
    ctx.fillStyle = "red";
    ctx.fillRect(enemy.x - carW/2, enemy.y, carW, carH);
  });

  // Move coins
  coins = coins.filter(coin => {
    coin.y += coin.speed;
    return coin.y < canvas.height + 30;
  });

  // Move enemies
  enemies = enemies.filter(enemy => {
    enemy.y += enemy.speed;
    return enemy.y < canvas.height + 100;
  });

  // Check coin collisions
  coins = coins.filter(coin => {
    if (cx - carW/2 < coin.x + 15 && cx + carW/2 > coin.x - 15 &&
        canvas.height - carH - 20 < coin.y + 15 && canvas.height - 20 > coin.y - 15) {
      score++;
      document.getElementById("score").innerText = score;
      return false;
    }
    return true;
  });

  // Check enemy collisions
  enemies.forEach(enemy => {
    if (cx - carW/2 < enemy.x + carW/2 && cx + carW/2 > enemy.x - carW/2 &&
        canvas.height - carH - 20 < enemy.y + carH && canvas.height - 20 > enemy.y) {
      gameOver = true;
    }
  });

  requestAnimationFrame(loop);
}

// Taste
document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft") left = true;
  if (e.key === "ArrowRight") right = true;
});

document.addEventListener("keyup", e => {
  if (e.key === "ArrowLeft") left = false;
  if (e.key === "ArrowRight") right = false;
});
