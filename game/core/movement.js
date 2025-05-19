export const jump = ({ position, duration = 800, height = 120 }) => {
  const startTime = performance.now(); // Фиксируем время начала
  const startY = position.y; // Начальная позиция по Y

  const animate = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1); // 0...1

    // Плавное движение вверх-вниз (синусоида или квадратичная кривая)
    const jumpProgress = Math.sin(progress * Math.PI); // 0...1...0
    position.y = startY - jumpProgress * height;

    if (progress < 1) {
      window.requestAnimationFrame(animate);
    } else {
      position.y = startY; // Возврат в исходную позицию (опционально)
    }
  };

  window.requestAnimationFrame(animate);
};
