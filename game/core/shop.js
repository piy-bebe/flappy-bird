import { db } from '../store/index.js';

const item = [
  {
    name: 'downjump',
    icon: 'keyboard_double_arrow_down',
  },
];

const getHtml = (selector) => {
  return document.querySelector(`${selector}`);
};

const createSkill = ({ name, icon }) => {
  const container = document.createElement('div');
  container.classList.add('skills__container');

  const button = document.createElement('button');
  button.classList.add('skill');

  const info = document.createElement('div');
  info.classList.add('skills__info');

  const text = document.createElement('p');
  text.classList.add('skills__text');
  text.textContent = `Моментальное падение - эта способность позволяет быстро снижать высоту прыжка, что может быть полезно в некоторых ситуациях.`;

  const coins = document.createElement('p');
  coins.classList.add('skills__coins');
  coins.textContent = `10 Coins`;
  info.append(text, coins);

  const span = document.createElement('span');
  span.className = 'material-symbols-outlined skill-size';
  span.textContent = icon;

  button.addEventListener('click', () => {
    if (db.coins >= 0) {
      console.log('Покупка прошла успешно');
      db.skills.push('downjump');
      db.coins -= 10;
      const coins = document.querySelector('.coins');
      coins.textContent = `Coins: ${db.coins}`;
    }
  });

  button.append(span);

  container.append(button, info);
  return container;
};

export const skills = () => {
  const container = getHtml('.skills');

  container.prepend(createSkill(item[0]));
};
