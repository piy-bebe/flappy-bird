import { db } from '../store/index.js';

const container = document.querySelector('.skills');

const items = [
  {
    name: 'downjump',
    icon: 'keyboard_double_arrow_down',
    description:
      'Руна моментального падения - эта способность позволяет быстро снижать высоту прыжка, что может быть полезно в некоторых ситуациях.',
    amount: 120,
    color: '#00a0df',
  },
  {
    name: 'slowdown',
    icon: 'schedule',
    description:
      'Руна искажения времени - эта способность замедляет время движения преград, длительность 10 секунд.',
    amount: 500,
    color: '#7b00df',
  },
];

const createSkill = ({ name, icon, amount, description, color }) => {
  const container = document.createElement('div');
  container.classList.add('skills__container');
  container.style.border = '7px dashed ' + color;

  const overlay = document.createElement('div');
  overlay.classList.add('skills__overlay');

  const buy = document.createElement('button');
  buy.classList.add('skills__buy');

  const plus = document.createElement('span');
  plus.className = 'material-symbols-outlined skills__plus';
  plus.textContent = 'add';
  plus.style.color = color;
  buy.append(plus);
  overlay.append(buy);

  const button = document.createElement('button');
  button.classList.add('skill');

  const info = document.createElement('div');
  info.classList.add('skills__info');

  const text = document.createElement('p');
  text.classList.add('skills__text');
  text.textContent = description;

  const coins = document.createElement('p');
  coins.classList.add('skills__coins');
  coins.textContent = `${amount} Coins`;
  info.append(text);

  const span = document.createElement('span');
  span.className = 'material-symbols-outlined skill-size';
  span.textContent = icon;
  span.style.color = color;

  overlay.addEventListener('click', () => {
    if (db.coins >= amount) {
      db.skills.push(name);
      db.coins -= amount;
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

  container.append(overlay, button, info, coins);
  return container;
};

export const skills = () => {
  container.prepend(...items.map((item) => createSkill(item)));
};
