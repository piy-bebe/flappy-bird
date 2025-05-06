/** @type {HTMLCanvasElement} */
const canvas = document.querySelector('#canvas');

const context = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// const background = new Image();
// const foreground = new Image();
// const pipeUp = new Image();
const pipeTop = new Image();
const pipeBottom = new Image();

const bird = {
  image: new Image(),
  position: {
    x: 0,
    y: 0,
  },
  gravitation: 3,
};

document.addEventListener('keydown', moveUp);
document.addEventListener('mousedown', moveUp);

function moveUp() {
  bird.position.y -= 160;
}

bird.image.src = 'assets/images/bird.png';

pipeTop.src = 'assets/images/pipeTop.png';
pipeBottom.src = 'assets/images/pipeBottom.png';

const pipes = [];

pipes[0] = {
  x: canvas.width,
  y: 0,
};

let gap = 10;

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < pipes.length; i++) {
    context.drawImage(pipeTop, pipes[i].x, pipes[i].y, 150, 400);
    context.drawImage(pipeBottom, pipes[i].x, pipes[i].y + canvas.height - gap, 150, 400);

    pipes[i].x -= 5;

    if (pipes[i].x == 500) {
      pipes.push({
        x: canvas.width,
        y: Math.floor(Math.random() * 400) - 400,
      });
    }
    if (pipes[i].x < -1000) {
      pipes.shift();
    }

    if (
      bird.position.x >= pipes[i].x &&
      bird.position.x <= pipes[i].x + 150 &&
      bird.position.y <= pipes[i].y + 400
    ) {
      console.log('+');
    }
  }

  context.drawImage(bird.image, bird.position.x, bird.position.y, bird.image.width, bird.image.height);

  bird.position.y += bird.gravitation;

  requestAnimationFrame(draw);
}

bird.onload = function () {
  const aspectRatio = bird.height / bird.width;

  const newWidth = 200;
  const newHeight = newWidth / aspectRatio;

  bird.width = newWidth;
  bird.height = newHeight;
};

pipeBottom.onload = function () {
  draw();
};
