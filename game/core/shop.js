import { db } from '../store/index.js';

const item = [
  {
    name: 'downjump',
    icon: 'keyboard_double_arrow_down',
    amount: 10,
  },
];

const getHtml = (selector) => {
  return document.querySelector(`${selector}`);
};

const createSkill = ({ name, icon, amount }) => {
  const container = document.createElement('div');
  container.classList.add('skills__container');

  const overlay = document.createElement('div');
  overlay.classList.add('skills__overlay');

  const buy = document.createElement('button');
  buy.classList.add('skills__buy');

  const plus = document.createElement('span');
  plus.className = 'material-symbols-outlined skills__plus';
  plus.textContent = 'add';
  buy.append(plus);
  overlay.append(buy);

  const button = document.createElement('button');
  button.classList.add('skill');

  const info = document.createElement('div');
  info.classList.add('skills__info');

  const text = document.createElement('p');
  text.classList.add('skills__text');
  text.textContent = `Руна моментального падения - эта способность позволяет быстро снижать высоту прыжка, что может быть полезно в некоторых ситуациях.`;

  const coins = document.createElement('p');
  coins.classList.add('skills__coins');
  coins.textContent = `${amount} Coins`;
  info.append(text, coins);

  const span = document.createElement('span');
  span.className = 'material-symbols-outlined skill-size';
  span.textContent = icon;

  button.addEventListener('click', () => {
    if (db.coins >= 0) {
      db.skills.push('downjump');
      db.coins -= 10;
      const coins = document.querySelector('.coins');
      coins.textContent = `Coins: ${db.coins}`;
    }
  });

  container.addEventListener('mouseover', () => {
    overlay.style.display = 'flex';
  });

  container.addEventListener('mouseout', () => {
    overlay.style.display = 'none';
  });

  button.append(span);

  container.append(overlay, button, info);
  return container;
};

export const skills = () => {
  const container = getHtml('.skills');

  container.prepend(createSkill(item[0]));
};
