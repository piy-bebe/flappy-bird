import { cancelJump, jump } from '../game/core/movement.js';
import { settings } from '../game/core/settings.js';
import { skills } from '../game/core/shop.js';
import { jumpDown } from '../game/core/skills.js';
import { db } from '../game/store/index.js';
import { gameOver } from './components/game-over.js';

/** @type {HTMLCanvasElement} */
const canvas = document.querySelector('#canvas');

const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ground = new Image();

const pipeTop = new Image();
const pipeBottom = new Image();

pipeTop.src = 'assets/images/pipeTop.png';
pipeBottom.src = 'assets/images/pipeBottom.png';
ground.src = 'assets/images/ground.png';

let audioScore = new Audio();
audioScore.src = 'assets/sounds/score.mp3';
const pipes = [];

let gap = 140;
let score = 0;

const coins = document.querySelector('.coins');
coins.textContent = 'Coins: ' + db.coins;

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

// ground
const aspectRatio4 = ground.height / ground.width;

const newWidth4 = 120;
const newHeight4 = newWidth4 / aspectRatio4;

ground.width = newWidth4;
ground.height = newHeight4;

const startPosition = {
  x: 200,
  y: canvas.height / 3,
};
const bird = {
  image: new Image(),
  position: {
    x: startPosition.x,
    y: startPosition.y,
  },
};

bird.image.src = 'assets/images/bird.png';
const aspectRatio = bird.image.height / bird.image.width;

const newWidth = 50;
const newHeight = newWidth / aspectRatio;
bird.image.width = newWidth;
bird.image.height = newHeight;

function startGame() {
  bird.position.y = startPosition.y;
  bird.position.x = startPosition.x;

  const handler = () => jump(bird);
  const handlerSpace = (e) => e.code === 'Space' && !e.repeat && jump(bird);
  // Навык: руна падения вниз
  const handlerJumpDown = (e) => e.code === 'ArrowDown' && !e.repeat && jumpDown(bird, cancelJump);

  canvas.addEventListener('mousedown', handler);

  window.addEventListener('keydown', handlerSpace);

  window.addEventListener('keydown', handlerJumpDown);

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

      pipes[i].x -= settings.pipe.velocity;

      if (pipes[i].x == 200 - bird.image.width) {
        audioScore.play();
        score++;
        db.coins += 1;
        coins.textContent = `Coins: ${db.coins}`;
      }

      if (pipes[pipes.length - 1].x < 1540) {
        pipes.push({
          x: canvas.width,
          y: Math.floor(Math.random() * -pipeTop.height * 6),
        });
      }

      const isMapBoundary =
        bird.position.y + bird.image.height - 30 > canvas.height - ground.width || bird.position.y < -40;

      const isPipeBoundary =
        bird.position.x + bird.image.width >= pipes[i].x &&
        bird.position.x <= pipes[i].x + pipeTop.height &&
        (bird.position.y + 8 <= Math.abs(pipes[i].y + 550) ||
          bird.position.y + (bird.image.height - 15) >= pipes[i].y + canvas.height - gap);

      // Конец игры
      if (isMapBoundary || isPipeBoundary) {
        gameOver(score);

        context.clearRect(0, 0, canvas.width, canvas.height);
        canvas.removeEventListener('mousedown', handler);
        window.removeEventListener('keydown', handlerSpace);
        window.removeEventListener('keydown', handlerJumpDown);

        pipes.length = 0;
        pipes[0] = {
          x: canvas.width,
          y: Math.floor(Math.random() * -pipeTop.height * 5),
        };

        score = 0;

        return;
      }
    }

    context.drawImage(bird.image, bird.position.x, bird.position.y, bird.image.height, bird.image.width);

    for (let i = 0; i <= canvas.width; i += ground.width) {
      context.drawImage(ground, i, canvas.height - ground.width, ground.height, ground.width);
    }

    bird.position.y += settings.bird.gravity;

    context.fillStyle = '#fff';
    context.font = "124px 'Press Start 2P'";
    context.fillText(score, 50, 150);

    requestAnimationFrame(draw);
  }

  draw();
}

const play = document.querySelector('#play');

play.addEventListener('click', () => {
  document.querySelector('.page').style.display = 'none';

  startGame();
});

const shop = document.querySelector('#shop');

shop.addEventListener('click', () => {
  document.querySelector('.shop').style.display = 'flex';
  document.querySelector('.page').style.display = 'none';

  skills();
});

const back = document.querySelector('#back');

back.addEventListener('click', () => {
  document.querySelector('.shop').style.display = 'none';
  document.querySelector('.page').style.display = 'flex';

  document.querySelector('.skills').innerHTML = '';
});
