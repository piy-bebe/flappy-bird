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
    y: canvas.height / 3,
  },
  gravitation: 4.5,
};

bird.position.x = 200;
// document.addEventListener('keydown', moveUp);
document.addEventListener('mousedown', moveUp);

function moveUp() {
  bird.position.y -= 160;
}

bird.image.src = 'assets/images/bird.png';

pipeTop.src = 'assets/images/pipeTop.png';
pipeBottom.src = 'assets/images/pipeBottom.png';

const pipes = [];

let gap = 140;

const aspectRatio = bird.image.height / bird.image.width;

const newWidth = 50;
const newHeight = newWidth / aspectRatio;

bird.image.width = newWidth;
bird.image.height = newHeight;
// pipeTop
const aspectRatio2 = pipeTop.height / pipeTop.width;

const newWidth2 = 550;
const newHeight2 = newWidth2 / aspectRatio2;

pipeTop.width = newWidth2;
pipeTop.height = newHeight2;

// pipeBottom
const aspectRatio3 = pipeBottom.height / pipeBottom.width;

const newWidth3 = 550;
const newHeight3 = newWidth3 / aspectRatio3;

pipeBottom.width = newWidth3;
pipeBottom.height = newHeight3;
pipes[0] = {
  x: canvas.width,
  y: Math.floor(Math.random() * -pipeTop.height * 5),
};
function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < pipes.length; i++) {
    context.drawImage(pipeTop, pipes[i].x, pipes[i].y, pipeTop.height, pipeTop.width);
    context.drawImage(
      pipeBottom,
      pipes[i].x,
      pipes[i].y + canvas.height - gap,
      pipeBottom.height,
      pipeBottom.width
    );

    pipes[i].x -= 5;

    if (pipes[i].x == 1540) {
      pipes.push({
        x: canvas.width,
        y: Math.floor(Math.random() * -pipeTop.height * 6),
      });
    }
    // if (pipes[i].x < -1000) {
    //   pipes.shift();
    // }

    const isMapBoundary = bird.position.y > canvas.height || bird.position.y < -40;
    const isPipeBoundary =
      bird.position.x + bird.image.width >= pipes[i].x &&
      bird.position.x <= pipes[i].x + pipeTop.height &&
      (bird.position.y + 30 <= Math.abs(pipes[i].y + 550) ||
        bird.position.y + (bird.image.height - 30) >= pipes[i].y + canvas.height - gap);

    console.log(pipeTop.width);

    if (isMapBoundary || isPipeBoundary) {
      return;
    }
  }

  context.drawImage(bird.image, bird.position.x, bird.position.y, bird.image.height, bird.image.width);

  bird.position.y += bird.gravitation;

  requestAnimationFrame(draw);
}

pipeBottom.onload = function () {
  draw();
};
