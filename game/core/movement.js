const audioFly = new Audio('../../assets/sounds/fly.mp3');

// Создаем переменную для хранения ID анимации
let jumpAnimationId = null;

export const jump = ({ position, duration = 800, height = 120 }) => {
  // Отменяем предыдущую анимацию, если она есть
  if (jumpAnimationId) {
    cancelAnimationFrame(jumpAnimationId);
  }

  audioFly.pause();
  audioFly.currentTime = 0;
  audioFly.play();

  const startTime = performance.now();
  const startY = position.y;

  const animate = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const jumpProgress = Math.sin(progress * Math.PI);
    position.y = startY - jumpProgress * height;

    if (progress < 1) {
      jumpAnimationId = window.requestAnimationFrame(animate);
    } else {
      position.y = startY;
      jumpAnimationId = null; // Сбрасываем ID при завершении
    }
  };

  jumpAnimationId = window.requestAnimationFrame(animate);
};

// Функция для принудительной отмены анимации
export const cancelJump = () => {
  if (jumpAnimationId) {
    cancelAnimationFrame(jumpAnimationId);
    jumpAnimationId = null;
  }
};
