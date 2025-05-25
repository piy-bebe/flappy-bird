export const jumpDown = ({ position }, cancelJump) => {
  cancelJump();

  const duration = 130;
  const height = 90;
  let startTime = null;
  const startY = position.y;

  const animate = (currentTime) => {
    if (!startTime) {
      startTime = currentTime;
    }

    const progress = (currentTime - startTime) / duration;
    const jumpDown = startY + progress * height;
    position.y = jumpDown;

    if (progress < 1) {
      window.requestAnimationFrame(animate);
    }
  };

  window.requestAnimationFrame(animate);
};
