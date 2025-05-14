export const gameOver = (score) => {
  const popup = document.createElement('div');
  popup.classList.add('game-over');

  const title = document.createElement('h2');
  title.classList.add('game-over__title');
  title.textContent = 'Игра окончена';

  const text = document.createElement('p');
  text.classList.add('game-over__text');
  text.textContent = `Счет: ${score}`;

  const close = document.createElement('button');
  close.textContent = `В главное меню`;

  close.addEventListener('click', () => {
    document.querySelector('.page').style.display = 'flex';
    popup.remove();
  });

  popup.prepend(title, text, close);

  const body = document.querySelector('body');
  body.prepend(popup);
};
