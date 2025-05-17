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
  close.classList.add('game-over__close');
  close.textContent = `> В главное меню <`;

  close.addEventListener('click', () => {
    document.querySelector('.page').style.display = 'flex';
    popup.remove();
  });

  const container = document.createElement('div');
  container.classList.add('game-over__container');
  container.prepend(title, text, close);
  popup.prepend(container);

  const body = document.querySelector('body');
  body.prepend(popup);
};
